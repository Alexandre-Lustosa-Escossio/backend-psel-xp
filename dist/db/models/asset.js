const Asset = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Assets', {
    id: DataTypes.INTEGER,
    asset_code: DataTypes.STRING,
    asset_name: DataTypes.STRING
  })
  return Asset
}

module.exports = Asset