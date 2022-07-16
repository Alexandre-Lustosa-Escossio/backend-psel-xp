const AssetCustomer = (sequelize, DataTypes) => {
  const AssetCustomer = sequelize.define('Assets_Customers', {
    quantity: {type: DataTypes.INTEGER}
  }, {timestamps: false})

  AssetCustomer.associate = (models) => {
    models.Assets.belongsToMany(models.Customer,
      {
        foreignKey: 'asset_id',
        as: 'customer',
        through: AssetCustomer,
        otherKey: 'customer_id'
      })
    models.Customer.belongsToMany(models.Assets,
      {
        foreignKey: 'customer_id',
        as: 'asset',
        through: AssetCustomer,
        otherKey: 'asset_id'
      })
  }

  return AssetCustomer
}

module.exports =  AssetCustomer