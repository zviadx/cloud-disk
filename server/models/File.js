const {model, Schema, ObjectId} = require("mongoose")


const File = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    access_link: {type: String},
    size: {type: Number, default: 0},
    path: {type: String, default: ""},
    date: {type: Date, default: new Date()},
    user: {type: ObjectId, ref: "User"},
    parent: {type: String, ref: "File"},
    childs: [{type: String, ref: "FIle"}]
})

module.exports = model("File", File)