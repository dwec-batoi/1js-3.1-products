const Store = require('../src/model/store.class');

describe('Constructor', () => {
	test('Existe la clase Store', () => {
		expect(Store).toBeDefined();
	});
	
	test('Se crea un almacén', () => {
		let alm1=new Store(2, 'store');
		expect(alm1.id).toBe(2);
		expect(alm1.name).toBe('store');
		expect(alm1.products).toEqual([]);
		expect(alm1.categories).toEqual([]);
	});	
})

describe('función addCategory', () => {
	test('crea una categoría en el almacén y su id es 1', () => {
		let almacen=new Store(1);
		let cat=almacen.addCategory('cat', 'Hola');
		expect(cat).toBeTruthy();
		expect(almacen.categories.length).toBe(1);
		expect(almacen.categories[0]).toEqual({id: 1, name: 'cat', description: 'Hola'});
	});
	
	test('crea dos categorías en el almacén y sus id son 1 y 2', () => {
		let almacen=new Store(1);
		let cat1=almacen.addCategory('cat1', 'Hola');
		expect(almacen.categories.length).toBe(1);
		let cat2=almacen.addCategory('cat2', 'Hola');
		expect(almacen.categories.length).toBe(2);
		expect(almacen.categories[0]).toEqual({id: 1, name: 'cat1', description: 'Hola'});
		expect(almacen.categories[1]).toEqual({id: 2, name: 'cat2', description: 'Hola'});
	});	
		
	test('si crea dos categorías y borra la 1ª, al crear otra nueva su id es 3', () => {
		let almacen=new Store(1);
		let cat1=almacen.addCategory('cat1', 'Hola');
		let cat2=almacen.addCategory('cat2', 'Hola');
		almacen.categories.splice(0, 1);
		let cat3=almacen.addCategory('cat3', 'Hola');
		expect(almacen.categories.length).toBe(2);
		expect(almacen.categories[1]).toEqual({id: 3, name: 'cat3', description: 'Hola'});
	});	

	test('no crea una categoría sin nombre', () => {
		let almacen=new Store(1);
		expect(() => almacen.addCategory()).toThrow();
		expect(almacen.categories.length).toBe(0);
	});
	
	test('no crea una categoría si existe el nombre', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1');
		expect(() => almacen.addCategory('Cat1')).toThrow();
		expect(almacen.categories.length).toBe(1);
	});
	
})

describe('función addProduct', () => {
	test('crea un producto en el almacén sin unidades y su id es 1', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let prod=almacen.addProduct({name: 'Producto 2', category: 1, price: 12.56});
		expect(prod).toBeTruthy();
		expect(almacen.products.length).toBe(1);
		expect(almacen.products[0]).toEqual({id: prod.id, category: 1, name: 'Producto 2', price: 12.56, units: 0});
	});
	
	test('crea dos productos en el almacén y sus id son distintas', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let prod1=almacen.addProduct({name: 'Producto 2', category: 1, price: 12.56});
		expect(prod1).toBeTruthy();
		expect(almacen.products.length).toBe(1);
		expect(almacen.products[0]).toEqual({id: prod1.id, category: 1, name: 'Producto 2', price: 12.56, units: 0});
		let prod2=almacen.addProduct({name:"Producto 3", category: 1, price: 0.12, units: 3});
		expect(prod2).toBeTruthy();
		expect(almacen.products.length).toBe(2);
		expect(almacen.products[1]).toEqual({id: prod2.id, category: 1, name: 'Producto 3', price: 0.12, units: 3});
		expect(prod2.id).not.toBe(prod1.id)
	});	
		
	test('si crea dos productos y borra el 1º, al crear otro nuevo su id es 3', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let prod1=almacen.addProduct({name: 'Producto 2', category: 1, price: 12.56});
		let prod2=almacen.addProduct({name:"Producto 3", category: 1, price: 0.12});
		almacen.products.splice(0, 1);
		let prod3=almacen.addProduct({name:"Producto nuevo", category: 1, price: 5.12});
		expect(almacen.products.length).toBe(2);
		expect(almacen.products[1]).toEqual({id: prod3.id, category: 1, name: 'Producto nuevo', price: 5.12, units: 0});
		expect(prod3.id).not.toBe(prod2.id)
	});	

	test('no crea un producto sin nombre', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.addProduct({name: '', category: 1, price: 12.56})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto sin categoría', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.addProduct({name: 'prod1', price: 12.56})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto si la categoría no existe', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.addProduct({name: 'prod1', category: 2, price: 12.56})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto sin precio', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.addProduct({category: 1, name: 'Product 1'})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto si precio no es nº', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.addProduct({category: 1, name: 'Product 1', price: 'asd'})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto si precio es negativo', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.addProduct({category: 1, name: 'Product 1', price: -12})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto si unidades no es nº', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.addProduct({category: 1, name: 'Product 1', price: 12, units: 'asd'})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto si unidades es negativo', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.addProduct({category: 1, name: 'Product 1', price: 12, units: -12})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
	
	test('no crea un producto si unidades no es entero', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.addProduct({category: 1, name: 'Product 1', price: 12, units: 1.12})).toThrow();
		expect(almacen.products.length).toBe(0);
	});
})

