const crud = require('../controllers/crud')
class Video
{
    constructor(name,description,video,pathImage,user)
    {
        this.name = name;
        this.description = description;
        this.video = video;
        this.pathImage = pathImage
        this.user = user;
        this.likes = 0;
        this.dislikes = 0;
        this.date = Date.now();
    }
    toJson()
    {
        return JSON.parse(JSON.stringify(this))
    }
    save()
    {
        crud.addVideo(this.toJson());
    }
}
module.exports = Video;