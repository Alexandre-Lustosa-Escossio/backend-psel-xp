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
    order_id: {
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

  return OrderBook;
}
