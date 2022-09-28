'use strict'

// Creamos un nuevo almacén con id 1
// Antes hemos haber importado la clase Store para poder usarla
const Store = require('./store.class');
const myStore = new Store(1, 'Almacén de ACME')

myStore.loadData()

// Añadimos los objetos
try {
    var catInformatica = myStore.addCategory('Informática')
} catch(err) {
    console.error(err)
}

try {
    var tv = myStore.addProduct({ 
        name: 'TV Samsung MP45', 
        category: catInformatica.id, 
        price: 345.95, 
        units: 3
    })
    var abaco = myStore.addProduct({ 
        name: 'Ábaco de madera', 
        category: catInformatica.id, 
        price: 245.95, 
        units: 45
    })
    var impr = myStore.addProduct({ 
        name: 'impresora Epson LX-455', 
        category: catInformatica.id, 
        price: 45.95
    })
    var usb = myStore.addProduct({ 
        name: 'USB Kingston 16GB', 
        category: catInformatica.id, 
        price: 5.95
    })
} catch(err) {
    console.error(err)
}

// Eliminamos el producto
try {
    myStore.delProduct(usb.id)
} catch(err) {
    console.error(err)
}

// Mostramos por consola todo lo que nos piden
console.log('LISTADO DEL ALMACÉN por existencias')
myStore.orderByUnitsDesc().forEach(prod=>console.log('- '+prod))

console.log('LISTADO DEL ALMACÉN por nombre')
myStore.orderByName().forEach(prod=>console.log('- '+prod))

console.log('LISTADO DE PRODUCTOS CON POCAS EXISTENCIAS')
myStore.underStock(10).forEach(prod=>console.log('- '+prod))