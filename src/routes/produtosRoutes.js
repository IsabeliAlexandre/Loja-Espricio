const express = require ("express")
const router = express.Router();
const { produtoController } = require("../controllers/produtoController");


// GET /produto -> lista um ou mais produtos
router.get("/produtos", produtoController.listarProdutos)

//POST /produto -> cria um novo produto
router.post("/produtos", produtoController.criarProduto);

//PUT /produtos/idProdutos -> Atualizar um produto
router.put("/produtos/:idProduto", produtoController.atualizarProduto);

//delete /produtos/idProdutos -> Deletar um produto
router.delete("/produtos/:idProduto", produtoController.deletarProduto);

module.exports = {produtosRoutes: router};
