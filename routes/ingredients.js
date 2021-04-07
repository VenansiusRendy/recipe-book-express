const IngredientController = require('../controllers/ingredientController');

const router = require('express').Router();

router.get('/', IngredientController.read);
router.get('/add', IngredientController.addForm);
router.post('/add', IngredientController.add);
router.get('/:id/edit', IngredientController.editForm);
router.post('/:id/edit', IngredientController.edit);
router.get('/:id/delete', IngredientController.delete);

module.exports = router;