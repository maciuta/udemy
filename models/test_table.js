module.exports = function(sequelize, DataTypes) {
    var test_table = sequelize.define('test_Tables', {
        vardas: DataTypes.STRING,
        pavarde: DataTypes.STRING
    });
    test_table.sync();

    return test_table;
}