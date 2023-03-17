const RentTool = require('../models/Rent_Tool')
const Client = require('../models/Client')
const Tool = require('../models/Tool')

const moment = require('moment')
const bringClientTool = require('../middlewares/bringClientTool')

class RentTollController {
    static async getCreate(req, res) {

        const { clients, tools } = await bringClientTool()

        return res.render('createRent', { tools, clients })
    }
    static async create(req, res) {

        const { clients, tools } = await bringClientTool()

        const { idTool, idClient, devolutionDate } = req.body

        if (!idTool || !idClient || !devolutionDate) {
            return res.status(400).render('createRent',{ msgError: 'Preencha todos os campos', tools, clients })
        }

        const verifyDate = moment(devolutionDate)

        if (verifyDate.isBefore(moment())) { // 
            return res.status(400).render('createRent',{ msgError: 'Data Inválida', tools, clients })
        }

        const tool = await Tool.findByPk(idTool)

        if (!tool) {
            return res.status(400).render('createRent',{ msgError: 'Ferramenta Inválida', tools, clients })
        }

        const client = await Client.findByPk(idClient)

        if (!client) {
            return res.status(400).render('createRent',{ msgError: 'Cliente Inválido', tools, clients })
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
            return res.status(400).render('createRent',{ 
                msgError: 'O produto nao esta mais disponível', 
                tools, 
                clients 
            })
        }

        return res.status(200).render('createRent',{ 
            msgSucess: 'Ferramenta alugada com sucesso', 
            tools, 
            clients 
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

            const idRent = toolRented.id
            const idTool = toolRented.toolIdTool
            const toolName = toolRented['tool.name']
            const clientName = toolRented['client.name']
            const dateDevolution = toolRented.devolutionDate

            const formattedDateDevolution = moment(dateDevolution).format("DD/MM/YYYY")

            if (verifyDateDevolution.isAfter(moment())) {
                return {
                    idRent,
                    idTool,
                    toolName,
                    clientName,
                    dateDevolution: formattedDateDevolution
                }
            }
            expiredDevolutionTools = [{
                idRent,
                idTool,
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

    static async deleteRent(req, res){
        const { idRent, idTool } = req.params

        const rentExists = await RentTool.findOne({ id: idRent })

        if(!rentExists){
            return res.status(400).redirect('/')
        }

        const rent = await RentTool.destroy({ where: { id: idRent } })
            
            const tool = await Tool.findOne({ idTool })

            if(!tool){
                return res.status(400).redirect('/')
            }

            tool.quantity += 1

            tool.save()

            return res.status(200).redirect('/')

    }
}

module.exports = RentTollController