describe('función getCategoryById', () => {
	test('encuentra una categoría que existe', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let cat2=almacen.addCategory('cat2', 'Hola');
		let catSearched=almacen.getCategoryById(cat2.id);
		expect(catSearched).toEqual(cat2);
	});
	
	test('no encuentra una categoría que no existe', () => {
		let almacen=new Store(1);
		let cat = almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.getCategoryById(cat.id + 1)).toThrow();
	});	
})

describe('función getCategoryByName', () => {
	test('encuentra una categoría que existe', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let cat2=almacen.addCategory('cat2', 'Hola');
		let catSearched=almacen.getCategoryByName(cat2.name);
		expect(catSearched).toEqual(cat2);
	});
	
	test('encuentra una categoría que existe con distinta capitalización', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let cat2=almacen.addCategory('cat2', 'Hola');
		let catSearched=almacen.getCategoryByName('Cat2');
		expect(catSearched).toEqual(cat2);
	});
	
	test('no encuentra una categoría que no existe', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.getCategoryByName('cat')).toThrow();
	});	
})

describe('función getProductById', () => {
	test('encuentra un producto que existe', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let prod1=almacen.addProduct({category: 1, name: 'Producto 2', price: 12.56});
		let prod2=almacen.addProduct({category: 1, name:"Producto 3", price: 0.12});
		let prod=almacen.getProductById(prod2.id);
		expect(prod).toEqual({id: prod2.id, category: 1, name: 'Producto 3', price: 0.12, units: 0});
	});
	
	test('no encuentra un producto que no existe', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let prod=almacen.addProduct({category: 1, name: 'Producto 2', price: 12.56});
		expect(() => almacen.getProductById(prod.id + 1)).toThrow();
	});	
})

describe('función getProductsByCategory', () => {
	test('encuentra los productos que existen', () => {
		let almacen=new Store(1);
		let cat1 = almacen.addCategory('cat1', 'Hola');
		almacen.addCategory('cat2', 'Hola');
		let prod1=almacen.addProduct({category: 1, name: 'Producto 1', price: 12.56});
		almacen.addProduct({category: 2, name:"Producto 2", price: 0.12});
		let prod3 = almacen.addProduct({category: 1, name:"Producto 3", price: 0.12});
		let prods = almacen.getProductsByCategory(cat1.id);
		expect(prods).toEqual([prod1, prod3]);
	});
	
	test('devuelve un array vacío si no existe la categoría', () => {
		let almacen=new Store(1);
		let cat1 = almacen.addCategory('cat1', 'Hola');
		almacen.addProduct({category: 1, name: 'Producto 1', price: 12.56});
		almacen.addProduct({category: 1, name:"Producto 3", price: 0.12});
		expect(almacen.getProductsByCategory(cat1.id + 1)).toEqual([]);
	});	

	test('devuelve un array vacío si la categoría no tiene productos', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let cat2 = almacen.addCategory('cat2', 'Hola');
		almacen.addProduct({category: 1, name: 'Producto 1', price: 12.56});
		expect(almacen.getProductsByCategory(cat2.id)).toEqual([]);
	});	
})

describe('función delCategory', () => {
	test('Borra una categoría sin productos', () => {
		let almacen=new Store(1);
		let cat1 = almacen.addCategory('cat1', 'Hola');
		expect(almacen.delCategory(cat1.id)).toEqual(cat1);
		expect(almacen.categories.length).toBe(0);
	});	

	test('no borra una categoría con productos', () => {
		let almacen=new Store(1);
		let cat1 = almacen.addCategory('cat1', 'Hola');
		let prod=almacen.addProduct({category: 1, name: 'Producto 2', price: 12.56, units: 3});
		expect(() => almacen.delCategory(cat1.id)).toThrow();
		expect(almacen.categories.length).toBe(1);
	});
	
	test('no borra una categoría que no existe', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		expect(() => almacen.delCategory(cat1.id +1 )).toThrow();
		expect(almacen.categories.length).toBe(1);
	});
})

