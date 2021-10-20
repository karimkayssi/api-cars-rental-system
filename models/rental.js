const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Rental {
    constructor({ userFirstName, userLastName, userMobileNumber, carId, startDate, endDate }) {
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userMobileNumber = userMobileNumber;
        this.carId = carId;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    save() {
        const db = getDb();
        return db.collection('rental').insertOne(this);
    }

    update(id) {
        const db = getDb();
        return db.collection('rental').updateOne({ _id: new mongodb.ObjectId(id) }, { $set: this });
    }

    static getAll() {
        const db = getDb();
        return db.collection('rental').find().toArray();
    }

    static getById(id) {
        const db = getDb();
        return db.collection('rental').findOne({ _id: new mongodb.ObjectId(id) });
    }

    static delete(id) {
        const db = getDb();
        return db.collection('rental').deleteOne({ _id: new mongodb.ObjectId(id) });
    }

}

module.exports = Rental;