import { useShippingProviderFactory, UseShippingProviderParams, Context } from '@vue-storefront/core';
import { Shipping, ShippingMethod } from '../types';
import { useCart } from '../useCart';
const params: UseShippingProviderParams<Shipping, ShippingMethod> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingMethod, customQuery}) => {
    const response = await context.$sylius.api.updateCartShipping({ shippingMethod }, customQuery);
    context.cart.setCart(response);
    return response;
  }
};

export const useShippingProvider = useShippingProviderFactory<Shipping, ShippingMethod>(params);
