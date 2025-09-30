const express = require("express");
const app = express();
const { } = require("./src/routes/produtosRoutes")
const {produtosRoutes} = require("./src/routes/produtosRoutes");

const PORT = 8081;

app.use(express.json());

app.use('/', produtosRoutes);

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})