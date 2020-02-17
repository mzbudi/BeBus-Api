const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const routeBase = require('./src/routes/index');
//const redis = require('redis');
//const client = redis.createClient();

// client.on('connect', function() {
// 	console.log('Redis client connected');
// });
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

