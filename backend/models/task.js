'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    task: DataTypes.STRING,
    desc: DataTypes.STRING,
    isComplete: DataTypes.BOOLEAN,
    categoryId: DataTypes.INTEGER,
    dateStart: DataTypes.STRING,
    dateDone: DataTypes.STRING,
    priority: DataTypes.STRING
  }, {
    classMethods: {
      // associate: function(models) {
      //   Task.belongsTo(models.todolist, {
      //     foreignKey: 'tasks',
      //     onDelete: 'CASCADE'
      //   })
      // }
    }
  });
  return Task;
};
