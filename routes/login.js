const router = require('express').Router();
const dt = require('../data/controllers/crud');
const User = require('../data/models/user');
const bc = require('../config/encrypt');
router.get('/login',(req,res)=>
{
    if(req.session.user != undefined)
    {
        res.redirect('/');
        return;
    }
    res.render('login.html',{user:undefined});
    
});
router.post('/login',async (req,res)=>
{

    const data = await dt.find({email: req.body.email});
    if(req.body.password == '')
    {
        res.send('this is not password');
        return;
    }
    if(!data || !await bc.compare(req.body.password,data.password))
    {
        res.send('not found or password/email incorrect. ._.');
        return;
    }
    req.session.user = {
        id:data._id,
        user: data.user,
        date: data.date,
        email: data.email
    };
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
router.post('/signin',async (req,res)=>
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
        new User(req.body.user,pass,req.body.email).save();
    }
    
    res.redirect('/login');
});
module.exports = router;