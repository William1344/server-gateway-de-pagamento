const { Cart, Transaction }   = require('../models');
const { TransactionService }  = require('../services');
const parsePhone              = require('libphonenumber-js'); 
const { cpf, cnpj}            = require('cpf-cnpj-validator');
const Yup                     = require('yup');
const v4        = require('uuid');


const TransactionsControll = {
  async create(req, res) {
    try {
      const {
        cartCode,
        paymentType,
        installments,
        customerName,
        customerEmail,
        customerMobile,
        customerDocument,
        billingAddress,
        billingNumber,
        billingNeighborhood,
        billingCity,
        billingState,
        billingZipcode,
        creditCardNumber,
        creditCardExppiration,
        creditCardHolderName,
        creditCardCvv,
      } = req.body;

      const schema = Yup.object({
        cartCode      : Yup.string().required(),
        paymentType   : Yup.mixed().oneOf(['credit_card', 'billet']),
        installments  : Yup.number()
          .min(1)
          .when('paymentType', 
            (paymentType, schema) => paymentType === 'credit_card' ? schema.max(12) : schema.max(1)
        ),
        customerName        : Yup.string().required().min(3),
        customerEmail       : Yup.string().required().email(),
        customerMobile      : Yup.string().required()
          .test("is-valid-phone", "${path} is not a valid phone number", value => 
            parsePhone(value, "BR").isValid()
          ),
        customerDocument    : Yup.string().required()
          .test("is-valid-document", "${path} is not a valid document CPF/CNPJ", 
            value => cpf.isValid(value) || cnpj.isValid(value)
          ),
        billingAddress      : Yup.string().required(),
        billingNumber       : Yup.string().required(),
        billingNeighborhood : Yup.string().required(),
        billingCity         : Yup.string().required(),
        billingState        : Yup.string().required().min(2).max(2),
        billingZipcode      : Yup.string().required().min(8).max(8),
        creditCardNumber    : Yup.string().when(
          'paymentType', 
          (paymentType, schema) => paymentType === 'credit_card' ? schema.required() : schema
        ),
        creditCardExppiration : Yup.string().when(
          'paymentType',
          (paymentType, schema) => paymentType === 'credit_card' ? schema.required() : schema
        ),
        creditCardHolderName : Yup.string().when(
          'paymentType',
          (paymentType, schema) => paymentType === 'credit_card' ? schema.required() : schema
        ),
        creditCardCvv : Yup.string().when(
          'paymentType',
          (paymentType, schema) => paymentType === 'credit_card' ? schema.required() : schema
        ),
          

      })

      if(!(await schema.isValid(req.body))){
        return res.status(400).json({ error: "Erro de validação!" });
      }
      const cart = await Cart.findOne({ code: cartCode });
      if(!cart) return res.status(404).json({ error: "Cart not found!" });

      // 1 - Criar o transaction.(registre a transação)
      // 

      return res.status(200).json({ message: "Transação criada com sucesso!" });
    } catch (e) {
      console.error("Erro Create", e);
      return res.status(400).json({ error: "Erro ao criar item!" });
    }
  },
}; 

module.exports = TransactionsControll;

/*
{
  "cartCode": "123456789",
  "paymentType": "credit_card",
  "installments": 1,
  "customerName": "João da Silva",
  "customerEmail": "joaounip@gmail.com",
  "customerMobile": "11999999999",
  "customerDocument": "12345678900",
  "billingAddress": "Rua dos Bobos",
  "billingNumber": "0",
  "billingNeighborhood": "Bairro dos Bobos",
  "billingCity": "São Paulo",
  "billingState": "SP",
  "billingZipcode": "00000000",
  "creditCardNumber": "4111111111111111",
  "creditCardExppiration": "12/2021",
  "creditCardHolderName": "João da Silva",
  "creditCardCvv": "123"
}*/