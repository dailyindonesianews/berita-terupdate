const fs = require('fs');
const cheerio = require('cheerio');
const fg = require('fast-glob');

const baseUrl = "https://USERNAME.github.io/NAMA-REPO";
const files = fg.sync('*.html');

const items = files.map((file) => {
    const html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html);
    const title = $('h1').first().text() || file.replace('.html', '');
    const url = `${baseUrl}/${file}`;
    return `
    <item>
        <title>${title}</title>
        <link>${url}</link>
    </item>`;
});

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Berita Terbaru</title>
  <link>${baseUrl}</link>
  <description>RSS Feed Berita Otomatis</description>
  ${items.join('')}
</channel>
</rss>`;

fs.writeFileSync('rss.xml', rss);
console.log("✅ rss.xml generated");
