const {readMd, recursive, route} = require('./index')
const mdLinks = (path, Option) => new Promise((resolve, reject) =>{
    Promise.all(recursive(path).map((element) => readMd(element)))
    .then((results) => {
        const linksConcat = [].concat(...results);
      resolve(linksConcat);
    })
    .catch((error) => {
      reject(error);
    })
});
mdLinks(route)
.then((res) =>{
    console.log(res);
})
.catch((err) =>{
    console.log(err);
});