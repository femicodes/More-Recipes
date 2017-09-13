// import the required modules
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// import routes 
import router from './routes/router';

// Set up the express app
const app = express();

process.env.SECRET_KEY = 'somesecretkey';

// Log requests to the console;
app.use(logger('dev'));


// Parse income requests data 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false}));

// Set router for path 
app.use('/api/v1/', router);

// catches error404 handler 
app.use((req, res) => {
	res.status(404).send({success: false, message: 'Not Found!'});
});

// export app
export default app;