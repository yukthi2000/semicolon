module.exports = (sequelize, DataTypes) => {
    const TripDayWeather = sequelize.define("TripDayWeather", {
        tripID: {
            type: DataTypes.STRING,
        },
        
        temperature: {
            type: DataTypes.FLOAT,
        },

        windSpeed: {
            type: DataTypes.FLOAT,
        },
        overall: {
            type: DataTypes.STRING,
        },
        iconID: {
            type: DataTypes.STRING,
        },
    });
    return TripDayWeather;
}
