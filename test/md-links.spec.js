const {
  readMd, recursive, validateLinks, getLinks, fileExists,
} = require('../index');
const { mdLinks } = require('../md-links');

describe('recursive', () => {
  it('should be a function', () => {
    expect(typeof recursive).toBe('function');
  });
  it('Buscar archivos con extension .md', () => {
    const userPath = '/Users/LauraAlejandra/Documents/pruebaMdL';
    const expectedArray = [
      '/Users/LauraAlejandra/Documents/pruebaMdL/Copia de DEV005-card-validation/FAQ.md',
      '/Users/LauraAlejandra/Documents/pruebaMdL/Copia de DEV005-card-validation/README.md',
    ];
    // const resultArray = recursive(userPath);
    expect(recursive(userPath)).toEqual(expectedArray);
  });
});
describe('readMd', () => {
  it('should be a function', () => {
    expect(typeof readMd).toBe('function');
  });
});
describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
});
describe('validateLinks', () => {
  it('should be a function', () => {
    expect(typeof validateLinks).toBe('function');
  });
});
describe('getLinks', () => {
  it('should be a function', () => {
    expect(typeof getLinks).toBe('function');
  });
});
describe('fileExists', () => {
  it('should be a function', () => {
    expect(typeof fileExists).toBe('function');
  });
});
