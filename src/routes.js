const express  = require('express');
const routes   = express.Router();

const { CartsControll, TransactionsControll } = require('./controllers');

// CRUD do Carts
routes.get("/carts",          CartsControll.index);
routes.post("/carts",         CartsControll.create);
routes.put("/carts/:id",      CartsControll.update);
routes.delete("/carts/:id",   CartsControll.delete);
// Rotas para o Transactions
routes.post("/transactions",  TransactionsControll.create);


module.exports = routes;