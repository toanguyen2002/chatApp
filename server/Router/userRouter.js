const express = require('express')
const Router = express.Router()
const { fetchInvitationFromClient, loginController, registerController, fetchUser, resetPassword, addFriend, acceptFriend, removeAddFriend } = require('../Controllers/userController')
const { protect } = require('../middleware/auth')


Router.post('/login', loginController)
Router.post('/reset', resetPassword)
Router.post('/register', registerController)
Router.get('/fetchUsers', protect, fetchUser)
Router.post('/addfriend', addFriend)
Router.post('/acceptFriend', acceptFriend)
Router.post('/removeAddFriend', removeAddFriend)
Router.get('/fetchInvitationFromClient', fetchInvitationFromClient)


module.exports = Router