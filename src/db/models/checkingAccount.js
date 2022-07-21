const CheckingAccount = (sequelize, DataTypes) => {
  const CheckingAccount = sequelize.define('Checking_Accounts', {
    customer_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    balance: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, { timestamps: false });
  
  CheckingAccount.associate = (models) => {
    CheckingAccount.belongsTo(models.Customers,
    { foreignKey: 'customer_id', as: 'checking_account' });
  };

  return CheckingAccount;
};

module.exports = CheckingAccount;