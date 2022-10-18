const express = require('express');
const database = require('../data/controllers/crud');
const router = express.Router();

router.get('/',(req,res)=>
{
    res.render('pages/init.html',{user :req.session.user});

});
router.get('/search-video',async (req,res)=>
{
    const t = req.query.s;
    if(t == '')
    {
        res.redirect('/');
        return;
    }
    const q = {name: {$regex: t}};
    
    const v = database.findAll(q);
    let elements = [];
    for await( const s of v)
    {
        elements.push(s);
    }
    res.render('videos.html',{elements,
        user :req.session.user,
    layout:false});
});
module.exports = router;