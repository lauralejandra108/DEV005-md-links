
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');
const route = process.argv[2];
// Validar si existe una ruta
//const route = '/Users/LauraAlejandra/Documents/YOGA BOOK';
/* const route = '/Users/LauraAlejandra/Documents/pruebaMdL'; */
let fileExists = fs.existsSync(route);
console.log('exists:', fileExists);

//
const recursive = (route) => {
  let arryMd = [];
  if (fs.statSync(route).isFile() &&  path.extname === '.md'){
    arryMd.push(route);
  } else {
    files = fs.readdirSync(route);
    files.forEach(file => {
      let  newroute = path.join(route, file);
      if(fs.statSync(newroute).isDirectory()){
        arryMd = arryMd.concat(recursive(newroute));
      } else {
        arryMd.push(newroute);
      }
  })
}
return  arryMd.filter(file => path.extname(file) === '.md');
 }
 const arryMd = recursive(route);
console.log('funciona', recursive(route));


//Convertir a ruta absoluta
const absolutePath = path.resolve(route);
console.log( 'Ruta Absoluta'.bgMagenta, absolutePath);

// Leer los arhivos 
 const readMd = (arryMd) => 
 new Promise((resolve, reject) => {
  fs.readFile( arryMd, 'utf8', (err, data) => {
    if (err) reject(new Error(err));
      resolve(data);
  });
 });
  const readMds = (arryMd) =>{
    return Promise.all(arryMd.map((element) => readMd(element)))
    .then((results) => {
      
      console.log(getLinks(results) ); 
    })
    .catch((error) => {
  console.error(error);
  });
   };
     readMds(arryMd);
   
// Extraer links de archivos
const getLinks = (file) => {
  let allLinks = [];
  file.forEach((e) => {
  const md = new markdownIt();
  const content = md.render(e);
  const dom = new JSDOM(content);
  const { document } = dom.window;
  const links = document.querySelectorAll('a');

    links.forEach((link) => {
      const href = link.getAttribute('href');
      const text = link.textContent;
      const file = route;
      if (href.startsWith('https')){
      allLinks.push({ href, text, file });
      }
     });
    });
 return allLinks;
  };
  

/* const getLinks = (data) => {
  let url =  /\[([^\[\]]*?)\]\((https?:\/\/[^\s$.?#].[^\s]*)\)/g ;
  let arrayL = data.toString().match(url)
if(arrayL && arrayL!== undefined){
    return  arrayL  
}
};
console.log('Esto me trae links', getLinks(arryMd)); */