const SupplierController = require('../controllers/supplierController');


const router = require('express').Router();

router.get('/', SupplierController.read);
router.get('/add', SupplierController.addForm);
router.post('/add', SupplierController.add);
router.get('/:id/edit', SupplierController.editForm);
router.post('/:id/edit', SupplierController.edit);
router.get('/:id/delete', SupplierController.delete);

module.exports = router;