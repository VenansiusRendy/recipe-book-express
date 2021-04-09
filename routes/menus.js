const MenuController = require('../controllers/menuController');
const authorizationMiddleware = require('../helpers/authorizationMiddleware');

const router = require('express').Router();

router.get('/', MenuController.read);
router.get('/add',authorizationMiddleware, MenuController.addForm);
router.post('/add', MenuController.add);
router.get('/:id/edit', MenuController.editForm);
router.post('/:id/edit', MenuController.edit);
router.get('/:id/delete', MenuController.delete);
router.get('/:id/ingredients', MenuController.menuDetailForm);
router.post('/:id/ingredients', MenuController.addIngredient);
router.get('/:id/ingredients/download', MenuController.menuDetailDownload);
router.get('/:menuId/ingredients/:id/delete', MenuController.deleteIngredient);

module.exports = router;