module.exports = (sequelize, DataTypes) => {
    const WeatherOptions = sequelize.define("WeatherOptions", {
        tripID: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        sunny: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        cloudy: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        rain: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        thunder: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        storm: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        exHot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        hot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        averageT: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        cold: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        exCold: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        heavyW: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    
        averageW: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        slightW: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
    return WeatherOptions;
}
