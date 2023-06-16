module.exports = (sequelize, DataTypes) => {
  const TripLocations = sequelize.define("TripLocations", {
      tripId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
      },
      locationId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
      }
  });

  return TripLocations;
};
