const Asset = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Assets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    asset_code: {
      allowNull: false,
      type: DataTypes.STRING
    },
    asset_name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, { timestamps: false })

  /* Asset.associate(models => {
    Asset.hasMany(models.Order_Placements, {
      foreignKey: 'asset_id', as: 'Assets'
    })
  }) */
    
    return Asset

}


module.exports = Asset