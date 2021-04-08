const router = require('express').Router();
const ingredientsRoutes = require('./ingredients');
const suppliersRoutes = require('./suppliers');
const menuRoutes = require('./menus');
const userRoutes = require('./users');
const authMiddleware = require('../helpers/authMiddleware');

router.get('/', (req, res) => {
    res.send('Hello World')
})
router.use('/ingredients', ingredientsRoutes);
router.use('/suppliers', suppliersRoutes);
router.use('/menus', authMiddleware, menuRoutes);
router.use('/users', userRoutes);

module.exports = router;