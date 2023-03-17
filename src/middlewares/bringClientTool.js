const Client = require("../models/Client")
const Tool = require("../models/Tool")

const { Op } = require('sequelize')

module.exports = async function bringClientTool(){
    const tools = await Tool.findAll({
        raw: true,
        where: {
            quantity: {
                [Op.gt]: 0
            }
        }
    })
    const clients = await Client.findAll({ raw: true })

    return {clients, tools}

}