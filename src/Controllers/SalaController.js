import { Sala } from "../Models/SalaModel.js";

export class SalaController{
    static async store( req, res ){
      try{
        const { nome } = req.body;
        if( nome == null || nome == ''){
            return res.status(206).json({
                msg : 'Nome da sala não enviado'
            })
        }
        const sala = await Sala.cadastrar(nome);

        if(sala == 2){
            return res.status(203).json({
                msg : 'Ja existe uma sala com esse nome!'
            })
        }
        if(!sala){
            return res.status(500).json({
                msg : 'Erro ao cadastrar sala!'
            })
        }
       
        const data = await Sala.listarTodos();

        return res.status(200).json(data)
      }
      catch(err){
        return res.status(500).send('Error to store sala: ' + err);
      }
    };

    static async listAll(req, res){
        try{

            const data = await Sala.listarTodos();
            
            if(!data)
            {
                return res.status(203).json({
                    msg : "Nenhuma sala encontrada"
                })
            }
            
            return res.status(200).json(data);
        }
        catch(err){
            return res.status(500).send('Error to listAll sala: ' + err);
        }
    }

    static async update(req, res){
        try{
            const { id } = req.params;            
            const { nome } = req.body;

            if(id == null || id == '' || nome == null || nome == ''){
                return res.status(206).json({
                    msg : 'Nome ou Código da sala não enviado(s)'
                }) 
            }

            const data = await Sala.atualizar(id, nome);

            if(!data)
            {
                return res.status(203).json({
                    msg : "Sala informada não encontrada"
                })
            }
            else
                return res.status(200).json(data);
        }
        catch(err){
            return res.status(500).send('Error to update sala: ' + err);
        }
    }

    static async delete(req, res){
        try{
            const { id } = req.params;            
            let data = await Sala.excluir(id);
            if(!data)
            {
                return res.status(203).json({
                    msg : "Sala nao encontrada para excluir!"
                })
            }
            else
                return res.status(200).json({
                    msg : 'Excluido com sucesso!'
                });
        }
        catch(err){
            return res.status(500).send('Error to delete sala: ' + err);
        }
    }
}