const { readMd, recursive } = require('../index');

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
