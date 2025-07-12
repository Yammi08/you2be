const express = require('express');
const router = express.Router();
const database = require('../data/controllers/crud');
const form = require('formidable');
const { ObjectId } = require('mongodb');
router.get('/account',async(req,res)=>
{
    
    if(!req.session.user)
    {
        res.redirect('/');
        return;

    }
   const videos = await database.findAllVideos({ user:req.session.user.id});
   let vid=[];
   for await(let v of videos)
   {
        vid.push(v);
   }
    res.render('info.html',{user: req.session.user,videos:vid});
});
router.get('/sing-out',(req,res)=>
{
    res.clearCookie('idUser')
    req.session.user = undefined;
    res.redirect('/');
})
module.exports = router;