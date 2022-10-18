'use strict'

class View {

    renderProduct(product) {

        const productUI = document.createElement('tr');
        productUI.id = product.id + "-id-prod";

        const deleteButtonUI = document.createElement('button');
        deleteButtonUI.id = productUI.id + "-del";
        deleteButtonUI.innerHTML = "<span class='material-icons'>delete</span>";

        const editButtonUI = document.createElement('button');
        editButtonUI.id = productUI.id + "-edit";
        editButtonUI.innerHTML = "<span class='material-icons'>edit</span>";

        const upButtonUI = document.createElement('button');
        upButtonUI.id = productUI.id + "-up";
        upButtonUI.innerHTML = "<span class='material-icons'>expand_less</span>";

        const downButtonUI = document.createElement('button');
        downButtonUI.id = productUI.id + "-down";
        downButtonUI.innerHTML = "<span class='material-icons'>expand_more</span>";

        productUI.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.units}</td>
        <td>${Number(product.price).toFixed(2)} €/u</td>
        <td>${Number(product.productImport()).toFixed(2)} €</td>
        <td class="action-prod-buton"></td>
        `
        const tbodyUI = document.querySelector('#almacen tbody');
        tbodyUI.appendChild(productUI);

        const actionColumnUI = productUI.lastElementChild;
        
        actionColumnUI.appendChild(upButtonUI);
        actionColumnUI.appendChild(downButtonUI);
        actionColumnUI.appendChild(editButtonUI);
        actionColumnUI.appendChild(deleteButtonUI);

        if(product.units < 1) {
            downButtonUI.disabled = true;
        } else {
            downButtonUI.disabled = false;
        }
    }

    renderMessage(err) {

        const errUI = document.createElement('div');
        errUI.className = "alert alert-danger alert-dismissible";
        errUI.role = "alert";
        errUI.innerHTML = err + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>';      
        const parentErrUI = document.getElementById('messages'); 
        parentErrUI.appendChild(errUI);

        setTimeout(() => errUI.remove(), 5000);
        
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

    fillProductTable (product) {

        document.getElementById('newprod-id').value = product.id;
        document.getElementById('newprod-name').value = product.name;
        document.getElementById('newprod-price').value  = product.price;
        document.getElementById('newprod-cat').value = product.category;
        document.getElementById('newprod-units').value = product.units;
        document.getElementById('quest-prod-button').innerHTML = "Editar";
        document.getElementById('prod-form-tittle').innerHTML = "Editar producto";

    }

    cleanProductTable (product) {

        document.getElementById('newprod-id').value = "";
        document.getElementById('newprod-name').value = "";
        document.getElementById('newprod-price').value  = "";
        document.getElementById('newprod-cat').value = "";
        document.getElementById('newprod-units').value = "";
        document.getElementById('quest-prod-button').innerHTML = "Añadir";
        document.getElementById('prod-form-tittle').innerHTML = "Añadir producto";

    }

    ocultarTodo () {

        document.getElementById("almacen").classList.add("oculto");
        document.getElementById("categorias-table").classList.add("oculto");
        document.getElementById("new-prod").classList.add("oculto");
        document.getElementById("newcat").classList.add("oculto");
        document.getElementById("del-cat").classList.add("oculto");
        document.getElementById("about").classList.add("oculto");

    }

    mostrarVista (id) {

        this.ocultarTodo();
        document.getElementById(id).classList.remove("oculto");

    }

    editProductInStore (product) {

        let productValueUI = document.getElementById(product.id + "-id-prod").firstElementChild;  
       
        productValueUI.innerHTML = product.id;
        productValueUI = productValueUI.nextElementSibling;
        productValueUI.innerHTML = product.name;
        productValueUI = productValueUI.nextElementSibling;
        productValueUI.innerHTML = product.category;
        productValueUI = productValueUI.nextElementSibling;
        productValueUI.innerHTML = product.units;
        productValueUI = productValueUI.nextElementSibling;
        productValueUI.innerHTML = product.price + " €/u";
        productValueUI = productValueUI.nextElementSibling;
        productValueUI.innerHTML = Number(product.productImport()).toFixed(2) + " €";

        if(product.units < 1) {
            document.getElementById(product.id + "-id-prod-down").disabled = true;
        } else {
            document.getElementById(product.id + "-id-prod-down").disabled = false;
        }

    }


}

module.exports = View;