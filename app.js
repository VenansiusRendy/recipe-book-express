const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');
const path = require('path')

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'hahaha',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(router);

app.listen(port, (err => {
    if(err){
        console.log(err);
    }else{
        console.log(`Applikasi jalan di port ${port}`);
    }
}))