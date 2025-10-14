const express = require ("express")
const router = express.Router();
const { clienteController } = require("../controllers/clienteController");

// GET /clientes -> lista todos os clientes 
router.get("/clientes", clienteController.listarClientes);

//POST /clientes -> cria um novo cliente
router.post("/clientes", clienteController.criarCliente);

module.exports = {clientesRoutes: router};
