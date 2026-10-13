Replit Express proxy (server.js)

This is an alternative to Cloudflare Workers — you can host this on Replit (no local Linux required) or any Node host.

```js
// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.get('/proxy', async (req,res)=>{
  const target = req.query.url;
  if(!target) return res.status(400).send('Missing ?url=');
  try{
    const resp = await fetch(target);
    const contentType = resp.headers.get('content-type') || '';
    if(contentType.includes('text/html')){
      let html = await resp.text();
      if(/<head[^>]*>/i.test(html)) html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${target}">`);
      else html = `<base href="${target}">` + html;
      res.set('Access-Control-Allow-Origin','*').type('html').send(html);
      return;
    }
    // stream binary
    res.set('Access-Control-Allow-Origin','*');
    resp.body.pipe(res);
  }catch(e){ res.status(500).send('proxy error '+e.message); }
});
app.listen(process.env.PORT||3000, ()=> console.log('proxy running'));
```

Usage
- For Cloudflare Worker: deploy `worker.js` and use the worker URL like `https://your-worker.example.workers.dev/?url=https://example.com`
- For Replit/Express: deploy server.js and use `https://your-replit.herokuapp.com/proxy?url=` (or the Replit URL)

Security
- Running your own proxy is more private than using public proxies. Do not deploy a proxy that allows arbitrary access without rate limiting or abuse protection in production.
