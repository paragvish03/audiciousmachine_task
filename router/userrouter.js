const router = require('express').Router()
const {signin_function, signup_function} = require('../controller/userCtr')


router.post('/signup', signup_function)
router.post('/signin', signin_function)





module.exports = {
    userrouter: router
}