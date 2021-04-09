const MenuController = require('../controllers/menuController');
const authorizationMiddleware = require('../helpers/authorizationMiddleware');

const router = require('express').Router();

router.get('/', MenuController.read);
router.get('/add',authorizationMiddleware, MenuController.addForm);
router.post('/add',authorizationMiddleware, MenuController.add);
router.get('/:id/edit',authorizationMiddleware, MenuController.editForm);
router.post('/:id/edit',authorizationMiddleware, MenuController.edit);
router.get('/:id/delete',authorizationMiddleware, MenuController.delete);
router.get('/:id/ingredients', MenuController.menuDetailForm);
router.post('/:id/ingredients',authorizationMiddleware, MenuController.addIngredient);
router.get('/:id/ingredients/download', MenuController.menuDetailDownload);
router.get('/:menuId/ingredients/:id/delete',authorizationMiddleware, MenuController.deleteIngredient);

module.exports = router;