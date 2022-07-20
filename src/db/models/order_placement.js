const OrderPlacement = (sequelize, DataTypes) => {
  const OrderPlacement = sequelize.define('Order_Placements', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    asset_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });

  OrderPlacement.associate = (models) => {
    OrderPlacement.belongsTo(models.Customers, {
      foreignKey: 'customer_id', as: 'customer',
    });
    OrderPlacement.belongsTo(models.Assets, {
      foreignKey: 'asset_id', as: 'asset',
    });
  };

  return OrderPlacement;
};

module.exports = OrderPlacement;