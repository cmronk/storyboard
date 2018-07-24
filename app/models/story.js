module.exports = function(sequelize, DataTypes) {
  var Storyboard = sequelize.define("Storyboard", {
    characterList: DataTypes.STRING,
    imageurl: DataTypes.TEXT,
    story: DataTypes.TEXT
  });
  return Storyboard;
};
