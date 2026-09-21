const CACHE='sgp-shell-v3';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./icon.svg','./icon-192.png','./icon-512.png']))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sgp-shell-')&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 // Never cache API calls, auth, configuration or uploaded documents.
 if(e.request.method!=='GET'||u.origin!==self.location.origin||u.pathname.endsWith('/config.js'))return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('./')));return;}
 if(/\.(js|css|png|svg|woff2)$/.test(u.pathname))e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;})));
});
