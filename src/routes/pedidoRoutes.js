const express = require("express")
const router = express.Router();
const {pedidoController} = require("../controllers/pedidoController")

/**
 * Define as rotas relacionadas aos pedidos
 * 
 * @module pedidoRoutes
 * - GET /pedidos -> lista todos os pedidos do banco de dados. 
 * - POST /pedidos -> cria um novo pedido e os seus itens enviados pelo cliente http
 */

router.get("/pedidos", pedidoController.listarPedidos)
router.post("/pedidos", pedidoController.criarPedidos)

module.exports = {pedidoRoutes: router};