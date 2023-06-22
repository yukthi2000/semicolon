module.exports = (sequelize, DataTypes) => {
    const TripDayWeather = sequelize.define("TripDayWeather", {
        tripID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        location: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        lat: {
            type: DataTypes.DOUBLE,
        },
        lng: {
            type: DataTypes.DOUBLE,
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
