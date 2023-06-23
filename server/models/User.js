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
          contactNo: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          userType: {
            type: DataTypes.STRING,
            allowNull: true,
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
          fileName: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          fileType: {
            type: DataTypes.STRING,
            allowNull: true,
          },
    });
  
    User.associate = (models) => {
      User.hasMany(models.Trip, {
        foreignKey: 'userId',
        onDelete:"cascade",
        
      });
    };
    
    User.associate = (models) => {
      User.hasMany(models.Review, {
        foreignKey: 'userId'
      });
    };
  
    return User;
  };
  