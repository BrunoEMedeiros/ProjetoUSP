import { CreatePool } from "../../database.js";
const connection = await CreatePool();

export class Aluno{
    constructor(rg){
        this.rg = rg;
    }

    static async cadastrar(rg){
        try {
            
            const { recordsets } = await connection.query(`select count(*) as 'find' from aluno where rg = '${rg}'`);
            
            if(recordsets[0][0].find != 0){
                return 2;
            }

            const { rowsAffected } = await connection.query(`insert into aluno values('${rg}')`);       
            
            if(rowsAffected[0] == 1){
                return new Sala(nome);
            }
            else{
                return false;
            }
        } 
        catch (error) {
            console.log(`Error to cadastrar 'aluno': ${error}`)
            await connection.close();
            return false;
        }
    }

    static async listarTodos(){
        try {
            const { recordsets } = await connection.query(`select * from aluno order by aluno_id`);       
                
            if(recordsets[0] != ''){
                return recordsets[0];
            }
            
            return false;
        } 
        catch (error) {
            console.log(`Error to listarTodos 'aluno': ${error}`)
            await connection.close();
            return false;
        }
    }
}