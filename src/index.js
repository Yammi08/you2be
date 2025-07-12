require('dotenv').config();
const express = require('express');
const Uploads = require('../data/uploads')
const session = require('express-session');
const path = require('path');
const { createServer } = require('node:http');
const cookieParse = require('cookie-parser')
const Event = require('events')
const { Server } = require('socket.io')
const app = express();
const server = createServer(app)
const io = new Server(server)


const { convertToWebM, getFramesLength } = require('../data/controllers/convert')
const configIO = require('../config/configIO')

app.use(express.static(path.join(__dirname, '../public')));


const event = new Event()

app.use(session({
    secret: 'NywCat~',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParse())
const personas = {}
const intervalo = {}
event.on('convercion', ({name,user,globalNewPath,path,globalPathImage,localNewPath,localPathImage,title,description}) => {

    const frames = getFramesLength(path)
    const resq = convertToWebM(path)
    const userUpload = Uploads.getbyID(user)

    userUpload.ffmpeg = resq
    userUpload.currentVideo = name
    userUpload.path = path
    userUpload.globalNewPath = globalNewPath
    userUpload.globalPathImage = globalPathImage
    userUpload.lengthVideo = frames
    userUpload.localNewPath = localNewPath
    userUpload.localPathImage = localPathImage
    userUpload.title = title
    userUpload.description = description

    io.of('/account/add').to(userUpload.socketId).emit('startUpload')

})

configIO(io)
    
//midleware


app.use(require('express-ejs-layouts'));
app.set('port', Number.parseInt(process.env.PORT) || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.set('layout', 'index.html')
app.engine('html', require('ejs').renderFile);

app.set('event', event)



app.use(require('../routes/index'));
app.use(require('../routes/login'));
app.use(require('../routes/user'));
app.use(require('../routes/video'));



server.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});