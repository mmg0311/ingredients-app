require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const app = express();

// Local Imports
const IngredientsRouter = require('./routes/ingredients.router');

// Middlewares
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/api/ingredients', IngredientsRouter);

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${ process.env.PORT }`);
});