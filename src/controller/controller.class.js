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

    }

    addProductToStore(payload) {

        try {
            const newProd = this.store.addProduct(payload);
            this.view.renderProduct(newProd);
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


}

module.exports = Controller;