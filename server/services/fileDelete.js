const fs = require("fs")
const config = require("config")


class fileServices {

    getPath(file) {
        return `${config.get("filePath")}\\${file.user}\\${file.path}`
    }

    fileDeleter(file) {
        const path = this.getPath(file)
        console.log("Path: ", path)
        if (file.type === "dir") {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

}

module.exports = new fileServices()