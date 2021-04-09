const adminMiddleware = (req, res, next) => {
    if(req.session.role === 'admin'){
        next()
    }else{
        let notif = `Only Admin Can Add/Delete Users`;
        res.redirect(`/users/?notif=${notif}`);
    }
}

module.exports = adminMiddleware;