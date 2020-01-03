const router = require('express').Router();
const controller = require('../controllers/ingredients.controller');

router.route('/').get(controller.fetchIngredients).post(controller.addIngredient);

module.exports = router;