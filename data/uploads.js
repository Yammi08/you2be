class Uploads {
    static #uploads = []
    static add(element) {
        Uploads.#uploads.push(element)
    }
    static getbySocketID(socketId) {
        return Uploads.#uploads.find((e) => e.socketId == socketId)
    }
    static getbyID(_id) {
        return Uploads.#uploads.find((e) =>e._id == _id)
    }
    static remove(socketId) {
        let item = Uploads.#uploads.find((e) => e.socketId == socketId)
        if (item === undefined)
            return
        item.kill()
        let index = Uploads.#uploads.indexOf(item)
        Uploads.#uploads.splice(index, 1)
    }
    static getlist()
    {
        return this.#uploads
    }
}

module.exports = Uploads