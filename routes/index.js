const express = require('express')
const router = express.Router()

const {
    getUsers,
    createUser,
    sendSMS,
    sendEmail,
} = require('./../controllers/userController')


router.get('/users', getUsers) //Get user data.
router.post('/users', createUser) //Create user data.
router.get('/sendsms', sendSMS) //Send sms to users.
router.get('/sendemails', sendEmail) //Send email to users.

module.exports = router;