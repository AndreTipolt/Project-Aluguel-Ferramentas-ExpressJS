const { DataTypes, INTEGER } = require("sequelize");
const conn = require("../db/conn");
const client = require("./Client");
const Tool = require("./Tool");



const Rent_Tool = conn.define('rent_tool',{
    devolutionDate:{
        type: DataTypes.DATE,
        allowNull: false
    }
})

Tool.hasMany(Rent_Tool)
Rent_Tool.belongsTo(Tool)

client.hasMany(Rent_Tool)
Rent_Tool.belongsTo(client)

module.exports = Rent_Tool