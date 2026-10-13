UBos
=====

A tiny web-based OS (UBos) with two apps included:

- Browser: tabbed browser that uses a public CORS proxy and rewrites resources to route through the proxy. It also injects a small cookie bridge so pages can use document.cookie (emulated per origin in localStorage).
- Notepad: simple text editor that saves files to localStorage.

Notes & limitations
- This runs entirely in the browser and uses a public proxy (AllOrigins) to fetch remote pages and resources. Public proxies are not private — avoid loading sensitive sites.
- The cookie bridge is emulated and best-effort: websites running complex cross-origin logic or expecting real browser cookies may not behave identically.
- Some sites rely on many cross-origin requests and advanced features; they may still break.

Open the OS: https://ppp65isking.github.io/cakcukator/

If you want, I can:
- add more apps
- improve the cookie jar to parse/set individual cookies with expiry
- add a downloads folder and persistent storage for files
- replace the public proxy with a server-side proxy (more private) if you can run Crostini / Linux
