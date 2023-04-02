module.exports = (sequelize,DataTypes) => {

    const WeatherOptions = sequelize.define("WeatherOptions",{
        tripID:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        sunny:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
        },
        cloudy:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
        },
        rain:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
        },
        thunder:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
        },
        storm:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
        },

    })
    return WeatherOptions 
} 