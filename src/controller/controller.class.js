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

        const ButomsUI = document.getElementsByClassName('action-prod-buton');
        Array.from(ButomsUI).forEach(button => button.firstElementChild.addEventListener('click', ()=> {
            const id = button.firstElementChild.id.split("-")[0];
            this.deleteProductFromStore(id);
        }))

        Array.from(ButomsUI).forEach(button => button.lastElementChild.addEventListener('click', ()=> {
            const id = button.lastElementChild.id.split("-")[0];
            this.editProductFromStore(id);
        }))

    }

    addProductToStore(payload) {

        try {
            let newProd;
            if(payload.id) {
                newProd = this.store.editProduct(payload);
                this.view.removeProductFromTable(newProd);
                this.view.cleanProductTable();
            } else {
                newProd = this.store.addProduct(payload);
            }
            this.view.renderProduct(newProd);
           
            const delButton = document.getElementById(newProd.id + "-id-prod-del"); 
            delButton.addEventListener('click', ()=> {
                this.deleteProductFromStore(newProd.id);
            });

            const editButton = document.getElementById(newProd.id + "-id-prod-edit"); 
            editButton.addEventListener('click', ()=> {
                this.editProductFromStore(newProd.id);
            });
           
            this.view.setTotalImport(this.store.totalImport());
        } catch (err) {
            this.view.renderMessage(err);

        }
        
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

    editProductFromStore(id) {
        const product = this.store.getProductById(id);
        this.view.fillProductTable(product);


    }

}

module.exports = Controller;