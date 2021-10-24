const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const adminRoutes = require('./controllers/admin');
const mongoose = require('mongoose');
const { mongoConnect } = require('./util/database');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'adfjlkasjdfljasdfjeoihtp4t-30j4thw34-t';

mongoose.connect('mongodb://localhost:8080/login-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/admin', adminRoutes);

mongoConnect(() => {

    app.post('/api/change-password', async (req, res) => {
        const { token, newPassword } = req.body;
        try {
            const user = jwt.verify(token, JWT_SECRET);

            const _id = user.id;

            const hashedPassword = await bcrypt.hash();
            await User.updateOne(
                { _id },
                {
                    $set: { password }
                }
            )
            res.json({ status: 'ok' });
        } catch (error) {
            res.json({ status: 'error', error: ';))' });
        }
        res.json({ status: 'ok' });
    })

    app.post('/api/login', async (req, res) => {
        const { username, password } = req.body; //get username and password from request
        const user = await User.findOne({ username }).lean(); // getting username from db

        //if there isnt a user return error
        if (!user) {
            return res.json({ status: 'error', error: 'Invalid username or password' });
        }

        if (await bcrypt.compare(password, user.password)) {
            //if the username and password combination is correct I create token and return it
            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, JWT_SECRET
            );
            
            return res.json({ status: 'ok', data: token });
        }

    })

    app.post('/api/register', async (req, res) => {
        const { username, password: plainTextPassword } = req.body;

        if (!username || typeof username !== 'string') {
            return res.json({ status: 'error', error: 'Invalid username' });
        }

        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            return res.json({ status: 'error', error: 'Invalid password' });
        }

        if (plainTextPassword.length < 5) {
            return res.json({
                status: 'error',
                error: 'Password too small. Should be at least 6 characters'
            });
        }

        const password = await bcrypt.hash(plainTextPassword, 10);

        try {
            const response = await User.create({
                username,
                password
            });
            console.log('User created successfully', response);
            res.json(response);
        } catch (error) {
            console.log(error);
            if (error.code = 11000) {
                //duplicate key
                return res.json({ status: 'error', error: 'Username already in use' });
            }
            throw error
        }

    })
    app.listen(4000);
});