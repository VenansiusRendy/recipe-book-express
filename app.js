const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/ressources'));
app.use(router);

app.listen(port, (err => {
    if(err){
        console.log(err);
    }else{
        console.log(`Applikasi jalan di port ${port}`);
    }
}))