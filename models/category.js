const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Category {
    constructor({ name, description, createdDate, updatedDate }) {
        this.name = name;
        this.description = description;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    save() {
        const db = getDb();
        return db.collection('categories').insertOne(this);
    }

    update(id) {
        const db = getDb();
        return db.collection('categories').updateOne({ _id: new mongodb.ObjectId(id) }, { $set: this });
    }

    static getAll() {
        const db = getDb();
        return db.collection('categories').find().toArray();
    }

    static getById(id) {
        const db = getDb();
        return db.collection('categories').findOne({ _id: new mongodb.ObjectId(id) });
    }

    static delete(id) {
        const db = getDb();
        return db.collection('categories').deleteOne({ _id: new mongodb.ObjectId(id) });
    }

}

module.exports = Category;