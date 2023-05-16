
const colors = require('colors');
const fs = require('fs');
const path = require('path');
// Validar si existe una ruta
//const route = '/Users/LauraAlejandra/Documents/YOGA BOOK';
const route = '/Users/LauraAlejandra/Documents/pruebaMdL';
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
console.log('funciana', recursive(route));


//Convertir a ruta absoluta
const absolutePath = path.resolve(route);
console.log( 'Ruta Absoluta'.bgMagenta, absolutePath);

// Extraer links de archivos
