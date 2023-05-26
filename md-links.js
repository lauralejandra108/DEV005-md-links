const {
  readMd, recursive, route, fileExists,
} = require('./index');

const mdLinks = (path, Option) => new Promise((resolve, reject) => {
  if (!fileExists(path)) {
    reject(new Error('La ruta no existe cacha bien'));
  }
  Promise.all(recursive(path).map((element) => readMd(element)))
    .then((results) => {
      const linksConcat = [].concat(...results);
      resolve(linksConcat);
    })
    .catch((error) => {
      reject(error);
    });
});
mdLinks(route)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
