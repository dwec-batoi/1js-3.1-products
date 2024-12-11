'use strict'
const Category = require('./category.class');
const Product = require('./product.class');
const Dades = require('../datosIni.json');

class Store{
    constructor(id,name){
        this.id = id;
        this.name = name;
        this.products = [];
        this.categories = [];
    }

    productNameExist(name, id){
        return this.products.some((product) => product.name == name && product.id != id);
    }

    getCategoryById(id){
        let categoria = this.categories.find(category => category.id === id);
        if(categoria === undefined){
            throw "La categoria no existe"
        }
        return categoria;
    }

    getCategoryByName(name){
        let categoria = this.categories.find(category => category.name.toUpperCase() == name.toUpperCase());
        if(categoria === undefined){
            throw "La categoria no existe"
        }
        return categoria;
    }

    getProductById(id){
        let product = this.products.find(product => product.id === id);
        if(product === undefined){
            throw "La categoria no existe"
        }
        return product;    
    }

    getProductsByCategory(id){
        let producto = this.products.filter(product => product.category === id);
        if(producto === undefined){
            throw "La categoria no existe"
        }
        return producto;
    }

    

    addCategory(name, description){
        if(!name){
            throw "No has introducido nombre";
        }
        try{
            this.getCategoryByName(name)
        }catch(error){
            let categoriaNueva = new Category (
                this.categories.reduce((max, category) => (max > category.id) ? max : category.id, 0) + 1,
                name,
                description
            );
            this.categories.push(categoriaNueva);
            return categoriaNueva;
        }
        throw "Ya exisiste una categoria con este nombre"
    }

    addProduct(playload){
            this.comprobarDatos(playload);
            if(this.getCategoryById(playload.category)){
                let producto = new Product (this.getNextId(this.products),playload.name,playload.category,playload.price,playload.units);
                this.products.push(producto);
                return producto;
            }
    }

    delCategory(id){
        let categoria = this.getCategoryById(id);
        if(this.getProductsByCategory(id).length == 0){
            let posicion = this.categories.indexOf(categoria);
            this.categories.splice(posicion, 1);
        }else{
            throw "La categoria no esta vacia"
        }
        return categoria;
    }

    delProduct(id){
        let producto = this.getProductById(id);
        let posicion = this.products.indexOf(producto);
        this.products.splice(posicion, 1);
        return producto;
    }

    editProduct(playload){
        this.comprobarDatos(playload);
        let product = this.getProductById(playload.id);
        product.name = playload.name;
        product.category = playload.category;
        product.price = Number(playload.price);
        product.units = playload.units;
        return product;          
    }

    comprobarDatos(playload){
        if(!playload.name){
            throw "El nombre es requerido"
        }
        if(!playload.category){
            throw "La categoria es requerida"
        }
        if(!playload.price){
            throw "El precio es requerido"
        }
        if(playload.price < 0){
            throw "El precio no puede ser menor que cero"
        }
        if(isNaN(playload.price)){
            throw "El precio no puede ser menor que cero"
        }
        if(playload.units){
            if(isNaN(playload.units)){
                throw "Las unidades no son validas"
            }
            if(playload.units < 0){
                throw "El precio ha de ser positivo"
            }
            if(!Number.isInteger(playload.units)){
                throw "El precio ha de ser entero"
            }
        }
    }

    totalImport(){
        return this.products.reduce((price, product) => price += product.productImport(),0);
    }

    orderByUnitsDesc(){
        return this.products.sort((prod1, prod2) => prod2.units - prod1.units);
    }

    orderByName(){
        return this.products.sort((prod1, prod2) => prod1.name.localeCompare(prod2.name));
    }

    underStock(unidades){
        return this.products.filter((product) => product.units < unidades );
    }


    getNextId(array){
        return array.reduce((max, item) => (max > item.id) ? max : item.id, 0) + 1
    }
    
    toString(){
        return `Almacen '${id}' => '${this.products.length}' productos: '${this.totalImport()}'
        <br>
        '${this.products}`
    }

    init(){
        let categories = Dades.categories;
        categories.forEach(category => {
            this.categories.push(new Category(category.id,category.name, category.description))
        });

        let products = Dades.products;
        products.forEach(product => {
            this.products.push(new Product(product.id, product.name, product.category, product.price, product.units ))
        });
    }

}

module.exports = Store

