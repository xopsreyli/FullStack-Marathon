require('dotenv').config()

const express = require('express')
const router = express.Router()
const authenticateToken = require('../../utils/authenticateToken')
const service = require("../../services/userService");
const multer = require('multer');
const upload = multer({dest: 'public/images/avatars/'});
const manager = require('../../models/userModel');

router.get('/', authenticateToken, async (req, res) => {
    const user = await service.getUser(req.user.login)
    res.status(200).json({
        status: 200,
        user: {
            login: user.login,
            avatar: user.avatar,
        }
    })
})

router.post('/change-avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
    const avatar = req.file.filename
    manager.saveAvatar(req.user.login, avatar)

    res.status(200).json({
        status: 200,
        avatar: avatar
    });
});

module.exports = router
