const { sql, getConnection } = require("../config/db");

const clienteModel = {
    buscarTodos: async () => {
        try {
            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            let querySQL = 'SELECT * FROM Clientes';

            const result = await pool.request().query(querySQL);

            return result.recordset;
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            throw error; // Passa o erro para o controler tratar; o catch captura o erro 
        }
    },

     buscarCpf: async (cpfCliente) => {
        try {
            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            let querySQL = 'SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente';

            const result = await pool.request()
            .input ('cpfCliente', sql.Char(14), cpfCliente)
            .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar cpf:', error);
            throw error; // Passa o erro para o controler tratar
        }
    },

     buscarUm: async (idCliente) => { // busca um cliente
        try {
            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            let querySQL = 'SELECT * FROM Clientes WHERE idCliente = @idCliente';

            const result = await pool
            .request()
            .input ('idCliente', sql.UniqueIdentifier, idCliente)
            .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            throw error; // Passa o erro para o controler tratar
        }
    },

    

    inserirCliente: async(nomeCliente, cpfCliente)=>{
        try {
            const pool = await getConnection();

            let querySQL = 'INSERT INTO Clientes (nomeCliente, cpfCliente) VALUES(@nomeCliente, @cpfCliente)';

            await pool.request()
            .input('nomeCliente', sql.VarChar(50), nomeCliente)
            .input (`cpfCliente`, sql.Char(14), cpfCliente)
            .query(querySQL);

        } catch (error) {
            console.error('Erro ao inserir cliente', error);
            throw error; // Passa o erro para o controle tratar 
            
        }

    },

}

module.exports = { clienteModel }
