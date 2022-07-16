const AssetClient = (sequelize, DataTypes) => {
  const AssetClient = sequelize.define('Assets_Clients', {
    quantity: DataTypes.INTEGER
  }, {timestamps: false})

  AssetClient.associate = (models) => {
    AssetClient.belongsToMany(models.Customer,
      {
        foreignKey: 'asset_id',
        as: 'customer',
        through: AssetClient,
        otherKey: 'customer_id'
      })
    AssetClient.belongsToMany(models.Asset,
      {
        foreignKey: 'customer_id',
        as: 'asset',
        through: AssetClient,
        otherKey: 'asset_id'
      })
  }

  return AssetClient
}

module.exports =  AssetClient