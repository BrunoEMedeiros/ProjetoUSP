import { CreatePool } from "../../database.js";
const connection = await CreatePool();

export class Resposta{
    constructor(id_aluno, id_questao, habilidade, desafio){
        this.id_aluno = id_aluno,
        this.id_questao = id_questao,
        this.habilidade = habilidade,
        this.desafio = desafio
    }

    static async cadastrar(id_aluno, id_questao, habilidade, desafio){
        try {
            const { rowsAffected } = await connection.query(`insert into resposta values(${id_aluno},${id_questao},${habilidade},${desafio})`);       
            
            if(rowsAffected[0] == 1){
                return new Resposta(id_aluno, id_questao, habilidade, desafio);
            }
            else{
                return false;
            }
        } 
        catch (error) {
            console.log(`Error to cadastrar 'resposta': ${error}`)
            await connection.close();
            return false;
        }
    }

    static async listarTodosPorQuestao(id_questao){
        try {
            const { recordsets } = await connection.query(`select * from resposta where id_questao = ${id_questao}`);       
                
                if(recordsets[0] != ''){
                    return recordsets[0];
                }
                
                return false;
        } 
        catch (error) {
            console.log(`Error to listarTodosPorQuestao 'resposta': ${error}`)
            await connection.close();
            return false;      
        }
    }

    static async listarTodosPorAluno(id_aluno){
        try {
            const { recordsets } = await connection.query(`select * from resposta where id_aluno = ${id_aluno}`);       
                
            if(recordsets[0] != ''){
                return recordsets[0];
            }
            
            return false;
        } 
        catch (error) {
            console.log(`Error to listarTodosPorAluno 'resposta': ${error}`)
            await connection.close();
            return false;     
        }
    }
}