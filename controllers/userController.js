const { User } = require("../models");
const bcrypt = require("bcryptjs");
class UserController {
    static addForm(req, res) {
        res.render("users/addUser.ejs");
    }
    static add(req, res) {
        const { email, password, name, role } = req.body;
        User.create({
            email,
            password,
            name,
            role,
        })
            .then((result) => res.redirect("/users/login"))
            .catch((err) => res.send(err));
    }
    static loginForm(req, res) {
        res.render("users/loginUser.ejs");
    }
    static login(req, res) {
        const { email, password } = req.body;
        User.findOne({ where: { email } })
            .then((result) => {
                if (result) {
                    let compare = bcrypt.compareSync(password, result.password);
                    if (compare) {
                        req.session.userId = result.id;
                        req.session.role = result.role;
                        res.redirect('/menus')
                    } else {
                        let err = new Error(
                            "Email atau password tidak ditemukan"
                        );
                        err.name = "invalidEmailPassword";
                        throw err;
                    }
                } else {
                    let err = new Error("Email atau password tidak ditemukan");
                    err.name = "invalidEmailPassword";
                    throw err;
                }
            })
            .catch((err) => {
                res.send(err);
            });
    }
    static logout(req, res){
        req.session.destroy(err => {
            res.redirect('/users/login')
        })
    }
}

module.exports = UserController;
