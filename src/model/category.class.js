// Aquí la clase Category

class Category{
    constructor(id,name,description = "No hay descripción"){
        this.id = id;
        this.name = name;
        this.description = description;
    }

    valueOf(){
        return this.id;
    }
}


module.exports = Category
