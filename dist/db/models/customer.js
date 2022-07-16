const Customer = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: DataTypes.NUMBER,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {timestamps: false})

  Customer.associate = (models) => {
    Customer.hasOne(models.Credential,
      { foreignKey: 'id', as: 'credentials' })
    Customer.hasOne(models.CheckingAccount,
    {foreignKey: 'id', as: 'checking_account'})
  }

  return Customer
} 

module.exports = Customer