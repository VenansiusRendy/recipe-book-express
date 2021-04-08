const authorizationMiddleware = (req, res, next) => {
    if(req.session.role === 'chef'){
        next()
    }else{
        let notif = `Login First`;
        res.redirect('/users/login');
    }
}

module.exports = authorizationMiddleware;