module.exports = (sequelize, DataTypes) => {
    const Locations = sequelize.define("Locations", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Locations.associate = (models) => {
        Locations.belongsToMany(models.Trip, { through: models.TripLocations, foreignKey: 'locationId' });
    };

    return Locations;
};
