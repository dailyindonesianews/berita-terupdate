const fs = require('fs');
const glob = require('fast-glob');

const baseUrl = 'https://dailyindonesianews.github.io'; // ganti sesuai domain kamu

(async () => {
  const files = await glob(['**/*.html', '!node_modules/**', '!**/404.html']);

  const urls = files.map(file => {
    const path = file.replace(/index\.html$|\.html$/g, '').replace(/\\/g, '/');
    return `<url><loc>${baseUrl}/${path}</loc></url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  fs.writeFileSync('sitemap.xml', sitemap.trim());
  console.log('✅ sitemap.xml berhasil dibuat');
})();
