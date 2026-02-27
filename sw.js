const CACHE_NAME = 'cld-news-v1';
const ASSETS = [
  'index.html',
  'artigo.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap'
];

// Instalação e Cache de arquivos estáticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Estratégia: Tenta Rede, se falhar usa Cache (Network First)
// Ideal para notícias onde o conteúdo muda sempre
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
