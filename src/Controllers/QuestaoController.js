import { Questao } from "../Models/QuestaoModel.js";

export class QuestaoController{
    static async store(req, res){
        try {
            const { texto, sala_id } = req.body;

            if(texto == '' || texto == null || sala_id == '' || sala_id == null){
                return res.status(206).json({
                    msg : 'Texto ou codigo da sala referencia nao enviado(s)'
                })
            }

            const quest = await Questao.cadastrar(texto, sala_id)

            if(!quest){
                return res.status(203).json({
                    msg : 'Erro ao cadastrar questao!'
                })
            }
            
            return res.status(200).json({
                msg: 'Cadastrado com sucesso!'
            })
        } 
        catch (error) {
            return res.status(500).send('Erro to store questao: ' + error);
        }
    }

    static async listAll(req, res){
        try {
            const { sala_id } = req.params;

            if( sala_id == '' || sala_id == null){
                return res.status(206).json({
                    msg : 'Codigo da sala referencia nao enviado(s)'
                })
            }

            const data = await Questao.listarTodos(sala_id);

            if(!data)
            {
                return res.status(203).json({
                    msg : "Nenhuma questao encontrada"
                })
            }
            
            return res.status(200).json(data);
        } 
        catch (error) {
            return res.status(500).send('Erro to listAll questao: ' + error);
        }
    }

    static async update(req, res){
        try {
            const { id } = req.params;            
            const { texto, sala_id } = req.body;

            if( id == '' || id == null || texto == '' || texto == null || 
            sala_id == '' || sala_id == null){
                return res.status(206).json({
                    msg : 'Texto, sala ou questao referencia nao informado(s)'
                })
            }

            const data = await Questao.atualizar(id, sala_id, texto);

            if(!data)
            {
                return res.status(203).json({
                    msg : "Nenhuma questao encontrada"
                })
            }
            
            return res.status(200).json(data);
        } 
        catch (error) {
            return res.status(500).send('Erro to update questao: ' + error);
        }
    }

    static async delete(req, res){
        try {
            const { id } = req.params;

            if( id == '' || id == null){
                return res.status(206).json({
                    msg : 'Questao referencia nao encontrada'
                })
            }

            const data = await Questao.excluir(id); 

            if(!data)
            {
                return res.status(203).json({
                    msg : "Questao nao encontrada para excluir!"
                })
            }
            else
                return res.status(200).json({
                    msg : 'Excluido com sucesso!'
                });          

        } 
        catch (error) {
            return res.status(500).send('Erro to delete questao: ' + error);
        }
    }
}