'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
   
    static associate(models) {
      Order.belongsTo(models.User)
      Order.belongsToMany(models.Product,{
        through:models.OrdersProduct
      })

    }
  }
  Order.init({
    date: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};