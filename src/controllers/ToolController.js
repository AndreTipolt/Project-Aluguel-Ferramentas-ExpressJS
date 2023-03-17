const Tool = require('../models/Tool')

class ToolController{
    static getCreate(req, res){
        res.render('createTool')
    }
    static async create(req, res){
        const { name, quantity } = req.body

        if(!name || !quantity){
            return res.render('createTool', { msgError: 'Preencha todos os campos' })
        }

        await Tool.create({ name, quantity })

        return res.status(201).render('createTool', { msgSucess: 'Ferramenta Cadastrada com Sucesso' })
    }
}

module.exports = ToolController