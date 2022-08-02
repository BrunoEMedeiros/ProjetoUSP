import { Resposta } from '../Models/RespostaModel.js'

export class RespostaController{
    static async store( req, res){
        try {
            const { id_aluno , id_questao, habilidade, desafio } = req.body;

            if( 
                id_aluno == '' || id_aluno == null ||
                id_questao == '' || id_questao == null ||
                habilidade == '' || habilidade == null ||
                desafio == '' || desafio == null 
            ){
                return res.status(206).json({
                    msg : 'Informações da resposta não enviadas'
                })
            }

            const data = await Resposta.cadastrar(id_aluno, id_questao, habilidade, desafio);
            
            if(!data){
                return res.status(203).json({
                    msg : 'Erro ao cadastrar resposta!'
                })
            }
        
            return res.status(200).json({
                msg: 'Cadastrado com sucesso!'
            })
        } 
        catch (error) {
            return res.status(500).send('Erro to store resposta: ' + error);
        }
    }

    static async listAllByQuest(req, res){
        try {
            const { id_questao } = req.params;

            if( id_questao == null || id_questao == '' ){
                return res.status(206).json({
                    msg : 'Questao referencia para a resposta não informada'
                })
            }

            const data = await Resposta.listarTodosPorQuestao(id_questao);

            if(!data)
            {
                return res.status(203).json({
                    msg : "Nenhuma resposta encontada para a questao"
                })
            }
            
            return res.status(200).json(data);

        } 
        catch (error) {
            return res.status(500).send('Erro to listAllByQuest resposta: ' + error);
        }
    }

    static async listAllByStudent(req, res){
        try {
            const { id_aluno } = req.params;

            if( id_aluno == null || id_aluno == '' ){
                return res.status(206).json({
                    msg : 'Aluno referencia para a resposta não informado'
                })
            }

            const data = await Resposta.listarTodosPorAluno(id_aluno);

            if(!data)
            {
                return res.status(203).json({
                    msg : "Nenhuma resposta encontada para a questao"
                })
            }
            
            return res.status(200).json(data);
        } 
        catch (error) {
            return res.status(500).send('Erro to listAllByStudant resposta: ' + error);
        }
    }
}