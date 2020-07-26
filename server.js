const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

const MONGODB_URI = 'your mongodb cluster uri ';

mongoose.connect(process.env.MONGODB_URI || MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
	console.log('db connected');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('tiny'));
app.use('/blog', routes);

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`listening on port ${PORT}`))