describe('función delProduct', () => {
	test('Borra un producto sin unidades', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let prod1=almacen.addProduct({category: 1, name: 'Producto 2', price: 12.56});
		let prod2=almacen.addProduct({category: 1, name:"Producto 3", price: 0.12});
		expect(almacen.delProduct(prod2.id)).toEqual({id: prod2.id, category: 1, name: 'Producto 3', price: 0.12, units: 0});
		expect(almacen.products.length).toBe(1);
	});	

	test('no borra un producto con unidades', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let prod=almacen.addProduct({category: 1, name: 'Producto 2', price: 12.56, units: 3});
		expect(() => almacen.delProduct(prod.id)).toThrow();
		expect(almacen.products.length).toBe(1);
	});
	
	test('no borra un producto que no existe', () => {
		let almacen=new Store(1);
		almacen.addCategory('cat1', 'Hola');
		let prod=almacen.addProduct({category: 1, name: 'Producto 2', price: 12.56});
		prod=almacen.addProduct({category: 1, name:"Producto 3", price: 0.12});;
		expect(() => almacen.delProduct(28)).toThrow();
		expect(almacen.products.length).toBe(2);
	});
})

test('Ordena alfabéticamente',() => {
	let alm2=new Store(2);
	alm2.addCategory('cat1', 'Hola');
	alm2.addProduct({category: 1, name: 'Ñu', price: 12.56, units: 5});
	alm2.addProduct({category: 1, name: 'Zzz', price: 12.56});
	alm2.addProduct({category: 1, name: 'Çcc', price: 12.56, units: 25});
	alm2.addProduct({category: 1, name: 'Éza', price: 12.56});
	alm2.addProduct({category: 1, name: 'Egb', price: 12.56, units: 8});
	alm2.addProduct({category: 1, name: 'erc', price: 12.56, units: 12});
	alm2.addProduct({category: 1, name: 'afzz', price: 12.56, units: 2});
	alm2.addProduct({category: 1, name: 'Ábzz', price: 12.56, units: 4});
	alm2.addProduct({category: 1, name: 'Adzz', price: 12.56});
	expect(alm2.orderByName().map(item=>item.name)).toEqual(
		[ "Ábzz", "Adzz", "afzz", "Çcc", "Egb", "erc", "Éza", "Ñu", "Zzz"]
	);
});

test('Ordena por unidades',() => {
	let alm2=new Store(2);
	alm2.addCategory('cat1', 'Hola');
	alm2.addProduct({category: 1, name: 'Ñu', price: 12.56, units: 5});
	alm2.addProduct({category: 1, name: 'Zzz', price: 12.56});
	alm2.addProduct({category: 1, name: 'Çcc', price: 12.56, units: 25});
	alm2.addProduct({category: 1, name: 'Éza', price: 12.56});
	alm2.addProduct({category: 1, name: 'Egb', price: 12.56, units: 8});
	alm2.addProduct({category: 1, name: 'erc', price: 12.56, units: 12});
	alm2.addProduct({category: 1, name: 'afzz', price: 12.56, units: 2});
	alm2.addProduct({category: 1, name: 'Ábzz', price: 12.56, units: 4});
	alm2.addProduct({category: 1, name: 'Adzz', price: 12.56});

	expect(alm2.orderByUnitsDesc().map(item=>item.units)).toEqual(
		[25, 12, 8, 5, 4, 2, 0, 0, 0]
	);
});

test('Lista stock bajo',() => {
	let alm2=new Store(2);
	alm2.addCategory('cat1', 'Hola');
	alm2.addProduct({category: 1, name: 'Ñu', price: 12.56, units: 5});
	alm2.addProduct({category: 1, name: 'Zzz', price: 12.56});
	alm2.addProduct({category: 1, name: 'Çcc', price: 12.56, units: 25});
	alm2.addProduct({category: 1, name: 'Éza', price: 12.56});
	alm2.addProduct({category: 1, name: 'Egb', price: 12.56, units: 8});
	alm2.addProduct({category: 1, name: 'erc', price: 12.56, units: 12});
	alm2.addProduct({category: 1, name: 'afzz', price: 12.56, units: 2});
	alm2.addProduct({category: 1, name: 'Ábzz', price: 12.56, units: 4});
	alm2.addProduct({category: 1, name: 'Adzz', price: 12.56});

	expect(alm2.underStock(5).map(item=>item.units)).toEqual(
		[0, 0, 2, 4, 0]
	);
});
