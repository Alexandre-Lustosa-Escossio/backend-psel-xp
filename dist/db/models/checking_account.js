const CheckingAccount = (sequelize, DataTypes) => {
  const CheckingAccount = sequelize.define("Checking_Accounts", {
    customer_id: DataTypes.INTEGER,
    balance: DataTypes.INTEGER 
  }, { timestamps: false })
  
  CheckingAccount.associate = (models) => {
    CheckingAccount.belongsTo(models.Customer,
    {foreingKey: 'id', as: 'customer'})
  }

  return CheckingAccount
}

module.exports = CheckingAccount