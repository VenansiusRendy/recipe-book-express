const thousands = require('../helpers/thousands');
const {Menu, Ingredient, Menu_Ingredient} = require('../models');
const printToPdf = require('../helpers/jspdf');
class MenuController {
    static read(req, res){
        const {notif} = req.query;
        Menu.findAll()
        .then(menus => res.render('menus/menus.ejs', {menus, notif}))
        .catch(err => res.send(err))
    }
    static addForm(req, res){
        res.render('menus/addMenu.ejs', {notif:""})
    }
    static add(req, res){
        const {name, category, uom, instructions} = req.body;
        Menu.create({
            name,
            category,
            uom,
            instructions
        })
        .then(result => res.redirect('/menus/?notif=Menu Successfully Added'))
        .catch(err => res.send(err))
    }
    static editForm(req, res){
        const {id} = req.params;
        Menu.findOne({
            where: {
                id: +id
            }
        })
        .then(menu => res.render('menus/editMenu.ejs', {menu, notif:""}))
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
        const {notif} = req.query;
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
                where: {
                    menu_id: +id
                },
                include: [Menu, Ingredient]
            })
        })
        .then(menu_ingredients => {
            menu.cost = 0;
            menu_ingredients = menu_ingredients.map(menu_ingredient => {
                menu.cost += menu_ingredient.subtotal;
                return{
                    ...menu_ingredient,
                    qty: +menu_ingredient.qty,
                    id: +menu_ingredient.id,
                    subtotal: menu_ingredient.subtotal
                }
            })
            res.render('menus/menuDetail.ejs', {menu, ingredients, menu_ingredients, notif, thousands})
        })
        .catch(err => res.redirect(`?=${err}`));
    }
    static menuDetailDownload(req, res){
        const {id} = req.params;
        let menu;
        Menu.findOne({
            where: {
                id: +id
            }
        })
        .then(result => {
            menu = result;
            return Menu_Ingredient.findAll({
                include: [Ingredient],
                where: {
                    menu_id: +id
                }
            })
        })
        .then(menuIngredients => {
            res.contentType("application/pdf");
            res.send(printToPdf(menuIngredients, menu))
            // res.sendFile(`${fileName}`, (err) => {
            //     res.send(err)
            // })

        })
        .catch(err => res.send(err))
    }
    static addIngredient(req, res){
        const {id} = req.params;
        const {qty, ingredient_id} = req.body;
        Menu_Ingredient.findAll({
            where:{
                menu_id: +id
            }
        })
        .then(menuIngredients => {
            let present = menuIngredients.findIndex( menuIngredient => {
                return menuIngredient.ingredient_id === +ingredient_id
            });
            if(present !== -1){
                throw "Ingredients present in the menu";
            } else {
                return Menu_Ingredient.create({
                    menu_id: +id,
                    qty: +qty,
                    ingredient_id: +ingredient_id
                })
            }
        })
        .then(result => res.redirect(`/menus/${+id}/ingredients/?notif=Ingredient Berhasil Ditambahkan`))
        .catch(err => res.redirect(`?notif=${err}`))
    }
    static deleteIngredient(req, res){
        const {id, menuId} = req.params;
        Menu_Ingredient.destroy({
            where: {
                id: +id
            }
        })
        .then(result => res.redirect(`/menus/${+menuId}/ingredients/?notif=Ingredient Berhasil Didelete`))
        .catch(err => res.send(err))
    }
}

module.exports = MenuController