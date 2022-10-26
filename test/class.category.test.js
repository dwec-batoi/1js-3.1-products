const Category = require('../src/model/category.class');

describe('constructor', () => {
	test('Existe la clase Category', () => {
		expect(Category).toBeDefined();
	});
	
	test('crea una categoría con descripción', () => {
		let cat=new Category(2,"cat", 'Hola');
		expect(cat.description).toBe('Hola');
	});
	
	test('crea una categoría sin descripción', () => {
		let cat=new Category(2,"cat");
		expect(cat.description).toBe('No hay descripción');
	});
})
