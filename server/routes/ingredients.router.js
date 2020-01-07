const router = require('express').Router();
const controller = require('../controllers/ingredients.controller');

router.route('/').get(controller.fetchIngredients).post(controller.addIngredient);
router.route('/file').post(controller.fetchIngredient);

module.exports = router;