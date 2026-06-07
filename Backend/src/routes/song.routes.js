const express = require('express')
const upload = require('../middlewares/upload.middleware')
const songController = require('../controllers/songs.controller')

const router = express.Router()


router.post('/',upload.single('song'),songController.uploadSong)

module.exports = router