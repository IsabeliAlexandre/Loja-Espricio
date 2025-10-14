const { clienteModel } = require("../models/clienteModel");

const clienteController = {
    // ---------------------
    // LISTAR TODOS OS PRODUTOS
    // GET /produtos
    // ---------------------

    listarClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            res.status(500).json({ message: 'Erro ao buscar clientes.' });
        }
    },

    // ---------------------
    // CRIAR UM NOVO CLIENTE
    // POST /produtos 
    /*
        {
            "nomeCliente": "nome"
            "cpfCliente": "000.000.000-00"
        }
    */
    // ---------------------

    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body;

            if (nomeCliente == undefined || cpfCliente == undefined) {
                return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' });

            }
            const result = await clienteModel.buscarCpf(cpfCliente);
            if (result.length > 0) { //contabiliza os números
                return res.status(409).json({ message:'O cpf já estácadastrado.'});
            }

            await clienteModel.inserirClientes(nomeCliente, cpfCliente);
            res.status(201).json({ message: 'Cliente cadastrado com sucesso' });

        } catch (error) {
            console.error('Erro ao cadastrar cliente', error);
            res.status(500).json({ erro: 'Erro no servidor ao cadatrar cliente' });
        }
    }

}

module.exports = { clienteController };