const express = require('express');
const router = express.Router();
const formidable = require('formidable');
router.get('/account/add',(req,res)=>
{
    
    res.render('pages/videos/addVideo.html',{user: req.session.user});
});
router.post('/account/add',(req,res,next)=>
{
    const form = formidable({ multiples: true });
    console.log('formulario: ', form,'\n\n\n\n');
    form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ fields, files });
      });
})
module.exports = router;