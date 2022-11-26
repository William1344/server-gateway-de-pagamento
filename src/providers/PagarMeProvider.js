

const PagarMeProvider = {
  process : async (par) => {
    const billetParams = {
      payment_method  : 'boleto',
      amount          : par.total * 100,
      installments    : 1,
    }

    const creditCardParams = {
      payment_method        : 'credit_card',
      amount                : par.total * 100,
      installments          : par.installments,
      card_number           : par.creditCardNumber.replace(/[^?0-9]/g, ""),
      card_expiration_date  : par.creditCardExppiration.replace(/[^?0-9]/g, ""),
      card_cvv              : par.creditCardCvv,
      capture               : true,
    };
    
    let paymentParams;

    switch (par.paymentType) {
      case 'credit_card':
        paymentParams = creditCardParams;
        break;
      case 'billet':
        paymentParams = billetParams;
        break;
      default:
        throw `Payment type ${par.paymentType} is not supported!`;
    }

    const customerParams = {
      customer : {
        external_id : par.customerDocument,
        name        : par.customerName,
        email       : par.customerEmail,
        type        : cpf.isValid(par.customerDocument) ? 'individual' : 'corporation',
        country     : 'br',
        phone_numbers : par.customerMobile.replace(/[^?0-9]/g, "")
      }
    }

    const billingParams = par.billingAddress ? 
      {
        name       : par.customerName,
        address    : {
          country       : 'br',
          state         : par.billingState,
          city          : par.billingCity,
          neighborhood  : par.billingNeighborhood,
          street        : par.billingAddress,
          street_number : par.billingNumber,
          zipcode       : par.billingZipcode
        }
      }: {}
    
    const itemsParams = items && items.length > 0 ? 
      {
        items : items.map(item => ({
          id: item?.id.toString(),
          title: item?.name,
          unit_price: item?.amount * 100,
          quantity: item?.quantity || 1,
          tangible: true 
        }))
      } : {
        items : [{
          id: par.cartCode,
          title: 'Cart',
          unit_price: par.total * 100,
          quantity: 1,
          tangible: false
        }]
      }

    const transactionParams = {
      async : false,
      // postback_url : 'https://requestb.in/1g8qz1g1',
    }
  }
} ; module.exports = PagarMeProvider;