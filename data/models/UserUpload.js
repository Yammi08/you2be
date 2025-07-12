//const fs = require('fs/promises')
const fs = require('fs')
const path = require('path');
const Video = require('./video');
const Uploads = require('../uploads');
class userUpload {
    #ffmpeg;
    #percent = 0;
    #_id;
    //#socketId;
    #isSave = false;
    constructor(_id, socketId) {
        this.#_id = _id
        this.socketId = socketId;
        this.lengthVideo = 0;
        this.currentVideo = ''
        this.path = ''
        this.globalNewPath = ''
        this.globalPathImage = ''
        this.localNewPath = ''
        this.localPathImage = ''
        this.title = ''
        this.description = ''

    }
    get isave() {
        return this.#isSave
    }
    set ffmpeg(ffmpeg) {

        if (this.#ffmpeg !== undefined) {
            console.error('este usuario ya esta convirtiendo un video')
            return
        }
        this.#ffmpeg = ffmpeg;
        this.#UpdatepercentUpload()
    }
    get ffmpeg() {
        return this.#ffmpeg
    }
    get percent() { return this.#percent }
    get _id() { return this.#_id }

    kill() {
        this.ffmpeg?.kill('SIGKILL')
        this.#killffmpeg()
    }
    #killffmpeg() {
        this.ffmpeg?.on('exit', (code, signal) => {
            if (signal == 'SIGKILL') {
                if (fs.existsSync(this.path))
                    fs.promises.unlink(this.path);
                if (fs.existsSync(this.globalNewPath))
                    fs.promises.unlink(this.globalNewPath)
                if (fs.existsSync(this.globalPathImage))
                    fs.promises.unlink(this.globalPathImage)
            }
        });
    }
    #UpdatepercentUpload() {

        this.ffmpeg.stderr.on('data', (data) => {
            let dat;
            let frame;
            dat = data.toString().replaceAll(' ', '')
            frame = Number.parseInt(dat.split('=')[1])
            const result = 100 * frame / this.lengthVideo
            if (isNaN(result))
                return
            this.#percent = result
        });

    }
    save() {
        if(this.#isSave)
            return
        const video = new Video(this.title, this.description, this.localNewPath, this.localPathImage, this.#_id)
        video.save()
        this.#isSave = true
        try
        {
            ffmpeg.on('close', (code) => {
            Uploads.remove(this.socketId)
        })
        }catch(error)
        {
            Uploads.remove(this.socketId)
        }
    }


}

module.exports = userUpload