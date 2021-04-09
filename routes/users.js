const UserController = require('../controllers/userController');
const adminMiddleware = require('../helpers/adminMiddleware');
const authMiddleware = require('../helpers/authMiddleware');

const router = require('express').Router();

router.get('/',authMiddleware, UserController.read);
router.get('/add',authMiddleware, adminMiddleware, UserController.addForm);
router.post('/add',authMiddleware, adminMiddleware, UserController.add);
router.get('/login', UserController.loginForm);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
// router.get('/:id/edit', MenuController.editForm);
// router.post('/:id/edit', MenuController.edit);
router.get('/:id/delete',authMiddleware, adminMiddleware, UserController.delete);
// router.get('/:id/ingredients', MenuController.menuDetailForm);
// router.post('/:id/ingredients', MenuController.addIngredient);
// router.get('/:menuId/ingredients/:id/delete', MenuController.deleteIngredient);

module.exports = router;