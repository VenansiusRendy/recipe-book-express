const { Supplier } = require("../models");
class SupplierController {
    static read(req, res){
        Supplier.findAll()
        .then(suppliers => res.render('suppliers/suppliers.ejs', {suppliers}))
        .catch(err => res.send(err));
    }
    static addForm(req, res){
        res.render('suppliers/addSupplier.ejs')
    }
    static add(req, res){
        const { name, address, phone_number } = req.body;
        Supplier.create({
            name,
            address,
            phone_number
        })
        .then(result => res.redirect('/suppliers'))
        .catch(err => res.send(err));
        
    }
    static editForm(req, res){
        const {id} = req.params;
        Supplier.findOne({
            where:{
                id: +id
            }
        })
        .then(supplier => res.render('suppliers/editSupplier.ejs', {supplier}))
        .catch(err => res.send(err));
    }
    static edit(req, res){
        const {id} = req.params;
        const { name, address, phone_number } = req.body;
        Supplier.update(
            {
                name,
                address,
                phone_number
            },
            {
            where:{
                id: +id
            }
        })
        .then(result => res.redirect('/suppliers'))
        .catch(err => res.send(err));
    }
    static delete(req, res){
        const {id} = req.params;
        Supplier.destroy({
            where:{
                id: +id
            }
        })
        .then(result => res.redirect('/suppliers'))
        .catch(err => res.send(err));
    }
}
module.exports = SupplierController;