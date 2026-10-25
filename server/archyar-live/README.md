# Archyar live relay — ephemeral v1

Deno-powered independent backend for short-lived **3D scene/pose** streaming (not video). This is a runnable local service, **not a deployment**. The public site remains static on GitHub Pages.

## Local development

```sh
deno run --allow-net --allow-env server/archyar-live/main.ts
deno test --allow-env server/archyar-live/main_test.ts
```

Configure `ARCHYAR_VIEWER_ORIGIN=http://localhost:5173` and `ARCHYAR_VIEWER_URL=http://localhost:5173/archyar.html` when connecting the local Vite viewer. Set `PORT` to change the listener port. Behind TLS, use the corresponding HTTPS/WSS URLs.

## Protocol

- `POST /api/sessions`, JSON `{"project":<Archyar v1 snapshot>}`, creates an in-memory session. Response includes independent **owner**, **editor**, **viewer** bearer tokens and a viewer QR/link URL.
- `GET /ws`, then send `{"type":"session.join","sessionId":"...","token":"...","role":"viewer"}`. The server determines the role from the actual token, **not** the role label. It replies with `session.joined` and `project.snapshot`, then optional latest `camera.pose`.
- `POST /api/sessions/<id>/camera`, Authorization Bearer **owner** token, body matching camera pose v1: broadcasts a new camera transform to subscribers.
- `PUT /api/sessions/<id>/project`, owner only, body `{"baseRevision":0,"project":<snapshot>}`; broadcasts replacement snapshot.
- `PATCH /api/sessions/<id>/objects`, editor or owner only; `{"baseRevision":0,"operation":"upsert","object":{...}}` or `{"baseRevision":0,"operation":"delete","objectId":"..."}`.
- `GET /api/sessions/<id>/project` accepts any session token for snapshot recovery.
- `DELETE /api/sessions/<id>/project` requires the owner token, revokes the session immediately and closes its viewers.
- `GET /health` returns a simple status with active session count.

All models stay in memory only. Data disappear at server restart or one-hour session expiration. Max 75 sessions / 24 subscribers per session / 2 MiB messages. Role checks and revision conflicts are enforced on the server.

## Security and production blockers

**Do not use this demo service for private or commercially sensitive construction documents on the public Internet.** Before any real production deployment, add abuse protection/rate limits, encrypted persistent storage where needed, trusted edge proxy configuration, multi-instance room coordination, HTTPS-only transport, explicit token rotation/revocation, audit logging without secrets, and comprehensive geometry validation including all semantic rules. The current in-memory limiter is not enough to prevent session-creation denial of service.

Blender/Android publisher connections are not implemented by this relay itself. The web page has a WSS subscription client; publishing requires an authorized producer (owner token). The service needs independent hosting; GitHub Pages cannot run it.
