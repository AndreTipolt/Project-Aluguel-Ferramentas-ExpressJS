const client = require('../models/Client')

class ClientController{
    static async home(req, res){
        
    }

    static async create(req, res){
        const { name, phoneNumber, adress } = req.body

        if(!name || !phoneNumber || !adress){
            return res.status(400).json({ msg: 'Fill all fields'})
        }

        const newClient = await client.create({ name, phoneNumber, adress })

        return res.status(201).json(newClient)
    }
}

module.exports = ClientController