const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();

const dt = require('../data/database');
const video = require('../data/controllers/crud');

//midleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(session({
    secret:'NywCat~',
    resave: true,
    saveUninitialized:true
}));
app.use(require('express-ejs-layouts'));


app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'../views'));
app.set('view engine','ejs');
app.set('layout','index.html')
app.engine('html',require('ejs').renderFile);

app.use(require('../routes/index'));
app.use(require('../routes/login'));
app.use(require('../routes/user'));
app.use(require('../routes/video'));

app.use(express.static(path.join(__dirname,'../public')));

app.listen(app.get('port'),()=>
{
    console.log('Server on port',app.get('port'));
});