import { CreatePool } from "../../database.js";
const connection = await CreatePool();

export class Sala {
    constructor(nome, id, status_sala){
        this.nome = nome,
        this.id = id,
        this.status_sala = status_sala
    }

    static async cadastrar(nome){
        try{
            const { recordsets } = await connection.query(`select count(*) as 'find' from sala where nome = '${nome}'`);
            
            if(recordsets[0][0].find != 0){
                return 2;
            }

            const { rowsAffected } = await connection.query(`insert into sala values('${nome}', 1)`);       
            
            if(rowsAffected[0] == 1){
                return new Sala(nome);
            }
            else{
                return false;
            }
        }
        catch(err){
            console.log(`Error to cadastrar 'sala': ${err}`);
            await connection.close();
            return false;
        }
    }

    static async listarTodos(){
        try{
            const { recordsets } = await connection.query('select * from sala where status_sala = 1');       

            if(recordsets[0] != ''){
                return recordsets[0];
            }
            return false;
                
        }
        catch(err){
            console.log(`Error to listarTodos salas: ${err}`);
            await connection.close();
            return false;
        }
       
    }

    static async atualizar(id, nome){
        try{
            const { recordsets } = await connection.query(`select count(*) as 'find' from sala where sala_id = ${id}`);

            if(recordsets[0][0].find == 0){
                return false;
            }

            const { rowsAffected } = await connection.query(`update sala set nome = '${nome}' where sala_id = ${id}`);
            
            if(rowsAffected[0] == 1){
                return new Sala(nome, id);
            }
            else{
                return false;
            }
        }
        catch(err){
            console.log(`Error to atualizar 'salas': ${err}`);
            await connection.close();
            return false;
        }
    }

    static async excluir(id){
        try{
            const { recordsets } = await connection.query(`select count(*) as 'find' from sala where sala_id = ${id}`);

            if(recordsets[0][0].find == 0){
                return false;
            }

            let { rowsAffected } = await connection.query(`update sala set status_sala = 0 where sala_id = ${id}`);
            
            if(rowsAffected[0] == 1){
                return true;
            }
            else{
                return false;
            }
    
        }
        catch(err){
            console.log(`Error to excluir 'salas': ${err}`);
            await connection.close();
            return false;
        }
    }
}