# cakcukator

Simple browser-in-browser demo that provides tabbed pages, paste/open HTML, and a public CORS proxy fallback for Chromebooks where Linux/Crostini is not available.

How to use

1. Visit: https://ppp65isking.github.io/cakcukator/
2. Use the address bar to load pages. The app uses a public proxy by default so many sites can load. Public proxy is not private — avoid sensitive sites.
3. Use "Paste HTML" or "Open file" to render local content.

Notes

- Some sites may still not work due to cross-origin restrictions or complex JS that expects the original origin.
- If you want a privacy-preserving setup, run a local proxy (requires Linux/Crostini) and update the script to point to it.
