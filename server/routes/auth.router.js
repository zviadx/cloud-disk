const Router = require("express")
const User = require("../models/User")
const File = require("../models/File")
const crypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const config = require("config")
const userFolder = require("../services/userFolder")

const router = new Router()


router.post('/registration',
    [
        check('email', "Enter valid email").isEmail(),
        check('password', "password must been between 4-64 symbols ").isLength({min: 4, max: 64})
    ],
    async (req, res) => {
    try {
        const validationError = validationResult(req)
        if (!validationError.isEmpty()) {
            return res.status(400).json({errors: this.errors.array()})
        }
        const {email, password} = req.body
        const isUser = await User.findOne({email})
        if (isUser) {
            return res.status(400).json({message: "user named this already exists"})
        }
        const pass = await crypt.hash(password, 8)
        const user = new User({email, password: pass})
        await user.save()
        await userFolder.createUserFolder(new File({user: user.id}))

        return res.status(200).json({message: "User successfully registered "})

    } catch (err) {
        return res.status(500).json({message: err.message})
    }
} )


router.post('/login', async (req, res) => {
        try {
            const {email, password} = req.body
            const logged = await User.findOne({email})
            if (!logged) {
                return res.status(400).json({message: "User named like this is not in data base"})
            }
            const comparePass = crypt.compareSync(password, logged.password)
            if (!comparePass) {
                return res.status(400).json({message: "Password is incorrect"})
            }
            const token = jwt.sign({id: logged._id}, config.get("secretKey"), {expiresIn: "3h"})
            return (res.status(200).json({
                token,
                user: {
                    id: logged._id,
                    email: logged.email,
                    diskSpace: logged.diskSpace,
                    usedSpace: logged.usedSpace,
                    avatar: logged.avatar,
                }
            })
            )

        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    } )

module.exports = router