const Users = require('../db/models/user').Users;
const bcrypt = require('bcrypt');

function findUserByEmail(email,cb){
    Users.findOne({'email':email},cb);
}

function createNewUser(name,email,password,cb){
    const hash_password =bcrypt.hashSync(password,12);
    const newUser = new Users({'name':name,'email':email,'password':hash_password},cb);
    newUser.save(cb);    
}

function resetPassword(sentToken,cb){
    Users.findOne({resetToken:sentToken,expireToken:{$gt: Date.now()}},cb);
}



module.exports={
    findUserByEmail,
    createNewUser,
    resetPassword
    
};
