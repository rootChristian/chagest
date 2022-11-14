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
const mongoose = require('mongoose');
require('./src/config/dbConn'); // DB connection
const env = process.env.NODE_ENV
const port = process.env.PORT || 5000;
const api = process.env.API_URL;

// Get all the routes
const authRoutes = require('./src/routes/authRoute');
const userRoutes = require('./src/routes/userRoute');

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./src/routes/root'));

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/users`, userRoutes);

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
        + `\n(${env}) Server is running on the port ${port}` +
        '\n************************************************');
});