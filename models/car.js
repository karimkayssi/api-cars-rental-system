const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Car {
    constructor({ title, description, numberOfRentals, image, categoryId, price, brandId }) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.price = price;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.numberOfRentals = numberOfRentals;
    }

    save() {
        const db = getDb();
        return db.collection('cars').insertOne(this);
    }

    update(id) {
        const db = getDb();
        return db.collection('cars').updateOne({ _id: new mongodb.ObjectId(id) }, { $set: this });
    }

    static getAll(brandId) {
        const db = getDb();
        const filters = {};
        if (brandId) {
            filters.brandId = brandId;
        }
        return db.collection('cars').find(filters).toArray();
    }

    static getById(id) {
        const db = getDb();
        return db.collection('cars').findOne({ _id: new mongodb.ObjectId(id) });
    }

    static delete(id) {
        const db = getDb();
        return db.collection('cars').deleteOne({ _id: new mongodb.ObjectId(id) });
    }

}

module.exports = Car;