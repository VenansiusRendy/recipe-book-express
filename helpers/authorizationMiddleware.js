const authorizationMiddleware = (req, res, next) => {
    if(req.session.role === 'chef'){
        next()
    }else{
        let notif = `Only Chef Can Add Menu`;
        res.redirect(`/menus/?notif=${notif}`);
    }
}

module.exports = authorizationMiddleware;