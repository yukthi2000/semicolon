module.exports = (sequelize, DataTypes) => {
    const Trip = sequelize.define("Trip", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    Trip.associate = (models) => {
      Trip.belongsTo(models.User, {
        foreignKey: 'userId',
        allowNull: false
      });
      Trip.hasMany(models.Locations, {
        foreignKey: 'tripId'
      });
    };
  
    return Trip;
  };
  