const AssetCustomer = (sequelize, DataTypes) => {
  const AssetCustomer = sequelize.define('Assets_Customers', {
    quantity: DataTypes.INTEGER
  }, {timestamps: false})

  AssetCustomer.associate = (models) => {
    AssetCustomer.belongsToMany(models.Customer,
      {
        foreignKey: 'asset_id',
        as: 'customer',
        through: AssetCustomer,
        otherKey: 'customer_id'
      })
    AssetCustomer.belongsToMany(models.Asset,
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