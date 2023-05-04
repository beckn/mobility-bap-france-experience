export const calculateDays = (_date1, _date2) => {
  const date1 = new Date(_date1);
  const date2 = new Date(_date2);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays + ' days');
  return diffDays;
};
const shouldStopPooling = (responseArr, stopObjectKey) => {
  let shouldStopPolling = true;
  for (const response of responseArr) {
    if (!response.message?.[stopObjectKey]) {
      shouldStopPolling = false;
      break;
    }
  }

  return shouldStopPolling;
};
const helpers = {
  calculateDays,
  shouldStopPooling
};

export const createConfirmOrderRequest = (
  transactionId,
  initResult,
  quoteData,
  cartItem
) => {
  //const params: any = createOrderRequest(transactionId, cart, shippingAddress, billingAddress, shippingAsBilling, gps);
  const item = {
    id: initResult.items[0].id,
    bpp_id: cartItem[0].bpp_id,
    fulfillment_id: initResult.fulfillment.id,
    quantity: {
      count: 1
    },
    descriptor: quoteData.items[0].descriptor,
    price: {
      currency: 'INR',
      value: '100.0'
    },
    category_id: initResult.items[0].category_id,
    provider: {
      id: initResult.provider.id,
      locations: ['E1']
    }
  };
  const billAddress = {
    door: 'MBT',
    country: 'IND',
    city: 'Bengaluru',
    area_code: '560078',
    state: 'Karnataka',
    building: 'A33',
    name: '',
    locality: ''
  };
  const params = [
    {
      context: {
        transaction_id: transactionId,
        bpp_id: cartItem[0].bpp_id,
        bpp_uri: cartItem[0].bpp_uri
      },
      message: {
        items: [item],
        billing_info: {
          address: billAddress,
          phone: '9867654322',
          name: 'RajatKumar',
          email: 'er.rjtkumar@gmail.com'
        },
        delivery_info: {
          type: 'HOME-DELIVERY',
          // name: "./Rajat//Kumar///",
          name: './Rajat//Kumar///',
          phone: '9867654322',
          email: 'er.rjtkumar@gmail.com',
          location: {
            address: {
              name: './Rajat//Kumar///',
              locality: 'Bengaluru',
              door: 'MBT',
              country: 'IND',
              city: 'Bengaluru',
              street: 'Bengaluru, Bangalore Urban, Karnataka',
              area_code: '560078',
              state: 'Karnataka',
              building: 'A33'
            },
            gps: '12.9063433,77.5856825'
          }
        },

        payment: {
          paid_amount: '100.0',
          currency: 'INR',
          status: 'PAID',
          transaction_id: transactionId
        }
      }
    }
  ];

  return params;
};
export const createInitOrderRequest = (
  transactionId,
  quoteData,
  cartItem,
  gps
) => {
  const params = [
    {
      context: {
        transaction_id: transactionId,
        bpp_id: cartItem[0].bpp_id,
        bpp_uri: cartItem[0].bpp_uri
      },
      message: {
        items: [
          {
            id: quoteData.items[0].id,
            bpp_id: cartItem[0].bpp_id,
            fulfillment_id: quoteData.provider.items[0].fulfillment_id,
            descriptor: quoteData.items[0].descriptor,
            price: quoteData.quote.price,
            category_id: quoteData.provider.items[0].category_id,
            provider: {
              id: quoteData.provider.id,
              locations: [quoteData.provider.locations[0].id]
            }
          }
        ],
        billing_info: {
          address: {
            door: 'MBT',
            country: 'IND',
            city: 'Bengaluru',
            area_code: '560078',
            state: 'Karnataka',
            building: 'A33',
            name: '',
            locality: ''
          },
          phone: '9867654322',
          name: 'RajatKumar',
          email: 'er.rjtkumar@gmail.com'
        },
        delivery_info: {
          type: 'HOME-DELIVERY',
          name: './Rajat//Kumar///',
          phone: '9867654322',
          email: 'er.rjtkumar@gmail.com',
          location: {
            address: {
              name: './Rajat//Kumar///',
              locality: 'Bengaluru',
              door: 'MBT',
              country: 'IND',
              city: 'Bengaluru',
              street: 'Bengaluru, Bangalore Urban, Karnataka',
              area_code: '560078',
              state: 'Karnataka',
              building: 'A33'
            },
            gps: gps
          }
        }
      }
    }
  ];
  return params;
};
/**
 * Checks each object in the array if data present or not. If data is present in all of the objects,
 * then the UI should stop polling for data and so the function will return true or else will return false
 * and UI should continue polling the data.
 * @param responseArr Response array received from the api call
 * @param stopObjectKey the 'key' of the object which we need to check for value present or not
 * @returns true if all the objects have data or else false
 */

export default helpers
