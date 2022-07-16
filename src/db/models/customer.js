const Customer = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.NUMBER
    },
    customer_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {timestamps: false})

  Customer.associate = (models) => {
    Customer.hasOne(models.Credentials,
      { foreignKey: 'customer_id', as: 'credentials' })
    Customer.hasOne(models.Checking_Accounts,
      { foreignKey: 'customer_id', as: 'checking_account' })
    Customer.hasMany(models.Assets_Customers,
      {foreignKey:'customer_id', as:'asset_customer'})
  }

  return Customer
} 

module.exports = Customer