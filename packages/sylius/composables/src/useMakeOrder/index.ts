import {
  Context,
  useMakeOrderFactory,
  UseMakeOrderFactoryParams
} from '@vue-storefront/core';
import type { Order, MakeOrderInput } from '@realtainment/sylius-api';
import { useCart } from '../useCart';
const factoryParams: UseMakeOrderFactoryParams<Order> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, { customQuery }) => {
    const order: MakeOrderInput = {
      id: `/api/v2/shop/orders/${context.cart.cart.value.tokenValue}`,
      orderTokenValue: context.cart.cart.value.tokenValue
    };
    return await context.$sylius.api.createOrder({ order }, customQuery);
  }
};

export const useMakeOrder = useMakeOrderFactory<Order>(factoryParams);
