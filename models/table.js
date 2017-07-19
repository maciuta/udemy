module.exports = function(sequelize, DataTypes) {
    var table = sequelize.define("table1s", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
    });
    table.sync();

    return table;

};