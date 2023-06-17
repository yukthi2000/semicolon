module.exports = (sequelize, DataTypes) => {
    const Locations = sequelize.define("Locations", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    });
    return Locations;
}
