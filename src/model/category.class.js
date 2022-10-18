'use strict'

class Category {

    constructor (id, name, description = "No hay descripción") {
        this.id = id;
        this.name = name;
        this.description = description;
    }

}


module.exports = Category

