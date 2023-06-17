
module.exports = (sequelize, DataTypes) => {
    const Tripdetails = sequelize.define("Tripdetails", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          distanace: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          Duration: {
            type: DataTypes.STRING,
            allowNull: false,
          }
        
    });
    Tripdetails.associate = (models) => {
        Tripdetails.belongsTo(models.Trip, {
          foreignKey: 'tripId',
          allowNull: false
        });
    }
    return Tripdetails;
}