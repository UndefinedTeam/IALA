'use strict';
module.exports = (sequelize, DataTypes) => {
  var TodoList = sequelize.define('TodoList', {
    title: DataTypes.STRING,
    categoryID: DataTypes.INTEGER,
    isComplete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        TodoList.belongsTo(models.User,{
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return TodoList;
};
