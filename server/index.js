const express = require('express');
const mongoose = require('mongoose');
const config = require('config')
const authRouter = require('./routes/auth.router')
const fileRouter = require('./routes/file_routes')
const fileUpload = require('express-fileupload')
const corsMiddleware = require('./middleware/cors.middleware')


const PORT = config.get("serverPort")

const app = express();


app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.static("static"))

app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"))
        app.listen(PORT, () => {
            console.log(`Server Is Running On Port ${PORT}`)
        })
    } catch(error) {
        console.log(error.message)
      }
}

start();

