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
          userType: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          photo: {
            type: DataTypes.BLOB('long'),
            allowNull: true,
          },
        

    });
  
    User.associate = (models) => {
      User.hasMany(models.Trip, {
        foreignKey: 'userId',
        onDelete:"cascade",
        
      });
    };
  
    return User;
  };
  