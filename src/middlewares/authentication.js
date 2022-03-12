const jwt = require("jsonwebtoken");
const SessionAccessor = require('../accessor/sessionAccessor');
const SECRETKEY = "asdfghjkl";

function checkIfAuthenticated(req, res, next) {
    const tokenString = req.headers['authorization'];
    if (typeof tokenString !== 'undefined' && tokenString !== null) {
      const actualToken = tokenString.split(' ')[1];
      if (typeof actualToken !== 'undefined' && actualToken != null) {
        let data = jwt.verify(actualToken, SECRETKEY);
        SessionAccessor.findSessionByJwt(actualToken, function(err, session) {
          if (typeof err !== 'undefined' && err != null) {
            res.status(500).send(err);
          }
          else {
            if (typeof session !== 'undefined' && session != null) {
              req.email = session.user_id;
              next();
            }
            else {
              res.status(401).send('Could not find session for you! Please login and then try again!');
            }
          }
        });      
      }
      else {
        res.status(401).send('Please login before accessing the API');
      }
    }
    else {
      res.status(401).send('Please login before accessing the API');
    }
  }
  
  module.exports = {
    checkIfAuthenticated
  };