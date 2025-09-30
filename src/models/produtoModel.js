const { sql, getConnection } = require("../config/db");

const produtoModel = {
    buscarTodos: async () => {
        try {
            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            let sql = 'SELECT * FROM Produtos';

            const result = await pool.request().query(sql);

            return result.recordset;
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw error; // Passa o erro para o controler tratar
        }
    }
}

module.exports = { produtoModel }
