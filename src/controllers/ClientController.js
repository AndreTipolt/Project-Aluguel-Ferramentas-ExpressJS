const client = require('../models/Client')

class ClientController{
    static async home(req, res){
        
    }
    static getCreate(req, res){
        res.render('createClient')
    }

    static async create(req, res){
        const { name, phoneNumber, adress } = req.body
        
        if(!name || !phoneNumber || !adress){
            return res.status(400).render('createClient',{ msgError: 'Preencha todos os Campos'})
        }

        await client.create({ name, phoneNumber, adress })

        return res.status(201).render('createClient', { msgSucess: 'Cliente Cadastrado com sucesso' })
    }
}

module.exports = ClientController