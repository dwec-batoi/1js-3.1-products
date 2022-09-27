'use strict'

const Category = require('./category.class');
const Product = require('./product.class');

// Aquí la clase Store

class Store {

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.products = new Array();
        this.categories = new Array();
    }

    getCategoryById(id) {
        let category = this.categories.find(category => category.id === id);
        if (!category) {
            throw "No se encuentra ninguna cagegoría con id " + id;
        }
        return category;
    }

    getCategoryByName(name) {
        let category = this.categories.find(category => category.name.toLocaleLowerCase() === name.toLocaleLowerCase());
        if (!category) {
            throw "No se encuentra ninguna cagegoría con nombre " + name;
        }
        return category;
    }

    getProductById(id) {
        let product = this.products.find(croduct => croduct.id === id);
        if (!product) {
            throw "No se encuentra ningún producto con id " + id;
        }
        return product;
    }

    getProductsByCategory(id) {
        let products = this.products.filter(product => product.category === id);
        return products;
    }

    addCategory(name, description) {
        if (!name) {
            throw "No se ha indicado ningún nombre";
        }
        try {
            this.getCategoryByName(name);
        } catch {
            let id = this.categories.reduce((max, category) => max > category.id ? max : category.id, 0) + 1;
            let category = new Category (id, name, description);
            this.categories.push(category);
            return category;
        }
        throw "Ya existe la categoría";
    }

    addProduct(product) {
        if (!product.name) {
            throw "No se ha indicado ningún nombre";
        }
        if (!product.category) {
            throw "No se ha indicado categoría";
        }
        if (!product.price || isNaN(product.price)) {
            throw "No se ha indicado un precio o su formato es incorrecto";
        }
        if (product.price < 0) {
            throw "El precio es inferior a 0";
        }
        if (product.units && (!Number.isInteger(product.units) || isNaN(product.units))) {
            throw "La unidades tienen un formato";
        }
        if (product.units < 0) {
            throw "Las unidades son inferior a 0";
        }

        this.getCategoryById(product.category);
        let id = this.products.reduce((max, product) => max > product.id ? max : product.id, 0) + 1;
        let newProduct = new Product (id, product.name, product.category, product.price, product.units);
        this.products.push(newProduct);
        return newProduct;
    }

    delCategory(id) {
        let category = this.getCategoryById(id);
        if (!category) {
            throw "La categoría no existe";
        }
        if (this.getProductsByCategory(id).length > 0) {
            throw "La categoría contiene productos";     
        } else {
            let catIndex = this.categories.findIndex(category => category.id === id);
            this.categories.splice(catIndex,1);
            return category;
        }  
    }

    delProduct(id) {
        let producto = this.getProductById(id);
        if (producto.units > 0) {
            throw "El producto todavía tiene unidades"; 
        }
        let productIndex = this.products.findIndex(product => product.id === id);
        this.products.splice(productIndex, 1);
        return producto;
    }

    totalImport() {
        return this.products.reduce((total, product) => total += product.producImport(), 0);
    }

    orderByUnitsDesc() {
        return this.products.sort((elem1, elem2) => elem2.units - elem1.units);
    }

    orderByName() {
        return this.products.sort((elem1, elem2) => elem1.name.localeCompare(elem2.name));
    }

    underStock(units) {
        return this.products.filter(function(product) {
            if (product.units < units) {
                return true;
            } else {
                return false;
            }
        });
    }

    toString() {
        let cabecera = 'Almacén ' + this.id + ' => ' + this.products.length +
        ' productos: ' + this.totalImport.toFixed(2) + ' €\n';
        let productos = this.products.map(product => '- ' + product);
        return  cabecera + productos;
    }

}

module.exports = Store