const conn = require('../db/conn')

const { DataTypes } = require('sequelize')
const tool = require('./Tool')

const client = conn.define('client', {
    idClient:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        required: true
    },
    phoneNumber:{
        type: DataTypes.STRING,
        required: true,
    },
    adress:{
        type: DataTypes.STRING,
        required: true
    }
})

client.belongsToMany(tool, {
    through: 'rent_tool',
    as: 'tool',
    foreignKey: 'idClient'
})

module.exports = client