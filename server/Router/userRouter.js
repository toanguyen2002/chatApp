const express = require('express')
const { loginController, registerController, fetchUser } = require('../Controllers/userController')
const { protect } = require('../middleware/auth')
const Router = express.Router()

Router.post('/login', loginController)
Router.post('/register', registerController)
Router.get('/fetchUsers', protect, fetchUser)

module.exports = Router