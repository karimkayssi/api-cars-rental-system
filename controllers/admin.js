const express = require('express');
const Category = require('../models/category');
const Car = require('../models/car');
const Rental = require('../models/rental');
const Brand = require('../models/brands');
const router = express.Router();

router.get('/cars', async function (req, res) {
    const brandId = req.query.brand;
    const cars = await Car.getAll(brandId);
    res.json(cars);
});

router.get('/cars/:id', async function (req, res) {
    const id = req.params.id;
    const car = await Car.getById(id);
    res.json(car);
});

router.post('/cars', function (req, res) {
    const car = new Car(req.body);

    car.save().then(result => {
        console.log('Created Car');
        res.json(car);
    })
        .catch(err => {
            console.log(err);
        });
});

router.put('/cars/:id', function (req, res) {
    const car = new Car(req.body);

    car.update(id).then(result => res.json(result));
});

router.delete('/cars/:id', function (req, res) {
    const id = req.params.id;
    Car.delete(id).then(result => {
        res.status(200);
        res.end();
    });
})

/////////////////////////////////////////////////////////////////////////////////////////

router.get('/categories', async function (req, res) {
    const categories = await Category.getAll();
    res.json(categories);
});

router.post('/categories', function (req, res) {
    const category = new Category(req.body);

    category.save().then(result => {
        res.json(category);
    })
        .catch(err => {
            console.log(err);
        });
});

router.put('/categories/:id', function (req, res) {
    const id = req.params.id;

    const category = new Category(req.body);

    category.update(id).then(result => res.json(result));
});

router.delete('/categories/:id', function (req, res) {
    const id = req.params.id;
    Category.delete(id).then(result => {
        res.status(200);
        res.end();
    });
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.get('/brands', async function (req, res) {
    const brands = await Brand.getAll();
    res.json(brands);
});

router.post('/brands', function (req, res) {
    const brand = new Brand(req.body);

    brand.save().then(result => {
        res.json(brand);
    })
        .catch(err => {
            console.log(err);
        });
});

router.put('/brands/:id', function (req, res) {
    const id = req.params.id;

    const brand = new Brand(req.body);

    brand.update(id).then(result => res.json(result));
});

router.delete('/brands/:id', function (req, res) {
    const id = req.params.id;
    Brand.delete(id).then(result => {
        res.status(200);
        res.end();
    });
})

/////////////////////////////////////////////////////////////////////////////////////////////

router.get('/rental', async function (req, res) {
    const rental = await Rental.getAll();
    res.json(rental);
});

router.post('/rental', function (req, res) {
    const rental = new Rental(req.body);

    rental.save().then(result => {
        res.json(rental);
    })
        .catch(err => {
            console.log(err);
        });
});

router.put('/rental/:id', function (req, res) {
    const id = req.params.id;

    const rental = new Rental(req.body);

    rental.update(id).then(result => res.json(result));
});

router.delete('/rental/:id', function (req, res) {
    const id = req.params.id;
    Rental.delete(id).then(result => {
        res.status(200);
        res.end();
    });
})




module.exports = router;