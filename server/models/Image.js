// models/Image.js
module.exports = (sequelize, DataTypes) => {
    const Image  = sequelize.define("Gallary", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
return Image ;
}
