import { useShippingFactory, UseShippingParams, Context } from '@vue-storefront/core';
import { Address } from '../types';
import { useCart } from '../useCart';
const params: UseShippingParams<Address, any> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    if (!context.cart.cart?.value) await context.cart.load({ customQuery });
    return {
      ...context.cart.cart.value.shippingAddress,
      state: ''
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingDetails, customQuery }) => {
    const apiState = context.$sylius.config.state;
    const currentCartId = apiState.getCartId();
    const addAddressInput = {
      orderTokenValue: currentCartId.replace('/api/v2/shop/orders/', ''),
      email: shippingDetails.email,
      shippingAddress: {
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
        countryCode: shippingDetails.countryCode,
        street: shippingDetails.street,
        city: shippingDetails.city,
        postcode: shippingDetails.postcode,
        phoneNumber: shippingDetails.phoneNumber
      }
    };
    await context.$sylius.api.addAddress({ addAddressInput }, customQuery);
    return shippingDetails;
  }
};

export const useShipping = useShippingFactory<Address, any>(params);
