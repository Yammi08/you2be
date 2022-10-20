const express = require('express');
const router = express.Router();
const database = require('../data/controllers/crud');
router.get('/account',async(req,res)=>
{
    
    if(!req.session.user)
    {
        res.redirect('/');
        return;
    }
    
   const videos = database.findAll({user:req.session.user});
   let vid=[];
   for await(let v of videos)
   {
        vid.push(v);
   }
    res.render('pages/user/account/info.html',{user: req.session.user,videos:vid});
});
router.get('/sing-out',(req,res)=>
{
    req.session.user = undefined;
    res.redirect('/');
})
module.exports = router;