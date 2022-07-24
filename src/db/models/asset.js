const Asset = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Assets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    asset_code: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    asset_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, { timestamps: false });

    
    return Asset;
};

module.exports = Asset;