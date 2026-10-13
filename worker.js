// Cloudflare Worker proxy (worker.js)
// Deploy this with Cloudflare Workers (dashboard or wrangler). It fetches any URL and returns the response.
// It streams binary responses correctly and rewrites HTML to inject a base tag if needed.
addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

async function handle(request){
  const url = new URL(request.url);
  const target = url.searchParams.get('url');
  if(!target){
    return new Response('Missing ?url=', { status: 400 });
  }

  try{
    const originResp = await fetch(target, { redirect: 'follow' });
    const contentType = originResp.headers.get('content-type') || '';
    // For HTML, rewrite slightly to add base tag
    if(contentType.includes('text/html')){
      const text = await originResp.text();
      // naive injection of base tag
      let out = text;
      if(/<head[^>]*>/i.test(out)){
        out = out.replace(/<head([^>]*)>/i, `<head$1><base href="${escapeHtml(target)}">`);
      } else {
        out = `<base href="${escapeHtml(target)}">` + out;
      }
      const headers = new Headers(originResp.headers);
      headers.set('Access-Control-Allow-Origin', '*');
      return new Response(out, { status: originResp.status, headers });
    }
    // For other content types (images, css, js), stream through with CORS
    const headers = new Headers(originResp.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    return new Response(originResp.body, { status: originResp.status, headers });
  }catch(err){
    return new Response('Proxy fetch failed: ' + err.message, { status: 502 });
  }
}

function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;'); }
