const authMiddleware = (req, res, next) => {
    if(req.session.userId){
        next()
    }else{
        let notif = `Login First`;
        res.redirect('/users/login');
    }
}

module.exports = authMiddleware;