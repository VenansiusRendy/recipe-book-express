const thousands = require("../helpers/thousands");
const { Ingredient, Supplier } = require("../models");

class IngredientController {
    static read(req, res){
        const {notif} = req.query
        Ingredient.findAll({
            include: Supplier
        })
        .then(ingredients => res.render('ingredients/ingredients.ejs', {ingredients, notif, thousands}))
        .catch(err => res.send(err));
    }
    static addForm(req, res){
        const {notif} = req.query;
        Supplier.findAll()
        .then(suppliers => res.render('ingredients/addIngredient.ejs', {suppliers, notif}))
        .catch(err => res.send(err));
    }
    static add(req, res){
        const {name, price, uom, supplier_id} = req.body;
        Ingredient.create({
            name,
            price: +price,
            uom,
            supplier_id
        })
        .then(result => res.redirect('/ingredients'))
        .catch(err => res.redirect(`?notif=${err.message}`))
    }
    static editForm(req, res){
        const { id } = req.params; 
        const {notif} = req.query;
        let suppliers;
        Supplier.findAll()
        .then(result => {
            suppliers = result;
            return Ingredient.findOne({
                where: {
                    id: id
                }
            })
        })
        .then(ingredient => {
            res.render('ingredients/editIngredient.ejs', {suppliers, ingredient, notif})
        })
        .catch(err => res.send(err));
    }
    static edit(req, res){
        const { id } = req.params;
        const {name, price, uom, supplier_id} = req.body; 
        Ingredient.update(
            {
                name,
                price: +price,
                uom,
                supplier_id: +supplier_id
            },
            {
                where: {
                    id: id
                }
            }
        )
        .then(result => res.redirect('/ingredients/?notif=Ingredient successfully edited'))
        .catch(err => res.redirect(`?notif=${err.message}`))
    }
    static delete(req, res){
        const { id } = req.params;
        Ingredient.destroy(
            {
                where: {
                    id: id
                }
            }
        )
        .then(result => res.redirect('/ingredients/?notif=Ingredient successfully deleted'))
        .catch(err => res.send(err))
    }
}

module.exports = IngredientController;
