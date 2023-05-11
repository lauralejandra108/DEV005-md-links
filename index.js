
const colors = require('colors');
const fs = require('fs');
const path = require('path');
/*fs.readFile('README.md', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});*/

// Validar si existe una ruta
const route = '/Users/LauraAlejandra/Documents/YOGA BOOK';
//const route = '/Users/LauraAlejandra/Documents/DesarrolloW/LABORATORIA/data-lovers-pokemon';
let fileExists = fs.existsSync(route);
console.log('exists:', fileExists);

//Convertir a ruta absoluta
console.log(path.join(route));

//

//Mostrar los arhivos con extencion .md de un directorio 
files = fs.readdirSync(route);
console.log('/Filenames with the .md extension:');
files.forEach(file => {
  if (path.extname(file) === '.md') {
    console.log(file);
  }
   else {console.log('Esta carpeta no contiene archivos.md'.red);}
});

// Extraer links de archivos
