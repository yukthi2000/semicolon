module.exports = (sequelize, DataTypes) => {
  const WeatherScore = sequelize.define("WeatherScore", {
    tripID: {
      type: DataTypes.STRING,
      primaryKey: true,
  },
  location: {
      type: DataTypes.STRING,
      primaryKey: true,
  },
  score: {
    type: DataTypes.DOUBLE,
  },

  });
  
  return WeatherScore;
};
