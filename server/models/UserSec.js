module.exports = (sequelize, DataTypes) => {
    const UserSec = sequelize.define("UserSec", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    UserSec.associate = (models) => {
        UserSec.hasMany(models.Trip, { foreignKey: 'userId' });
        UserSec.belongsToMany(models.Trip, { through: models.UserTrip, foreignKey: 'userId' });
    };

    return UserSec;
};
