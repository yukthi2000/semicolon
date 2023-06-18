module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {

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
          },
          resetToken: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          expiryTime: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          photo: {
            type: DataTypes.BLOB('long'),
            allowNull: true,
          },
        

    });
  
    User.associate = (models) => {
      User.hasMany(models.Trip, {
        foreignKey: 'userId'
      });
    };

    User.associate = (models) => {
      User.hasMany(models.Review, {
        foreignKey: 'userId'
      });
    };
  
    return User;
  };
  