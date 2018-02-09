'use strict';

const crypto = require('crypto')
const uuid = require('uuid/v1')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
        isEmail: true
      }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,

    },
    zip:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    authToken: DataTypes.STRING,
    authTokenExpiration: DataTypes.DATE,
    salt: DataTypes.STRING
  }, {
      setterMethods:{
          password(value){
              const salt = uuid()
              this.setDataValue('salt' , salt)
              const hash = this.encrypt(value)
              this.setDataValue('encryptedPassword' , hash)
         }
     },
      instanceMethods:{
          encrypt(value){
              const salt = this.get('salt')
              return crypto.createHmac('sha512' , salt)
                .update(value)
                .digest('hex')
          },
          verifyPassword(unverifiedPassword){
              //encrypt unverifiedPassword
              const encryptedUnverifiedPassword = this.encrypt(unverifiedPassword)
              //compare encryptedUnverifiedPassword with password
              return encryptedUnverifiedPassword === this.get('encryptedPassword')
          },
          toJSON(){
            return {
              id: this.get('id'),
              firstName: this.get('firstName'),
              lastName: this.get('lastName'),
              email: this.get('email'),
              authToken: this.get('authToken'),
              authTokenExpiration: this.get('authTokenExpiration')
            }
        }
    },
    classMethods: {
      associate: function(models) {
        User.hasMany(models.TodoList,{
          foreignKey: 'userId',
          as: 'todolists'
        })
      }
  });
  return User;
};
