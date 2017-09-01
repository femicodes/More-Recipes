import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';

import router from './routes/router';

// Set up the express app
const app = express();


// Log requests to the console;
app.use(logger('dev'));


// Parse income requests data 
app.use(bodyParser.json());

app.use(session({secret: 'superhuman', saveUninitialized: true, resave: true}));

app.use(bodyParser.urlencoded({ extended: false}));


// Set router for path 
app.use('/', router);


export default app;