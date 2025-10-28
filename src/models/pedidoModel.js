const {sql, getConnection} = require("../config/db")

const pedidoModel ={

    /**
     * Busca todos os pedidos e seus respectivos itens no banco de dados.
     * 
     * @async
     * @function buscarTodos 
     * @returns {Promise<Array>} Retornaria uma lista com todos os pedidos e seus itens.
     * @throws Mostra no console e propaga o erro caso haja falha
     */
   

     buscarTodos: async () => {
        try {
            const pool = await getConnection();

            const querySQL = `
                SELECT 
                    CL.nomeCliente,
                    PD.dataPedido,
                    PD.statusPagamento,
                    PR.nomeProduto,
                    IT.qtdItem

                FROM Pedidos PD
                INNER JOIN ItemPedido IT -- SÓ QUEM TIVER RELAÇÃO
                    ON IT.idPedido = PD.idPedido

                INNER JOIN Produtos PR
                    ON PR.idProduto = IT.idProduto

                INNER JOIN Clientes CL	
                    ON CL.idCliente = PD.idCliente  
            `;

            const result = await pool.request()
            .query(querySQL);

            return result.recordset
        } catch (error) {
            console.error("Erro ao buscar pedidos", error);
            throw error;
        }
     },

     inserirPedido: async (idCliente, dataPedido, statusPagamento, {itens}) => {
        //{itens} realiza a desustruturação do objeto itens

        const pool = await getConnection();

        const transaction = new sql.Transaction(pool);
        await transaction.begin(); //inicia a transação

        try {

            let querySQL = `
            INSERT INTO Pedidos (idCliente, dataPedido, statusPagamento)
            OUTPUT INSERTED.idPedido
            VALUES (@idCliente, @dataPedido, @statusPagamento)

            `;

            const result = await transaction.request()
            .input("idCliente", sql.UniqueIdentifier, idCliente)
            .input ("dataPedido", sql.Date, dataPedido)
            .input("statusPagamento", sql.Bit, statusPagamento)
            .query(querySQL);

            const idPedido = result.recordset[0].idPedido;  //recordset retorna uam lista(array) 
            
            for (const item of itens) {
                const {idProduto, qtdItem} = item;

                querySQL =`
                INSERT INTO ItemPedido (idPedido, idProduto, qtdItem)
                VALUES (@idPedido, @idProduto, @qtdItem)

                `
                await transaction.request()
                .input("idPedido", sql.UniqueIdentifier, idPedido)
                .input("idProduto", sql.UniqueIdentifier, idProduto)
                .input("qtdItem", sql.Int, qtdItem)
                .query(querySQL);

            }
            await transaction.commit() //confirma a tarnsação, salva tudo no banco

        } catch (error) {
            await transaction.rollback() //desfaz tudo caso de erro 
            console.error('Erro ao inserir pedido', error);
            throw error;
        }
        
     }
};

module.exports ={pedidoModel}