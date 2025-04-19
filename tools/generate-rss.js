// tools/generate-rss.js
const fs = require("fs");

const content = `
<rss version="2.0">
  <channel>
    <title>Daily Indonesia News</title>
    <link>https://dailyindonesianews.github.io</link>
    <description>Berita Terupdate Hari Ini</description>
    <item>
      <title>Contoh Berita Pertama</title>
      <link>https://dailyindonesianews.github.io/berita-pertama</link>
      <description>Ini adalah contoh berita pertama.</description>
    </item>
  </channel>
</rss>
`.trim();

fs.writeFileSync("rss.xml", content);
console.log("rss.xml berhasil dibuat!");
