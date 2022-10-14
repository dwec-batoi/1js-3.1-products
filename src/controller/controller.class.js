'use stricts'

const Store = require("../model/store.class")
const View = require("../view/view.class")

class Controller {

    constructor () {

        this.store = new Store(1, 'Almacen ACME');
        this.view = new View();
        
    }

    init() {

        this.store.loadData();
        this.store.products.forEach(product => this.view.renderProduct(product));
        this.store.categories.forEach(category => this.view.setCategoryList(category));
        this.view.setTotalImport(this.store.totalImport());


        this.store.products.forEach(product =>  {
            this.addListeners(product.id);
        });
    
    }

    addProductToStore (payload) {

        try {
            let newProd;
           
            newProd = this.store.addProduct(payload);
            
            this.view.renderProduct(newProd);
            
            this.addListeners(newProd.id);
           
            this.view.setTotalImport(this.store.totalImport());
        } catch (err) {
            this.view.renderMessage(err);

        }
        
    }

    editProductFromStore (payload) {
        let product = this.store.editProduct(payload);
        this.view.editProductInStore(product);
        this.view.setTotalImport(this.store.totalImport());
        this.view.cleanProductTable();

    }

    upUnitsProductFromStore (id) {
        let product = this.store.getProductById(id);
        product.units++;
        this.view.editProductInStore(product);
        this.view.setTotalImport(this.store.totalImport());
    }

    downUnitsProductFromStore (id) {
        let product = this.store.getProductById(id);
        if(product.units > 0) {
            product.units--;
        }
        this.view.editProductInStore(product);
        this.view.setTotalImport(this.store.totalImport());
    }

    addCategoryToStore(payload) {

        try {
            const newCat = this.store.addCategory(payload.name, payload.description);
            this.view.setCategoryList(newCat);
        } catch (err) {
            this.view.renderMessage(err);
        }

    }

    deleteProductFromStore(productId) {

        try {
            const prodDel = this.store.delProduct(productId);
            this.view.removeProductFromTable(prodDel);
        } catch (err) {
            this.view.renderMessage(err);
        }

    }

    deleteCategoryFromStore(categoryId) {

        try {
            const catDel = this.store.delCategory(categoryId);
            this.view.removeCategoryFromTable(catDel);
        } catch (err) {
            this.view.renderMessage(err);
        }

    }

    editProductByForm(id) {

        const product = this.store.getProductById(id);
        this.view.fillProductTable(product);

    }

    addListeners (id) {
        this.addListenerToDeleteButom(id);
        this.addListenerToEditButom (id); 
        this.addListenerToUpButom (id);
        this.addListenerToDownButom (id); 
    }

    addListenerToDeleteButom (id) {
        const delButton = document.getElementById(id + "-id-prod-del"); 
        delButton.addEventListener('click', ()=> {
            this.deleteProductFromStore(id);
        });
    }

    addListenerToEditButom (id) {
        const editButton = document.getElementById(id + "-id-prod-edit"); 
        editButton.addEventListener('click', ()=> {
            this.editProductByForm(id);
        });
    }

    addListenerToUpButom (id) {
        const upButton = document.getElementById(id + "-id-prod-up"); 
        upButton.addEventListener('click', ()=> {
            this.upUnitsProductFromStore(id);
        });
    }

    addListenerToDownButom (id) {
        const downButton = document.getElementById(id + "-id-prod-down"); 
        downButton.addEventListener('click', ()=> {
            this.downUnitsProductFromStore(id);
        });
    }

}

module.exports = Controller;