const express = require('express')
const Router = express.Router()
const { loginController, registerController, fetchUser } = require('../Controllers/userController')
const { protect } = require('../middleware/auth')


Router.post('/login', loginController)
Router.post('/register', registerController)
Router.get('/fetchUsers', protect, fetchUser)

module.exports = Router