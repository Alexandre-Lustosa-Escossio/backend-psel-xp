const Customer = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: DataTypes.NUMBER,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {timestamps: false})

  Customer.associate = (models) => {
    Customer.hasOne(models.Credential,
      { foreignKey: 'customer_id', as: 'credentials' })
    Customer.hasOne(models.CheckingAccount,
      { foreignKey: 'customer_id', as: 'checking_account' })
    Customer.hasMany(models.AssetClient,
      {foreignKey:'customer_id', as:'asset_client'})
  }

  return Customer
} 

module.exports = Customer