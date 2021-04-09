const router = require('express').Router();
const ingredientsRoutes = require('./ingredients');
const suppliersRoutes = require('./suppliers');
const menuRoutes = require('./menus');
const userRoutes = require('./users');
const authMiddleware = require('../helpers/authMiddleware');

router.get('/', (req, res) => {
    res.redirect('/users/login')
})
router.use('/ingredients', authMiddleware, ingredientsRoutes);
router.use('/suppliers',authMiddleware, suppliersRoutes);
router.use('/menus', authMiddleware, menuRoutes);
router.use('/users', userRoutes);

module.exports = router;