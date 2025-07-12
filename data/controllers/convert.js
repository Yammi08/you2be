const { spawn, execSync } = require('child_process')
const staticFfmepg = require('ffmpeg-static')
const ffprobePath = require('ffprobe-static').path;
const fs = require('fs')
const path = require('path')
const changeFormat = require('../../config/format')
function convertToWebM(pathFile) {

    let lastPathFile = changeFormat(pathFile, '.webm')
    const ffmpeg = spawn(staticFfmepg, ['-i', pathFile,
        '-preset', 'ultrafast',
        '-c:v', 'libvpx-vp9',
        '-crf', 32, '-c:a','libopus','-b:a','64k',
        lastPathFile])

    ffmpeg.on('close', (code) => {
        if(fs.existsSync(pathFile))
            fs.promises.unlink(pathFile);
    });
    return ffmpeg
}
function getFramesLength(pathFile) {

    const out = execSync(`${ffprobePath} -v error -select_streams v:0 -show_entries stream=duration,r_frame_rate -of default=nokey=1:noprint_wrappers=1 ${pathFile}`)
    const data = out.toString().split('\r')
    const division = data[0].split('/')
    const duration = Number.parseInt(division[0]) / Number.parseInt(division[1])
    const framerate = Number.parseFloat(data[1])
    return duration * framerate
}
function getFrame(pathFileInput, name) {
    const lastPathFile = path.join(__dirname, '../../public/images/', name + '.webp')

    spawn(staticFfmepg, ['-ss', '00:00:00', '-i', pathFileInput, '-frames:v', '1', '-q:v', 23, lastPathFile])
}
module.exports =
{
    convertToWebM,
    getFramesLength,
    getFrame
}