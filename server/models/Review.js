module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locations: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      

    });

    Review.associate = (models) => {
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        allowNull: false
      });
     
    };

    return Review;
  }

