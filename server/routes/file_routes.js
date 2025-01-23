const Router = require('express')
const router = new Router()

const fileMiddleware = require('../middleware/auth.middleware')
const fileController = require('../services/fileController')

router.post('', fileMiddleware, fileController.createFF)
router.get('', fileMiddleware, fileController.getFiles)
router.post('/uploader', fileMiddleware, fileController.fileUploader)
router.get('/download', fileMiddleware, fileController.failDownload)
router.delete('/delete', fileMiddleware, fileController.failDelete)
router.get('/search', fileMiddleware, fileController.fileSearch)
router.post('/upAvatar', fileMiddleware, fileController.uploadAvatar)
router.delete('/deleteAvatar', fileMiddleware, fileController.deleteAvatar)
router.post('/createFolder', fileMiddleware, fileController.createFolder)

module.exports = router