module.exports = (sequelize, DataTypes) => {
    const UserTrip = sequelize.define("UserTrip", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        tripId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        }
    });

    return UserTrip;
};
