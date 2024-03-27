const express = require('express')
const Router = express.Router()
const { getUserwaitAccept, fetchInvitationFromClient, getUserNoAccept, loginController, registerController, fetchUser, resetPassword, addFriend, acceptFriend, removeAddFriend, getUserAccept, fetchUserById } = require('../Controllers/userController')
const { protect } = require('../middleware/auth')


Router.post('/login', loginController)
Router.post('/reset', resetPassword)
Router.post('/register', registerController)
Router.get('/fetchUsers', protect, fetchUser)

Router.route('/addfriend').post(protect, addFriend)
Router.route('/acceptFriend').post(protect, acceptFriend)
Router.route('/removeAddFriend').post(protect, removeAddFriend)
Router.route('/getUserNotFriend').get(protect, getUserNoAccept)


Router.get('/fetchInvitationFromClient', fetchInvitationFromClient)
Router.post('/fetchUserById', fetchUserById)
Router.route('/getUserAccept').post(protect, getUserAccept)
Router.route('/getUserwaitAccept').post(protect, getUserwaitAccept)


module.exports = Router