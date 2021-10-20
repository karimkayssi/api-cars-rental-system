const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const {mongoConnect} = require('./util/database');

const app = express();

const adminRoutes = require('./controllers/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);


app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

mongoConnect(() => {
    app.listen(4000);
}); 