const Asset = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Assets', {
    id: DataTypes.INTEGER,
    asset_code: DataTypes.STRING,
    asset_name: DataTypes.STRING
  }, {timestamps: false})

  Asset.associate = (models) => {
    Asset.hasMany(models.AssetCustomer,
    {foreignKey: 'asset_id', as: 'asset'})
  }

  return Asset
}

module.exports = Asset