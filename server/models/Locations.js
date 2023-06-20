module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define("Locations", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Locations.associate = (models) => {
    Locations.belongsTo(models.Trip, {
      foreignKey: "tripId",
      allowNull: false,
      
      
    });
  };

  return Locations;
};
