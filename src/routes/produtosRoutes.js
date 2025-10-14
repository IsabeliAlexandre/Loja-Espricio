const express = require ("express")
const router = express.Router();
const { produtoController } = require("../controllers/produtoController");

// GET /produto -> lista todos os produtos 
router.get("/produtos", produtoController.listarProdutos);

//POST /produto -> cria um novo produto
router.post("/produtos", produtoController.criarProduto)

module.exports = {produtosRoutes: router};
