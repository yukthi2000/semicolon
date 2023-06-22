module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    vehicleType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Trip.associate = (models) => {
    Trip.belongsTo(models.User, {
      foreignKey: "userId",
      allowNull: true,
    });
    Trip.hasMany(models.Locations, {
      foreignKey: "tripId",
      onDelete:"cascade",
    });
    Trip.hasMany(models.Tripdetails, {
      foreignKey: "tripId",
      as: 'locations',
      onDelete:"cascade",
    });
    
    
  };

  return Trip;
};
