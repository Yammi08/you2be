
const crud = require('../controllers/crud')
class Video
{
    constructor(name,description,video,user)
    {
        
        this.name = name;
        this.description = description;
        this.video = video;
        this.user = user;
        this.date = Date.now;
    }
    toJson()
    {
        if(this.name = '') throw 'No name';
        if(this.description = '') throw 'No description';
        if(this.video = '') throw 'No video';
        if(this.user = '') throw 'No user';
        const result = 
        {
            'name':this.name,
            'description': this.description,
            'video': this.video,
            'user':this.user
        };
        return result;
    }
    save()
    {
        crud.add(this.toJson());
    }
}
module.exports = Video;