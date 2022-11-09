/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/
require("dotenv/config");
const mongoose = require('mongoose');
const { logEvents } = require('../middleware/logger');

const mongodbURL = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_USER_PASS + '@unipr.g2qmr.mongodb.net/' + process.env.DATABASE + '?retryWrites=true&w=majority';

mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('The connection to ' + process.env.DATABASE + ' is ready...');
    })
    .catch((err) => {
        console.log('Connection database is failled...\n');
        logEvents(`${err}\t${err.codeName} ${err.code}\t`, 'mongoErrLog.log')
    })
