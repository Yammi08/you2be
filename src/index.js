const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();

const dt = require('../data/database');
const video = require('../data/controllers/crud');

//midleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'../views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(require('../routes/index'));
app.use(require('../routes/login'));

app.use(express.static(path.join(__dirname,'../public')));

app.listen(app.get('port'),()=>
{
    console.log('Server on port',app.get('port'));
});