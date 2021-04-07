const router = require('express').Router();
const ingredientsRoutes = require('./ingredients');
const suppliersRoutes = require('./suppliers');
const menuRoutes = require('./menus');

router.get('/', (req, res) => {
    res.send('Hello World')
})
router.use('/ingredients', ingredientsRoutes);
router.use('/suppliers', suppliersRoutes);
router.use('/menus', menuRoutes);

module.exports = router;