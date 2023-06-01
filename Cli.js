const { mdLinks, route } = require('./md-links');
const { linkStats, brokenLinks } = require('./index');

const optionsU = process.argv[3];
const optionTwo = process.argv[4];
if (optionsU === '--validate') {
  mdLinks(route, { validate: true })
    .then((res) => {
      console.log('aqui estoy yo', res);
    });
}
if (optionsU === undefined && optionTwo === undefined) {
  mdLinks(route, { validate: false })
    .then((links) => {
      links.forEach((link) => {
        console.log(`Route: ${link.file}`);
        console.log(`Link: ${link.href}`);
        console.log(`Text: ${link.text}`);
        console.log('');
      });
    });
}
if (optionsU === '--stats' && optionTwo === undefined) {
  mdLinks(route, { validate: true })
    .then((res) => {
      console.log(linkStats(res));
    });
}
if (optionsU === '--stats' && optionTwo === '--validate') {
  mdLinks(route, { validate: true })
    .then((res) => {
      const a = linkStats(res);
      console.log(`${' ✯☆★ Estadísticas y estado de los links ✯☆★'}`.bgMagenta);
      console.log(`${a} Broken: ${brokenLinks.length}`);
    });
}
