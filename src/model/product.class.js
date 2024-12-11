// Aquí la clase Product

class Product{
    constructor(id,name,category,price,units = 0){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.units = units;
    }

    productImport(){
        return this.price * this.units;
    }

    toString(){
        return this.name + ": " + this.units + " uds. x " + this.price + " €/u = " + this.productImport().toFixed(2) + " €";
    }

    addUnits(){
        this.units++;
    }

    delUnits(){
        if(this.units === 0){
            throw "Las unidades no pueden ser menor que 0";
        }
        this.units--;
    }
}


module.exports = Product

