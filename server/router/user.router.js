const express = require('express')
const router = express.Router()

const {signup,loginUser} = require('../controller/user.controller')


router.post('/register',signup)
router.post('/login',loginUser)


module.exports = router