import { CreatePool } from "../../database.js";
const connection = await CreatePool();

export class Questao{
    constructor(texto, sala_id, id){
        this.texto = texto,
        this.sala_id = sala_id,
        this.id = id
    }

    static async cadastrar(texto, sala_id){
        try{
            const { rowsAffected } = await connection.query(`insert into questao values('${texto}', ${sala_id}, 1)`);       
            
            if(rowsAffected[0] == 1){
                return new Questao(texto, sala_id);
            }
            else{
                return false;
            }
        }
        catch(err){
            console.log(`Error to cadastrar 'questao': ${err}`)
            await connection.close();
            return false;
        }
    }

    static async listarTodos(sala_id){
        try{
            const { recordsets } = await connection.query(`select * from questao where id_sala = ${sala_id} and status_quest = 1`);       
                
                if(recordsets[0] != ''){
                    return recordsets[0];
                }
                
                return false;
        }
        catch(err){
            console.log(`Error to listarTodos 'questao': ${err}`);
            await connection.close();
            return false;
        }
    }

    static async atualizar(id, sala_id, texto){
        try{
            const { recordsets } = await connection.query(`select count(*) as 'find' from questao where quest_id = ${id}`);

            if(recordsets[0][0].find == 0){
                return false;
            }

            const { rowsAffected } = await connection.query(`update questao set texto = '${texto}' where quest_id = ${id}`);
            
            if(rowsAffected[0] == 1){
                return new Questao(texto, sala_id, id);
            }
            else{
                return false;
            }        
        }
        catch(err){
            console.log(`Error to atualizar 'sala': ${err}`);
            await connection.close();
            return false;
        }
    }

    static async excluir(id){
        try{
            const { recordsets } = await connection.query(`select count(*) as 'find' from questao where quest_id = ${id}`);

            if(recordsets[0][0].find == 0){
                return false;
            }

            const { rowsAffected } = await connection.query(`update questao set status_quest = 0 where quest_id = ${id};`);
            if(rowsAffected[0] == 1){
                return true;
            }
            else{
                return false;
            }
        }
        catch(err){
            console.log(`Error to excluir 'sala': ${err}`);
            await connection.close();
            return false;
        }
    }
}