const { response } = require('express');
const express = require('express');
const Car = require('../models/car');
const router = express.Router();

router.get('/cars', async function (req, res) {
    const cars = await Car.getAll();
    res.json(cars);
    //Equivalent to: Car.getAll().then(result => res.json(result));
});

router.post('/cars', function (req, res) {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;

    const car = new Car({
        title: title,
        imageURL: imageURL,
        price: price,
        description: description
    });

    car.save().then(result => {
        console.log('Created Car');
        res.json(car);
    })
        .catch(err => {
            console.log(err);
        });
});

router.put('/cars/:id', function (req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const car = new Car({
        title: title,
        imageURL: imageURL,
        price: price,
        description: description
    });

    car.update(id).then(result => res.json(result));
});

router.delete('/cars/:id', function (req, res) {
    const id = req.params.id;
    Car.delete(id).then(result => {
        res.status(200);
        res.end();
    });
})


module.exports = router;