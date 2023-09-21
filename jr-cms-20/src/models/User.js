const { Schema, model } = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');


const schema = new Schema({
  // email
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

schema.methods.hashPassword = async function () {
  // this
  this.password = await bcrypt.hash(this.password, 10);
};


/**
 * //调用save函数之前要做什么
 * userSchema.pre('save', async function(next){
 *    const user = this;
 *    if(user.isModified('password')){
 *      user.password = await bcrypt.hash(user.password, 8)
 *    }
 *    next();
 * })
 * 
 * 
 * // 不显示password
 *  userSchema.methods.toJSON = function(){
 *    const user = this;
 *    const userObject = user.toObject();
 *    delete userObject.password;
 *    return userObject;
 * }
 * 
 * 
 * 
 * 
 */

schema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model('User', schema);
