const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Global Variables


// Routes
app.use('/api/employees', require('./routes/employees.routes'));
app.use('/api/users', require('./routes/users.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
