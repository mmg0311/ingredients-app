require('dotenv').config();
const express = require('express');

const app = express();

// Local Imports
const IngredientsRouter = require('./routes/ingredients.router');

// Routes
app.use('/api/ingredients', IngredientsRouter);

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${ process.env.PORT }`);
});