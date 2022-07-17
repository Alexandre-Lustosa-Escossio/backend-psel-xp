const AssetCustomer = (sequelize, DataTypes) => {
  const AssetCustomer = sequelize.define('Asset_Customers', {
    quantity: {type: DataTypes.INTEGER}
  }, {timestamps: false})

  AssetCustomer.associate = (models) => {
    models.Assets.belongsToMany(models.Customers,
      {
        foreignKey: 'asset_id',
        as: 'customer',
        through: AssetCustomer,
        otherKey: 'customer_id'
      })
    models.Customers.belongsToMany(models.Assets,
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