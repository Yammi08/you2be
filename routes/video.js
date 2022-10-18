const express = require('express');
const router = express.Router();
router.get('/account/add',(req,res)=>
{
    res.render('pages/videos/addVideo.html',{user: req.session.user});
});
module.exports = router;