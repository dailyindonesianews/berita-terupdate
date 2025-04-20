const fs = require('fs');
const glob = require('fast-glob');

const baseUrl = 'https://dailyindonesianews.github.io/berita-terupdate/"; // Ganti jika kamu pakai custom domain

(async () => {
  try {
    const files = await glob([
      '**/*.html',
      '!node_modules/**',
      '!**/404.html',
      '!**/google*.html',
      '!**/rss.xml',
      '!**/sitemap.xml'
    ]);

    const urls = files.map(file => {
      const cleanPath = file
        .replace(/index\.html$/, '') // hapus index.html
        // .replace(/\.html$/, '')   // 🛑 Jangan hapus .html!
        .replace(/\\/g, '/');         // fix backslash Windows
      return `<url><loc>${baseUrl}/${cleanPath}</loc></url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemap.trim());
    console.log('✅ sitemap.xml berhasil dibuat!');
  } catch (err) {
    console.error('❌ Gagal generate sitemap:', err);
    process.exit(1);
  }
})();
