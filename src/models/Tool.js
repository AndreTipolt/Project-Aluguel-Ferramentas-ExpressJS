const conn = require('../db/conn')

const { DataTypes } = require('sequelize')

const Tool = conn.define('tool', {
    idTool:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        required: true
    },
    quantity: {
        type: DataTypes.INTEGER,
    }
})

module.exports = Tool