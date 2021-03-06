const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoose = require('mongoose');

let _db;

const mongoConnect = callback => {

    const conStr = 'mongodb+srv://karim:karim%40123@cluster0.4kikr.mongodb.net/car_rental_system?retryWrites=true&w=majority';
    MongoClient.connect(conStr)
        .then(client => {
            console.log('Connected to Mongo!');
            _db = client.db('');
            //callback(client);
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });

        mongoose.connect(conStr)
};

    const getDb = () => {
        if(_db) {
            return _db;
        }
        throw 'No database found!';
    }

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;