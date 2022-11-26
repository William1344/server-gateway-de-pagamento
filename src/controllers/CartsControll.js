const { Cart } = require('../models');

const CartsControll = {
  async index(req, res){
    try {
      const carts = await Cart.find();
      return res.status(200).json(carts);
    } catch (e){
      console.error("Erro Index",e);
      return res.status(400).json({ error: "Erro ao buscar itens!" });
    }
  },

  async create(req, res){
    try {
      const {nome, code, price} = req.body;
      const cart = await Cart.create({code, price, nome});
      if (!cart) return res.status(400).json({ error: "Erro ao atualizar item!" });
      await cart.updateOne({ code, price });
      await cart.save();
      return res.status(201).json(cart); // 201 = Created object no HTTP response
    } catch (e){
      console.error("Erro Create",e);
      return res.status(400).json({ error: "Erro ao criar item!" });
    }
  },

  async update(req, res){
    try {
      const { id }        = req.params;
      const {code, price} = req.body;
      const cart          = await Cart.findById(id);
      return res.status(200).json(cart);
    } catch (e){
      console.error("Erro Update",e);
      return res.status(400).json({ error: "Erro ao atualizar item!" });
    }
  },

  async delete(req, res){
    try {
      const { id } = req.params;
      const cart   = await Cart.findById(id);
      if (!cart) return res.status(400).json({ error: "Erro ao deletar item!" });
      await cart.deleteOne();
      return res.status(200).json({ message: "Item deletado com sucesso!" });
    } catch (e){
      console.error("Erro Delete",e);
      return res.status(400).json({ error: "Erro ao deletar item!" });
    }
  }
}; module.exports = CartsControll;