import { Aluno } from '../Models/AlunoModel.js'

export class AlunoController{
    static async store(req, res){
        try {
           const { rg } = req.body;
           if( rg == '' || rg == null){
            return res.status(206).json({
                msg : 'Rg não informado!'
            })   
           }
           
           const data = await Aluno.cadastrar(rg);

           if(!data){
                return res.status(203).json({
                    msg : 'Erro ao cadastrar aluno!'
                })
            }
        
            return res.status(200).json({
                msg: 'Cadastrado com sucesso!'
            })

        } 
        catch (error) {
            return res.status(500).send('Erro to store aluno: ' + error);
        }
    }

    static async listAll(req ,res){
        try {
            const data = await Aluno.listarTodos();

            if(!data){
                 return res.status(203).json({
                     msg : 'Nenhum aluno encontrado'
                 })
             }
         
             return res.status(200).json(data);
        } 
        catch (error) {
            return res.status(500).send('Erro to listAll aluno: ' + error);
        }
    }
}