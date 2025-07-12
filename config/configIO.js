const Uploads = require('../data/uploads')
const userUpload = require('../data/models/UserUpload')
const configIO = (io) => {

    io.of('/account/add').on('connection', (socket) => {

        Uploads.add(new userUpload(socket.handshake.query.idUser, socket.id))
        io.of('/account/add').to(socket.id).emit('post data')


        socket.on('upload', () => {
            const user = Uploads.getbySocketID(socket.id)
            io.of('/account/add').to(socket.id).emit('percent', user.percent)
        })
        socket.on('accept', () => {
            const user = Uploads.getbySocketID(socket.id);

            if (user === undefined)
                return;
            user.save()

        })
        socket.on('cancel', () => {
            Uploads.remove(socket.id)
        })

        socket.on('disconnect', () => {
            const user = Uploads.getbySocketID(socket.id)
            if(user === undefined)
                return
            user.save()
        })
    })
}
module.exports = configIO