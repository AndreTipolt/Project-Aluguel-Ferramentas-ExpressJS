const Tool = require('../models/Tool')

class ToolController{
    static getCreate(req, res){
        res.render('createTool')
    }
    static async create(req, res){
        const { name, quantity } = req.body

        if(!name || !quantity){
            return res.render('createTool', { msg: 'Preencha todos os campos' })
        }

        const newTool = await Tool.create({ name, quantity })

        return res.status(201).json({ newTool })
    }
}

module.exports = ToolController