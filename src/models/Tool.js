const conn = require('../db/conn')

const { DataTypes } = require('sequelize')
const client = require('./Client')


const tool = conn.define('tool', {
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
    available: {
        type: DataTypes.BOOLEAN,
        required: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        required: true,
    }
})

// tool.belongsToMany(client, {
//     through: 'rent_tool',
//     as: 'client',
//     foreignKey: 'idTool'
// })

module.exports = tool