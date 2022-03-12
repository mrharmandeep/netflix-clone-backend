const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const UserAccessor = require('../accessor/userAccessor');
const SessionAccessor = require('../accessor/sessionAccessor');
const res = require("express/lib/response");
const SECRETKEY = "asdfghjkl";
require("dotenv").config();
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const req = require("express/lib/request");

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.APIKEY
  }
}))

function signup(name, email, password, cb) {
  UserAccessor.findUserByEmail(email, function (err, user) {
    if (user) {
      cb('user already exists!');
    }
    else {
      UserAccessor.createNewUser(name, email, password, function (err, success) {
        if (err) {
          console.log("error in signup:", err);
          cb(err);
        }
        else {
          cb('signup successful!');
        }
      })
    }
  });
}

function login(email, password, cb) {
  UserAccessor.findUserByEmail(email, function (err, user) {
    if (typeof err !== 'undefined' && err !== null) {
      console.log(`Some error occured ${err}`);
      cb(err);
    }
    else {
      if (user.password === password) {
        let data = {
          email: email,
        };
        const token = jwt.sign(data, SECRETKEY);
        SessionAccessor.createNewSession(email, token, function (err) {
          if (typeof err != 'undefined' && err !== null) {
            if (err.code === 11000) {
              cb('You are already logged in, cannot login again!');
            }
            else {
              cb(err);
            }
          }
          else {
            cb(undefined, token);
          }
        });
      }
      else {
        cb('Password does not match!');
      }
    }
  })
}

function logout(email, cb) {
  SessionAccessor.deleteSession(email, function (err, response) {
    if (typeof error != 'undefined' && err !== null) {
      cb(err);
    }
    else {
      cb();
    }
  });
}

function forgetPassword(email, cb) {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString("hex")
    UserAccessor.findUserByEmail(email, function (err, user) {
      if (!user) {
        cb('user doesnot exists!');
      }
      user.resetToken = token
      user.expireToken = Date.now() + 3600000
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "mr.harmandeeps@gmail.com",
          subject: "password reset",
          html: `
                <p>You requested for password reset</p>
                <h5>click in this <a href="http://localhost:3000/forget-password/${token}">link</a> to reset password</h5>
                `
        })
        cb('check your email');
      });

    });
  });
}

function resetPassword(newPassword, sentToken, cb) {
  UserAccessor.resetPassword(sentToken, function (err, user) {
    if (!err && user) {
      user.password = bcrypt.hashSync(newPassword, 10);
      user.resetToken = undefined;
      user.expireToken = undefined;
      user.save(function (err) {
        if (err) {
          cb(err);
        }
        else { cb('password reset successfully!') }
      })
    }
    else { cb('Password reset token is invalid or has expired.') }

  })
}
module.exports = {
  signup,
  login,
  logout,
  forgetPassword,
  resetPassword
};