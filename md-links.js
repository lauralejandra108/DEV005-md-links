/* eslint-disable no-console */
const {
  readMd, recursive, route, fileExists, validateLinks,
} = require('./index');

const mdLinks = (path, options = { validate: false }) => new Promise((resolve, reject) => {
  if (!fileExists(path)) {
    reject(new Error('La ruta no existe'));
  }
  Promise.all(recursive(path).map((element) => readMd(element)))
    .then((results) => {
      const linksConcat = [].concat(...results);
      if (options.validate) {
        console.log('entró ', options.validate);
        validateLinks(linksConcat)
          .then((resValidate) => {
            resolve(resValidate);
          })
          .catch((err) => { console.log(err.message); });
      } else {
        resolve(linksConcat);
      }
    })
    .catch((error) => {
      reject(error);
    });
});

module.exports = {
  mdLinks,
  route,
};
