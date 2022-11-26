const { Cart, Transaction } = require('../models');

const TransactionService = {
  async process(par) {
    const cart = await Cart.findOne({code : par.cartCode});
    if (!cart) throw `Cart ${par.cartCode} was not found!`;
    const transaction = await Transaction.create(par);
    if (!transaction) throw `Transaction ${par.cartCode} was not created!`;
    
    return transaction;
  }
}; module.exports = TransactionService;