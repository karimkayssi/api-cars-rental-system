const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Car {
    constructor({ id, title, imageURL, description, price }) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }

    save() {
        const db = getDb();
        return db.collection('cars').insertOne(this);
    }

    update(id) {
        const db = getDb();
        return db.collection('cars').updateOne({ _id: new mongodb.ObjectId(id) }, { $set: this });
    }

    static getAll() {
        const db = getDb();
        return db.collection('cars').find().toArray();
    }

    static delete(id) {
        const db = getDb();
        return db.collection('cars').deleteOne({ _id: new mongodb.ObjectId(id) });
    }

}


// static findById(id, cb){
//     getProductsFromFile(products => {
//         const products = products.find(p => p.id === id);
//         cb(product);
//     });
// };

module.exports = Car;