'use strict'

class View {

    renderProduct(product) {
        const productUI = document.createElement('tr');
        productUI.id = product.id + "-id-prod";
        productUI.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.units}</td>
        <td>${Number(product.price).toFixed(2)} €/u</td>
        <td>${Number(product.productImport()).toFixed(2)} €</td>
        <td></td>
        `
        const tbodyUI = document.querySelector('#almacen tbody');
        tbodyUI.appendChild(productUI);
    }

    renderMessage(err) {

        const errUI = document.createElement('div');
        errUI.className = "alert alert-danger alert-dismissible";
        errUI.role = "alert";
        errUI.innerHTML = err + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>';      
        const parentErrUI = document.getElementById('messages'); 
        parentErrUI.appendChild(errUI);
        
    }

    setCategoryList (category) {

        const categoryOption = document.createElement('option');
        categoryOption.innerHTML = category.name;
        categoryOption.id = category.id + "-id-cat";
        categoryOption.value = category.id;
        const tbodyUI = document.getElementById("newprod-cat");
        tbodyUI.appendChild(categoryOption);
    }

    setTotalImport (totalImport) {
        const totalUI = document.getElementById("total-import");
        totalUI.innerHTML = Number(totalImport).toFixed(2);
    }

    removeProductFromTable (product) {
        let $id = product.id + "-id-prod";
        document.getElementById($id).remove();
    }

    removeCategoryFromTable (category) {
        let $id = category.id + "-id-cat";
        document.getElementById($id).remove();
    }

}

module.exports = View;