UBos
=====

A tiny web-based OS (UBos) with two apps included:

- Browser: tabbed browser that uses a proxy and rewrites resources to route through the proxy. It injects a small cookie bridge so pages can use document.cookie (emulated per origin in localStorage).
- Notepad: simple text editor that saves files to localStorage.

New in this update
- Taskbar: running apps now show in a taskbar. You can minimize/restore windows and the taskbar shows open apps.
- Proxy code added: `worker.js` (Cloudflare Worker) and `server.js` (Replit / Express) examples are included so you can host a reliable proxy that serves binary resources correctly (images, CSS, JS).

How to get a stable proxy (recommended)

1) Cloudflare Workers (no Linux required)
   - Go to https://dash.cloudflare.com and create a free account (if you don't have one).
   - From Workers &rarr; Create a Service &rarr; Quick Edit and paste the contents of `worker.js` from this repo.
   - Save & Deploy. Your worker will be available at a workers.dev URL like `https://<name>.<account>.workers.dev`.
   - Use it in UBos by turning on the Proxy checkbox and setting the worker endpoint as: `https://<name>.<account>.workers.dev/?url=` (in ubos.html the default PROXY is `/proxy?url=` which assumes the proxy runs on the same origin; if you deploy a worker use the full URL in the script or uncheck "Proxy" and manually enter the worker-prefixed URL into the address bar).

2) Replit / Express (no Crostini required)
   - Create a new Node REPL on Replit, paste the `server.js` content from PROXY_README.md, install `node-fetch` if needed, run it and copy the public URL Replit gives you.
   - Use the Replit URL as your proxy prefix (e.g. `https://<repl-id>.repl.co/proxy?url=`)

Why a custom proxy matters
- Public proxies like AllOrigins are unreliable and often rate-limited (you saw 408). A worker or private Replit proxy will stream binary resources correctly, preserve content types, and be much faster.

Next steps I can do for you
- If you want, I can deploy the Cloudflare Worker for you but I need your Cloudflare account details (not recommended to share here). Instead I can provide step-by-step copy-paste instructions.
- Or I can create a Replit project for you with the proxy code if you give me permission to create a public Replit (I cannot create arbitrary external accounts). I will provide exact commands to paste.
- Or, if you want full offline capability, I can prepare an Electron build that bundles a proper proxy inside the app (best user privacy and site compatibility).

Which proxy option do you want me to guide you through? (Cloudflare Worker / Replit Express / Electron bundled proxy)
