/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/
const express = require('express');
require("dotenv/config");
const app = express();
const path = require('path');
const { logger } = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./src/config/corsOptions');

const port = process.env.PORT || 8000;
//const mongoose = require("mongoose");
//const morgan = require("morgan");

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./src/routes/root'));

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, './src/views', 'error404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(port, () => {
    console.log('************************************************'
        + `\n(${process.env.NODE_ENV}) Server is running on the port ${port}` +
        '\n************************************************');
});


/*

//Database connection
const mongodbURL = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_USER_PASS + '@unipr.g2qmr.mongodb.net/' + process.env.DATABASE + '?retryWrites=true&w=majority'

mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('We are using database: ' + process.env.DATABASE);
        console.log('Database connection is ready...');
    })
    .catch((err) => {
        console.log('Database connection is failled...\n', err);
    })

// Get all the routes
const userRoutes = require('./src/routes/UserRoute');
const contactRoutes = require('./src/routes/ContactRoute');
const educationalRoutes = require('./src/routes/EducationalRoute');
const personalRoutes = require('./src/routes/PersonalRoute');
const professionalRoutes = require('./src/routes/ProfessionalRoute');

const cors = require("cors");
require("dotenv/config");


app.use(cors());
app.options("*", cors());

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));

const api = process.env.API_URL;

app.use(`${api}/users`, userRoutes);
app.use(`${api}/contacts`, contactRoutes);
app.use(`${api}/educationals`, educationalRoutes);
app.use(`${api}/personals`, personalRoutes);
app.use(`${api}/professionals`, professionalRoutes);
*/