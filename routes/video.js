const express = require('express');
const router = express.Router();
const formi = require('formidable');
const path = require('path')
const { getFrame, convertToWebM } = require('../data/controllers/convert')
const changeFormat = require('../config/format')
const Video = require('../data/models/video')


router.get('/account/add', (req, res) => {
  
  res.render('addVideo.html', { user: req.session.user });
});

router.post('/account/add', async (req, res) => {
  let globalPath = path.join(__dirname, '../public/videos/')
  let globalPathImage = path.join(__dirname, '../public/images/')
  
  const form = formi.formidable({ uploadDir: globalPath, keepExtensions: true, multiples: false, maxFileSize: Infinity });

  try {
    const [fields, files] = await form.parse(req)
    if (files.video[0].mimetype != 'video/mp4') {
      res.status(501).send('el archivo no es .mp4')
      return
    }

    const nameVideo = files.video[0].newFilename;

    globalPath = files.video[0].filepath
    globalPathImage = path.join(globalPathImage, nameVideo)

    
    getFrame(globalPath, changeFormat(nameVideo,''))
    
    const event = req.app.get('event')
    let globalNewPath = changeFormat(globalPath,'.webm')

    globalPathImage = changeFormat(globalPathImage,'.webp')


    let localPathImage = path.join('images',changeFormat(nameVideo,'.webp'))
    let localNewPath = path.join('videos',changeFormat(nameVideo,'.webm'))
    event.emit('convercion',{
      name:nameVideo,
      user:req.cookies.idUser,
      globalNewPath:globalNewPath,
      localPathImage:localPathImage,
      localNewPath:localNewPath,
      path:globalPath,
      globalPathImage:globalPathImage,
      title: fields.name[0],
      description: fields.description[0]
    })
  }catch(error)
  {
    console.error(error)
    res.status(501).send({message:'error de implementacion',error:error})
  }
})
module.exports = router;