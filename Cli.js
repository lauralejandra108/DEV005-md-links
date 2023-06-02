const { mdLinks, route } = require('./md-links');
const { linkStats, brokenLinks } = require('./index');

const optionsU = process.argv[3];
const optionTwo = process.argv[4];
if (optionsU === '--validate') {
  mdLinks(route, { validate: true })
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('aqui estoy yo', res);
    });
}
if (optionsU === undefined && optionTwo === undefined) {
  mdLinks(route, { validate: false })
    .then((links) => {
      links.forEach((link) => {
        // eslint-disable-next-line no-console
        console.log(`Route: ${link.file}`);
        // eslint-disable-next-line no-console
        console.log(`Link: ${link.href}`);
        // eslint-disable-next-line no-console
        console.log(`Text: ${link.text}`);
        // eslint-disable-next-line no-console
        console.log('');
      });
    });
}
if (optionsU === '--stats' && optionTwo === undefined) {
  mdLinks(route, { validate: true })
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log(linkStats(res));
    });
}
if (optionsU === '--stats' && optionTwo === '--validate') {
  mdLinks(route, { validate: true })
    .then((res) => {
      const a = linkStats(res);
      // eslint-disable-next-line no-console
      console.log(`${' ✯☆★ Estadísticas y estado de los links ✯☆★'}`.bgMagenta);
      // eslint-disable-next-line no-console
      console.log(`${a} Broken: ${brokenLinks.length}`);
    });
}
