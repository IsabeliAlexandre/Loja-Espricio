const express = require("express");
const app = express();
const {clientesRoutes} = require("./src/routes/clientesRoutes");
const {produtosRoutes} = require("./src/routes/produtosRoutes");
const {pedidoRoutes} = require("./src/routes/pedidoRoutes");

const PORT = 8081;

app.use(express.json());
app.use('/', clientesRoutes);
app.use('/', produtosRoutes);
app.use('/', pedidoRoutes);

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})