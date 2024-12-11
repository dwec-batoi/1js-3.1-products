'use strict'

const Category = require("../model/category.class");
const Product = require("../model/product.class");
const productList = document.getElementById('prodList');
const addProd = document.getElementById('new-prod')
const addCat = document.getElementById('new-cat');
const catList = document.getElementById('catList');

class View{
    
    init(categories, products, callback1, callback2, callback3){
        this.initCategories(categories);
        this.initProducts(products, callback1, callback2, callback3);
    }

    renderCategory(category){
        const opcionesCategorias = document.getElementById('categorias');
        let nuevaOption = this.appendCategory(category);
        opcionesCategorias.appendChild(nuevaOption);
    }

    renderProduct(product, callback1, callback2, callback3){
        let productos = document.getElementById('listaProductos');
        let nuevoProducto = this.appendProduct(product);
        productos.appendChild(nuevoProducto);
        this.appendEvents(product, callback1, callback2, callback3);
    }

    deleteProduct(id){
        let productos = document.getElementById('listaProductos');
        productos.removeChild(document.getElementById(`producto${id}`))
    }

    initCategories(categories){
        const opcionesCategorias = document.getElementById('categorias');
        categories.forEach(category =>{
            let newOption = this.appendCategory(category);
            opcionesCategorias.appendChild(newOption);
            this.appendCategoryList(category);
        })
    }

    deleteCategory(categories){
        const opcionesCategorias = document.getElementById('categorias');
        let option = document.getElementById(`category${categories.id}`);
        opcionesCategorias.removeChild(option);
    }

    
    setTotalImport(totalImport){
        let importe = document.getElementById('importeTotal');
        importe.textContent = totalImport.toFixed(2) + "€";
    }

    editForm(prod){
        document.getElementById('newprod-id').value = prod.id;
        document.getElementById('newprod-name').value = prod.name;
        document.getElementById('newprod-price').value = prod.price;
        document.getElementById('categorias').value = prod.category;
        document.getElementById('newprod-units').value = prod.units;
        document.getElementById('botonFormulario').textContent = "Editar";
        document.getElementById('action').value = "edit";
        document.getElementById('tituloForm').textContent = "Editar Producto";
        document.getElementById('headForm').textContent = "Editar Producto";
        productList.classList.add('oculto');
        addProd.classList.remove('oculto');
    }

    editProduct(prod){
        let producto = document.getElementById(`producto${prod.id}`);
        producto.children[1].textContent = prod.name;
        producto.children[2].textContent = prod.category;
        producto.children[3].textContent = prod.units;
        producto.children[4].textContent = prod.price + "€/u";
        producto.children[5].textContent = (prod.productImport()).toFixed(2) + "€";
        document.getElementById('action').value = "add";
        document.getElementById('botonFormulario').textContent = "Añadir";
        document.getElementById('tituloForm').textContent = "Añadir Producto";
    }

    appendCategoryList(category){
        let listadoCategorias = document.getElementById('listaCategorias');
        let nuevaCategoria = document.createElement('tr');
        nuevaCategoria.id = `categoria${category.id}`;
        nuevaCategoria.innerHTML = `
            <td>${category.id}</td>
            <td>${category.name}</td>
            <td>${category.description}</td>
            <td></td>`;
        listadoCategorias.appendChild(nuevaCategoria);
    }

    initProducts(products, callback1, callback2, callback3){
        const listaProductos = document.getElementById('listaProductos')
        products.forEach(product =>{
            let nuevoProducto = this.appendProduct(product);
            listaProductos.appendChild(nuevoProducto);
            this.appendEvents(product, callback1, callback2, callback3);
        })
    }

    renderUnits(product){
        let units = document.getElementById(`units${product.id}`);
        let importe = document.getElementById(`import${product.id}`);
        units.textContent = product.units;
        importe.textContent = (product.productImport()).toFixed(2);
    }

    appendProduct(product){
        let nuevoProducto = document.createElement('tr');
            nuevoProducto.id = `producto${product.id}`;
            nuevoProducto.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td id="units${product.id}">${product.units}</td>
            <td id="price${product.id}">${product.price} €/u</td>
            <td id="import${product.id}">${product.productImport()}€</td>
            <td>
                <button class="btn" id="subirUnidades${product.id}"><span class="material-icons">add</span></button>
                <button class="btn btn-danger" id="eliminarProducto${product.id}"><span class="material-icons">delete</span></button>
                <button class="btn btn-warning" id="editarProducto${product.id}"><span class="material-icons">edit</span></button>
                <button class="btn" id="bajarUnidades${product.id}"><span class="material-icons">remove</span></button>
            </td>`
            return nuevoProducto;
    }

    renderMessaje(mensajeEror){
        let error = document.getElementById('messages');
        let div = document.createElement('div');
        div.classList = `alert alert-danger alert-dismissible`;
        div.setAttribute('role','alert');
        div.innerHTML +=`
        ${mensajeEror}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>
        </div>`;
        error.appendChild(div);

        setTimeout(function(){
            div.remove();
        },5000);
    }

    initMenu(){
        let addProduct = document.getElementById('addProd-view');
        let addProductForm = document.getElementById('new-prod');
        addProduct.addEventListener('click', () =>{this.viewElement(addProductForm)});
        
        let addCat = document.getElementById('addCat-view');
        let addCatForm = document.getElementById('new-cat');
        addCat.addEventListener('click', () =>{this.viewElement(addCatForm)});
        
        let listProd = document.getElementById('prods-view');
        let listado = document.getElementById('prodList');
        listProd.addEventListener('click', () =>{this.viewElement(listado)});

        let listCat = document.getElementById('cat-view');
        let listadoCategorias = document.getElementById('catList');
        listCat.addEventListener('click', () =>{this.viewElement(listadoCategorias)});
    }

    viewElement(element){
        productList.classList.add('oculto');
        addCat.classList.add('oculto');
        addProd.classList.add('oculto');
        catList.classList.add('oculto');

        element.classList.remove('oculto');
    }

    appendCategory(category){
        let nuevaOption = document.createElement('option');
        nuevaOption.id = "category" + category.id;
        nuevaOption.value = category.id
        nuevaOption.label = category.name;
        return nuevaOption;
    }

    appendEvents(product, callback1, callback2, callback3){
        document.getElementById(`eliminarProducto${product.id}`).addEventListener('click', () => {
            callback1(product.id);
        })
        document.getElementById(`subirUnidades${product.id}`).addEventListener('click', () => {
            callback2(product.id);
        })
        document.getElementById(`bajarUnidades${product.id}`).addEventListener('click', () => {
            callback3(product.id);
        })
        document.getElementById(`editarProducto${product.id}`).addEventListener('click', () => {
            this.editForm(product);
        })
    }
}

module.exports = View
