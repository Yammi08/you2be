const router = require('express').Router();
const dt = require('../data/controllers/crud');
const User = require('../data/models/user');
const bc = require('../config/encrypt');
const bodyparser = require('body-parser');
const { ObjectId } = require('mongodb');

/*
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

*/
let codedurl = bodyparser.urlencoded({extended:false})
let codedjson = bodyparser.json()

router.get('/login',async (req,res)=>
{
    if(req.cookies.idUser != undefined)
    {
        const data = await dt.find({_id: ObjectId(req.cookies.idUser)})
        req.session.user = {
        id: data._id.toHexString(),
        user: data.user,
        date: data.date,
        email: data.email
    };
    }
    if(req.session.user != undefined)
    {
        res.redirect('/');
        return;
    }
    res.render('login.html',{user:undefined});
    
});
router.post('/login',codedjson,codedurl,async (req,res)=>
{

    
    if(req.body.password == '')
    {
        res.send('this is not password');
        return;
    }
    const data = await dt.find({email: req.body.email});
    if(!data || !await bc.compare(req.body.password,data.password))
    {
        res.send('not found or password/email incorrect. ._.');
        return;
    }
    const id = data._id.toHexString()
    req.session.user = {
        id:id,
        user: data.user,
        date: data.date,
        email: data.email
    };
    res.cookie('idUser',id,{
        maxAge: 24000 * 24000,
        sameSite: 'Strict',
        secure: false,
    })
    
    res.redirect('/login');
})
router.get('/signin',(req,res)=>
{
    if(req.session.user != undefined)
    {
        res.redirect('/');
        return;
    }
    res.render('signin.html',{user:undefined});
});
router.post('/signin',codedurl,codedjson,async (req,res)=>
{
    let errors = [];
    const name = await dt.find({name: req.body.user});
    const data = await dt.find({email: req.body.email});
    if(data != null || name != null)
    {
        errors.push('this data is in database ' + data + ' ' + name);
    }
    if(req.body.password != req.body.repeatPassword)
    {
        errors.push('do no match passwords');
    }
    if(errors.length <= 0)
    {
        const pass = await bc.encrypt(req.body.password);
        await new User(req.body.user,pass,req.body.email).save();
    }
    
    res.redirect('/login');
});
module.exports = router;