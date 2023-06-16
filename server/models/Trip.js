module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      location: {
          type: DataTypes.INTEGER,
          allowNull: false,
      }
  });

  Trip.associate = (models) => {
      Trip.hasMany(models.Locations, { foreignKey: 'tripId' });
      Trip.belongsToMany(models.UserSec, { through: models.UserTrip, foreignKey: 'tripId' });
      Trip.belongsToMany(models.Locations, { through: models.TripLocations, foreignKey: 'tripId' });
  };

  return Trip;
};

