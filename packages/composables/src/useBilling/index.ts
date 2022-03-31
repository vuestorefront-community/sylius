import {
  Context,
  useBillingFactory,
  UseBillingParams
} from '@vue-storefront/core';
import type { BillingAddress } from '@realtainment/sylius-api';
import type {
  UseBillingAddParams as AddParams
} from '../types';
import { useCart } from '../useCart';
const params: UseBillingParams<BillingAddress, AddParams> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    if (!context.cart.cart?.value) await context.cart.load({ customQuery });
    return {
      ...(context.cart.cart.value ? context.cart.cart.value.billingAddress : {}),
      state: ''
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, params) => {
    const apiState = context.$sylius.config.state;
    const currentCartId = apiState.getCartId();
    const billingDetails = params.billingDetails as any;
    const addAddressInput = {
      orderTokenValue: currentCartId.replace('/api/v2/shop/orders/', ''),
      email: billingDetails.email,
      billingAddress: {
        firstName: billingDetails.firstName,
        lastName: billingDetails.lastName,
        countryCode: billingDetails.countryCode,
        street: billingDetails.street,
        city: billingDetails.city,
        postcode: billingDetails.postcode,
        phoneNumber: billingDetails.phoneNumber
      }
    };
    const addAddressResponse = await context.$sylius.api.addAddress({ addAddressInput });
    return addAddressResponse.billingAddress;
  }
};

export const useBilling = useBillingFactory<BillingAddress, AddParams>(params);
