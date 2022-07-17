const Credential = (sequelize, DataTypes) => {
  const Credential = sequelize.define('Credentials', {
    customer_id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, { timestamps: false })
  
  Credential.associate = (models) => {
    Credential.belongsTo(models.Customers,
    {foreignKey: 'customer_id', as: 'credential'})
  }

  return Credential
}

module.exports = Credential