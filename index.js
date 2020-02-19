const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const routeBase = require('./src/routes/index');
const admin = require('firebase-admin');
const serviceAccount = require('./bebus-85d60-firebase-adminsdk-s1go7-9f72d5b17c.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://bebus-85d60.firebaseio.com'
});
// const cors = require('cors')
// const helper = require('./src/helper/')

// var corsOptions = {
// 	origin: 'http://localhost:3000'
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/assets',express.static('./assets'));

// app.use('/', cors(corsOptions), routeBase)
app.use('/', routeBase);

server = app.listen(process.env.PORT, process.env.HOST, () => {
	console.log('Listening on 127.0.0.1:3001');
});

