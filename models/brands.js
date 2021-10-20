const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Brand {
    constructor({ name, description, showNbbrands, createdDate, updatedDate }) {
        this.name = name;
        this.description = description;
        this.showNbbrands = showNbbrands;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    save() {
        const db = getDb();
        return db.collection('brands').insertOne(this);
    }

    update(id) {
        const db = getDb();
        return db.collection('brands').updateOne({ _id: new mongodb.ObjectId(id) }, { $set: this });
    }

    static getAll() {
        const db = getDb();
        return db.collection('brands').aggregate(
            [{
                $lookup: {
                    from: "cars",
                    localField: "_id",
                    foreignField: "brandId",
                    as: "numberOfCars"
                }
            },
            { $addFields: { "numberOfCars": { $size: "$numberOfCars" } } }])
            .sort({ _id: -1 }).toArray();
    }

    static getById(id) {
        const db = getDb();
        return db.collection('brands').findOne({ _id: new mongodb.ObjectId(id) });
    }

    static delete(id) {
        const db = getDb();
        return db.collection('brands').deleteOne({ _id: new mongodb.ObjectId(id) });
    }

}

module.exports = Brand;