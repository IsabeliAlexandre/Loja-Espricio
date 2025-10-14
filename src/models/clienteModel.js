const { sql, getConnection } = require("../config/db");

const clienteModel = {
    buscarTodos: async () => {
        try {
            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            let sql = 'SELECT * FROM Clientes';

            const result = await pool.request().query(sql);

            return result.recordset;
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            throw error; // Passa o erro para o controler tratar
        }
    },

     buscarCpf: async (cpfCliente) => {
        try {
            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            let sql = 'SELECT * FROM cpfCliente WHERE cpfCliente = @cpfCliente';

            const result = pool.request();
            input ('cpfCliente', sql.VarChar(14), cpfCliente)
            .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar cpf:', error);
            throw error; // Passa o erro para o controler tratar
        }
    },

    inserirClientes: async(nomeCliente, cpfCliente)=>{
        try {
            const pool = await getConnection();

            let querySQL = 'INSERT INTO Clientes (nomeCliente, cpfCliente) VALUES(@nomeCliente, @cpfCliente)';

            await pool. request()
            .input('nomeCliente', sql.VarChar(50), nomeCliente)
            .input ('cpfCliente', sql.VarChar(14), cpfCliente)
            .query(querySQL);

        } catch (error) {
            console.error('Erro ao inserir cliente', error);
            throw error; // Passa o erro para o controle tratar 
            
        }

    }
    


}

module.exports = { clienteModel }
