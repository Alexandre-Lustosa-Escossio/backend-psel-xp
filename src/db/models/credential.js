const Credential = (sequelize, DataTypes) => {
  const Credential = sequelize.define('Credentials', {
    customer_id: DataTypes.INTEGER,
    password: DataTypes.INTEGER,
  }, { timestamps: false })
  
  Credential.associate = (models) => {
    Credential.belongsTo(models.Customer,
    {foreignKey: 'customer_id', as: 'credential'})
  }

  return Credential
}

module.exports = Credential