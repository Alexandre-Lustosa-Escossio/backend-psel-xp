const OrderBook = (sequelize, DataTypes) => {
  const OrderBook = sequelize.define('OrderBook', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    customer_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    asset_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    side: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, { timestamps: false });

  OrderBook.associate = (models) => {
    OrderBook.belongsTo(models.Customers, {
      foreignKey: 'customer_id',
      onDelete: 'CASCADE',
    });
  }

  return OrderBook;
}

module.exports = OrderBook;