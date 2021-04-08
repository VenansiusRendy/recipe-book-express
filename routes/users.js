const UserController = require('../controllers/userController');

const router = require('express').Router();

// router.get('/', MenuController.read);
router.get('/add', UserController.addForm);
router.post('/add', UserController.add);
router.get('/login', UserController.loginForm);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
// router.get('/:id/edit', MenuController.editForm);
// router.post('/:id/edit', MenuController.edit);
// router.get('/:id/delete', MenuController.delete);
// router.get('/:id/ingredients', MenuController.menuDetailForm);
// router.post('/:id/ingredients', MenuController.addIngredient);
// router.get('/:menuId/ingredients/:id/delete', MenuController.deleteIngredient);

module.exports = router;