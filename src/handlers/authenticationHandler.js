const AuthenticationService = require("../service/authenticationService");

function signup(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  AuthenticationService.signup(name, email, password ,function (err) {
    if (typeof err !== 'undefined' && err != null) {
      res.status(400).send(err);
    }
    else {
      res.status(200).send('signup successfull!');
    }
  });
}

function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  AuthenticationService.login(email, password, function (err, token) {
    if (typeof err != 'undefined') {
      res.status(401).send(err);
    }
    else {
      res.status(200).send(token);
    }
  });
}

function logout(req, res) {
  const email = req.email;

  AuthenticationService.logout(email, function (err) {
    if (typeof err !== 'undefined' && err != null) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send('Logout successfull!');
    }
  });
}

function forgetPassword(req,res){
  const email = req.body.email;
  AuthenticationService.forgetPassword(email,function(err){
    if (typeof err !== 'undefined' && err != null) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send('email sent successfully');
    }
  });
}

function resetPassword(req,res){
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  AuthenticationService.resetPassword(newPassword,sentToken,function(err){
    if (typeof err !== 'undefined' && err != null) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send('password changed successfully!');
    }
  });
}

module.exports = {
  signup,
  login,
  logout,
  forgetPassword,
  resetPassword
};