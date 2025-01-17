// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');

const route = process.argv[2];
// Validar si existe una ruta
// const route = '/Users/LauraAlejandra/Documents/YOGA BOOK';
// const route = '/Users/LauraAlejanxdra/Documents/pruebaMdL';

// eslint-disable-next-line no-shadow
const fileExists = (route) => fs.existsSync(route);
// console.log('exists:', fileExists);
// Convertir a ruta absoluta
// eslint-disable-next-line no-shadow
const absolutePath = (route) => path.resolve(route);
// console.log( 'Ruta Absoluta'.bgMagenta, absolutePath);

// eslint-disable-next-line no-shadow
const recursive = (route) => {
  let arryMd = [];
  if (fs.statSync(route).isFile()) {
    const absolutP = absolutePath(route);
    arryMd.push(absolutP);
  } else {
    const files = fs.readdirSync(route);
    files.forEach((file) => {
      const newroute = path.join(route, file);
      const absolutP = absolutePath(newroute);
      if (fs.statSync(newroute).isDirectory()) {
        arryMd = arryMd.concat(recursive(absolutP));
      } else {
        arryMd.push(newroute);
      }
    });
  }
  return arryMd.filter((file) => path.extname(file) === '.md');
};
// const arryMd = recursive(route);
// console.log('funciona', recursive(route));

// Extraer links de archivos
const getLinks = (file, data) => {
  const allLinks = [];
  const md = new MarkdownIt();
  const content = md.render(data);
  const dom = new JSDOM(content);
  const { document } = dom.window;
  const links = document.querySelectorAll('a');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    const text = link.textContent;
    if (href.startsWith('https')) {
      allLinks.push({ href, text, file });
    }
  });
  return allLinks;
};

// Leer los arhivos
const readMd = (arryMd) => new Promise((resolve, reject) => {
  fs.readFile(arryMd, 'utf8', (err, data) => {
    if (err) reject(new Error(err));
    resolve(getLinks(arryMd, data));
  });
});
const validateLinks = (links) => Promise.all(links.map((link) => fetch(link.href)
  .then((response) => {
    // const validateLink = {
    // eslint-disable-next-line no-param-reassign
    link.status = response.status;
    // eslint-disable-next-line no-param-reassign
    link.statusText = response.statusText;
    // }>
    return link;
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Error', error);
  })));

const linkStats = (links) => {
  const totaLinks = links.length;
  const unique = new Set(links.map((item) => item.href));
  const uniqueCount = unique.size;
  return (`Totals: ${totaLinks} Unique: ${uniqueCount}`);
};
const brokenLinks = (links) => {
  const brokenCount = links.filter((result) => result.Status !== 'OK').length;
  return (brokenCount);
};
module.exports = {
  readMd,
  recursive,
  route,
  fileExists,
  validateLinks,
  getLinks,
  // eslint-disable-next-line no-dupe-keys
  fileExists,
  linkStats,
  brokenLinks,
};

/* const getLinks = (data) => {
  let url =  /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/g ;
  let arrayL = data.toString().match(url)
if(arrayL && arrayL!== undefined){
    return  arrayL
}
};
console.log('Esto me trae links', getLinks(arryMd)); */
