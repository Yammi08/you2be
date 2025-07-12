const crud = require('../controllers/crud')

class User
{
    constructor(user,password,email)
    {
        
        this.user = user;
        this.password = password;
        this.email = email;
        this.date = Date.now;
    }
    
    toJson()
    {
        return JSON.parse(JSON.stringify(this));
    }
    async save()
    {
        await crud.add(this.toJson());
    }
}
module.exports = User;