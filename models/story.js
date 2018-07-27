module.exports = function(sequelize, DataTypes) {
    var Storyboard = sequelize.define("Storyboard", {
      characterList: DataTypes.STRING,
      imageurl: DataTypes.TEXT,
      story: DataTypes.TEXT,
      genre: DataTypes.TEXT
    });
    return Storyboard;
  };
  