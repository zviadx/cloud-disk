const fs = require('fs')
const config = require('config')


class IsOrNotFolder {
    folderExists(Folder){
        const path =  `${config.get("filePath")}\\${Folder.user}\\${Folder.path}`
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path)
                    return resolve({message: "operation finished successfully"})
                } else {
                    return reject({message: "required Folder already exists"})
                }
            } catch (e) {
                return reject ("Try Again")
            }
        })
    }
}

module.exports = new IsOrNotFolder()