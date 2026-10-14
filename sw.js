// Bitácora de Hipertrofia · service worker (app shell sin conexión)
const V='bitacora-855727531f';
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./maskable-192.png", "./maskable-512.png", "./apple-touch-icon.png", "./favicon-32.png", "./shortcut-hoy-96.png", "./shortcut-peso-96.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:'reload'})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('bitacora-')&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(caches.match('./index.html').then(c=>c||fetch(r)).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r).then(res=>{if(res.ok&&res.type==='basic'){const cl=res.clone();caches.open(V).then(c=>c.put(r,cl))}return res})))});
