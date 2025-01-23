const {Schema, model, ObjectId } = require("mongoose")


const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 10},
    avatar: {type: String},
    path: {type: String, default: ""},
    files: [{type: Object, ref: "File"}]
})

module.exports = model('User', User)
