const Customer = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: DataTypes.NUMBER,
    user_name: DataTypes.STRING 
  })
  return Customer
} 

module.exports = Customer