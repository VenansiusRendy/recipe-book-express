const {Menu, Ingredient, Menu_Ingredient} = require('../models');

class MenuController {
    static read(req, res){
        Menu.findAll()
        .then(menus => res.render('menus/menus.ejs', {menus}))
        .catch(err => res.send(err))
    }
    static addForm(req, res){
        res.render('menus/addMenu.ejs')
    }
    static add(req, res){
        const {name, category, uom, instructions} = req.body;
        Menu.create({
            name,
            category,
            uom,
            instructions
        })
        .then(result => res.redirect('/menus'))
        .catch(err => res.send(err))
    }
    static editForm(req, res){
        const {id} = req.params;
        Menu.findOne({
            where: {
                id: +id
            }
        })
        .then(menu => res.render('menus/editMenu.ejs', {menu}))
        .catch(err => res.send(err));
    }
    static edit(req, res){
        const {id} = req.params;
        const {name, category, uom, instructions} = req.body;
        Menu.update(
            {
                name,
                category,
                uom,
                instructions
            },
            {
                where: {
                    id: +id
                }
            }
            
        )
        .then(result => res.redirect('/menus'))
        .catch(err => res.send(err));
    }
    static delete(req, res){
        const {id} = req.params;
        Menu.destroy(
            {
                where: {
                    id: +id
                }
            }
            
        )
        .then(result => res.redirect('/menus'))
        .catch(err => res.send(err));
    }
    static menuDetailForm(req, res){
        const {id} = req.params;
        let menu;
        let ingredients;
        Menu.findOne({
            where: {
                id: +id
            }
        })
        .then(result => {
            menu = result;
            return Ingredient.findAll()
        })
        .then(result => {
            ingredients = result;
            return Menu_Ingredient.findAll({
                include: [Menu, Ingredient]
            })
        })
        .then(result => {
            res.render('menus/menuDetail.ejs', {menu, ingredients, menu_ingredients: result})
        })
        .catch(err => res.send(err));
    }
    static addIngredient(req, res){
        const {id} = req.params;
        const {qty, ingredient_id} = req.body;
        Menu_Ingredient.create({
            menu_id: +id,
            qty: +qty,
            ingredient_id: +ingredient_id
        })
        .then(result => res.redirect(`/menus/${+id}/ingredients`))
        .catch(err => res.send(err))
    }
    static deleteIngredient(req, res){
        const {id, menuId} = req.params;
        Menu_Ingredient.destroy({
            where: {
                id: +id
            }
        })
        .then(result => res.redirect(`/menus/${+menuId}/ingredients`))
        .catch(err => res.send(err))
    }
}

module.exports = MenuController