
module.exports = (sequelize, DataTypes) => {
    const Array = sequelize.define("Array", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      
        
    });
    return Array;
}