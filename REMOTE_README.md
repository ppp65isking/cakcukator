Remote Browser (noVNC) deployment

This repository includes a Remote Browser integration for UBos that can embed a real Chromium UI via noVNC.

Quick deploy using Docker (one-liner host with Docker)

1. On a VPS or machine with Docker and docker-compose installed, create a directory and copy the provided docker-compose.yml.

2. Start the container:

   docker-compose up -d

3. The container exposes a noVNC web UI on port 6901. Example URL:

   http://<your-server-ip>:6901/vnc.html

   - The default VNC password in the compose file is "secretpassword". Change it before exposing publicly.
   - For production, place an HTTPS reverse proxy (nginx) in front of the container and enable basic auth / firewall rules.

4. In UBos (Start → Remote), set the Remote Browser URL to the noVNC URL. Example saved value:

   https://your-domain.example/vnc.html?autoconnect=true&password=secretpassword

Notes and security
- This runs a full desktop with Chrome inside the container. Any pages you visit will run in that remote Chrome instance (cookies, local storage, extensions installed inside the container if any).
- Protect the noVNC endpoint with TLS and access controls. Exposing it publicly without auth is a privacy risk.
- For per-user isolation consider spawning ephemeral containers per user (requires orchestration).

If you want, I can:
- Add a settings UI to UBos to set the noVNC URL automatically (already present) and store it securely in localStorage.
- Provide a ready-to-deploy Render or Fly.io manifest so you can push a hosted instance (note: costs may apply).
