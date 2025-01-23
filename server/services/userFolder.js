const fs = require('fs');
const config = require("config");


class userFolder {

    createUserFolder(Folder) {
        const Path = `${config.get("filePath")}\\${Folder.user}\\${Folder.path}`
        return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(Path)) {
                 fs.mkdirSync(Path)
                return resolve({message: "Your attemption was finished successfully"})
            }
            else {
                return reject({message: "sorry, but we have good news that We are pleasure to see you again"})
            }
        } catch (err) {
            return reject({message: err.message})
        }
    }



)
} }

module.exports = new userFolder()