module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define("Ratings", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Ratings;
};
