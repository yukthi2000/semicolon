module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define("Ratings", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Ratings;
};
