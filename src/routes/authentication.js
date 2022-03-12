const express = require('express');
const Router = express.Router();
const AuthenticationHandler = require('../handlers/authenticationHandler');
const AuthenticationMiddleware = require('../middlewares/authentication');

Router.post('/signup',AuthenticationHandler.signup);
Router.post('/login', AuthenticationHandler.login);
Router.post('/logout', AuthenticationMiddleware.checkIfAuthenticated, AuthenticationHandler.logout);
Router.post('/forget-password',AuthenticationHandler.forgetPassword);
Router.post('/reset-password',AuthenticationHandler.resetPassword);
//

module.exports = Router;