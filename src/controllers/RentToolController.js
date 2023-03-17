const RentTool = require('../models/Rent_Tool')
const Client = require('../models/Client')
const Tool = require('../models/Tool')

const {
    Op
} = require('sequelize')

const moment = require('moment')

class RentTollController {
    static async getCreate(req, res) {

        const tools = await Tool.findAll({
            raw: true,
            where: {
                quantity: {
                    [Op.gt]: 0
                }
            }
        })
        const clients = await Client.findAll({
            raw: true
        })

        return res.render('createRent', {
            tools,
            clients
        })
    }
    static async create(req, res) {
        const {
            idTool,
            idClient,
            devolutionDate
        } = req.body

        if (!idTool || !idClient || !devolutionDate) {
            return res.status(400).json({
                msg: 'Preencha todos os campos'
            })
        }

        const verifyDate = moment(devolutionDate)

        if (verifyDate.isBefore(moment())) { // 
            return res.status(400).json({
                msg: 'Data Inválida'
            })
        }

        const tool = await Tool.findByPk(idTool)

        if (!tool) {
            return res.status(400).json({
                msg: 'Ferramenta Inválida'
            })
        }

        const client = await Client.findByPk(idClient)

        if (!client) {
            return res.status(400).json({
                msg: 'Cliente Inválido'
            })
        }

        const newRent = await RentTool.create({
            devolutionDate,
            toolIdTool: idTool,
            clientIdClient: idClient
        })

        try {

            tool.quantity -= 1

            tool.save()

        } catch (e) {
            return res.status(400).json({
                msg: 'O produto nao esta mais disponivel'
            })
        }

        return res.status(200).json({
            newRent
        })
    }

    static async home(req, res) {

        const toolsRented = await RentTool.findAll({
            raw: true,
            include: [{
                model: Client
            }, {
                model: Tool
            }],
            order: [
                ['devolutionDate', 'ASC']
            ]
        })


        let expiredDevolutionTools 

        const tableToolsRented = await toolsRented.map((toolRented) => {

            const verifyDateDevolution = moment(toolRented.devolutionDate)

            const toolName = toolRented['tool.name']
            const clientName = toolRented['client.name']
            const dateDevolution = toolRented.devolutionDate

            const formattedDateDevolution = moment(dateDevolution).format("DD/MM/YYYY")

            if (verifyDateDevolution.isAfter(moment())) {
                return {
                    toolName,
                    clientName,
                    dateDevolution: formattedDateDevolution
                }
            }
            expiredDevolutionTools = [{
                toolNameExpirated: toolName,
                clientNameExpirated: clientName,
                dateDevolutionExpirate: formattedDateDevolution
            }]
        })

        return res.status(200).render('home', {
            tableToolsRented,
            expiredDevolutionTools
        })
    }
}

module.exports = RentTollController