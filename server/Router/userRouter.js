const express = require('express')
const Router = express.Router()
const { fetchInvitationFromClient, getUserNoAccept, loginController, registerController, fetchUser, resetPassword, addFriend, acceptFriend, removeAddFriend } = require('../Controllers/userController')
const { protect } = require('../middleware/auth')


Router.post('/login', loginController)
Router.post('/reset', resetPassword)
Router.post('/register', registerController)
Router.get('/fetchUsers', protect, fetchUser)
<<<<<<< HEAD
Router.route('/addfriend').post(protect, addFriend)
Router.route('/acceptFriend').post(protect, acceptFriend)
Router.route('/removeAddFriend').post(protect, removeAddFriend)
Router.route('/getUserNotFriend').post(protect, getUserNoAccept)
=======
Router.post('/addfriend', addFriend)
Router.post('/acceptFriend', acceptFriend)
Router.post('/removeAddFriend', removeAddFriend)
Router.get('/getUserNotFriend', getUserNoAccept)
>>>>>>> main
Router.get('/fetchInvitationFromClient', fetchInvitationFromClient)


module.exports = Router