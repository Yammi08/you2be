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
        const result =
        {
            'user': this.user,
            'password': this.password,
            'email': this.email,
            'date': this.date
        }
        return result;
    }
    save()
    {
        crud.add(this.toJson());
    }
}
module.exports = User;