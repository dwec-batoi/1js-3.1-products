class product {
    
    constructor(id, name, category, price, units = 0) {
        this.id =id
        this.name = name
        this.category = category
        this.price = price
        this.units = units
    }

    productImport() {
        return this.price * this.units
    }

    toString() {
        return this.name + ': ' + this.units + ' uds. x ' + this.price + ' €/u = ' + this.productImport() + ' €'
    }
}

module.exports = product

