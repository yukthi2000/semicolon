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
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    });

    return Review;
  }

