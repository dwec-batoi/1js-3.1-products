'use strict'
const Category = require('./category.class');
const Product = require('./product.class');
const data = require('./datosIni.json');

// Aquí la clase Store
class Store {

    constructor (id, name) {

        this.id = id;
        this.name = name;
        this.products = [];
        this.categories = [];

    }

    loadData () {

        data.categories.forEach(category => this.categories.push(new Category(category.id, category.name, category.description)));
        data.products.forEach(product => this.products.push(new Product(product.id, product.name, product.category, product.price, product.units)));

    }

    getCategoryById (id) {

        let category =  this.categories.find(category => category.id === parseInt(id));
        if(!category) {
            throw "No se encuentra ninguna categoría con id " + id;
        }
        return category;

    }

    getCategoryByName (name) {

        name = name.toLocaleLowerCase();
        let category =  this.categories.find(category => category.name.toLocaleLowerCase() == name);
        if(!category) {
            throw "No se encuentra ninguna categoría con nombre " + name;
        }
        return category;

    }

    getProductById (id) {

        let product =  this.products.find(product => product.id === parseInt(id));
        if(!product) {
            throw "No se encuentra ningun producto con id " + id;
        }
        return product;
    }

    getProductsByCategory (id) {

        let productList = this.products.filter(product => product.category === parseInt(id));
        return productList;
    }

    addCategory (name, description) {
       
        if(!name) {
            throw "No se puede crear una categría sin el parámetro name";
        }

        try {
            this.getCategoryByName(name.toLocaleLowerCase());       
        } catch {
            let id = this.nextCategoryId();
            let newCategory = new Category(id,name,description);       
            this.categories.push(newCategory);   
            return newCategory;
        }

        throw "La categoría con nombre " + name + " ya existe";

    }

    nextCategoryId () {

        return this.categories.reduce((max, category) => max > category.id ? max : category.id, 0) + 1;
    }

    addProduct (object) {

        if(!object.name) {
            throw "Debes pasar un atributo name";
        }

        if(!object.category) {
            throw "Category vacia o no existe en el almacen";
        }

        if(!object.price || object.price < 0 || isNaN(object.price)) {
            throw "Debes añadir un precio válido";
        }
        if(object.units) {
            if(object.units < 0 || !Number.isInteger(Number(object.units))) {
                throw "El atributo units debe ser un número entero positivo";
            } 
        }
       
        this.getCategoryById(Number(object.category));
        
        let nextId = this.nextProductId();
        
        let newProduct = new Product(nextId, object.name, object.category, object.price, object.units);
       
        this.products.push(newProduct);
        return newProduct;
        
    }

    nextProductId () {
        
        return this.products.reduce((max, product) => max > product.id ? max : product.id, 0) + 1;
    }

    delCategory (id) {
        
        let category = this.getCategoryById(id);
        if (!category) {
            throw "La categoría con id " + id + " no existe";
        }
        if(this.getProductsByCategory(id).length > 0) {
            throw "La categoria con id " + id + " tiene productos asociados";
        }
        let categoryIndex = this.categories.findIndex(category => category.id === parseInt(id));
        return this.categories.splice(categoryIndex, 1)[0];
    }
    

    delProduct (id) {  
        
        let product = this.getProductById(id); 
        if(product.units > 0) {
            throw "Debes seleccionar un producto con stock 0. Stock actual: " + product.units;
        }
        let productIndex = this.products.findIndex(product => product.id === parseInt(id));
        return this.products.splice(productIndex, 1)[0];
    
    }

    editProduct (object) {
        
        if(!object.name) {
            throw "Debes pasar un atributo name";
        }

        if(!object.category) {
            throw "Category vacia o no existe en el almacen";
        }

        if(!object.price || object.price < 0 || isNaN(object.price)) {
            throw "Debes añadir un precio válido";
        }
        if(object.units) {
            if(object.units < 0 || !Number.isInteger(Number(object.units))) {
                throw "El atributo units debe ser un número entero positivo";
            } 
        }
        
        let product = this.getProductById(object.id);
        product.name = object.name;
        product.price = object.price;
        product.units = object.units;
        product.category = object.category;

        return product;

    }

    totalImport () {

        return this.products.reduce((total, product) => total += product.productImport(), 0);

    }

    orderByUnitsDesc() {

        return this.products.sort((product1, product2) => product2.units - product1.units);
    }

    orderByName() {
        return this.products.sort((product1, product2) => product1.name.localeCompare(product2.name));
    }

    underStock(units) {

        return this.products.filter(product => product.units < units);
      
    }

    productNameExist (name) {
    
        return this.products.some(product => product.getName() === name);
    }

    toString() {
        let cabecera = 'Almacén ' + this.id + ' => ' + this.products.length +
        ' productos: ' + this.totalImport.toFixed(2) + ' €\n';
        let productos = this.products.map(product => '- ' + product);
        return  cabecera + productos;
    }


}
module.exports = Store

