import {
  Context,
  useMakeOrderFactory,
  UseMakeOrderFactoryParams
} from '@vue-storefront/core';
import type { Order } from '@realtainment/sylius-api';
import { useCart } from '../useCart';
const factoryParams: UseMakeOrderFactoryParams<Order> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, { customQuery }) => {
    const apiState = context.$sylius.config.state;
    const order = {
      id: `/api/v2/shop/orders/${context.cart.cart.value.tokenValue}`,
      orderTokenValue: context.cart.cart.value.tokenValue
    };
    const makeOrderResponse = await context.$sylius.api.createOrder({ order }, customQuery);
    apiState.setCartId(null);
    context.cart.load({ customQuery });
    return makeOrderResponse;
  }
};

export const useMakeOrder = useMakeOrderFactory<Order>(factoryParams);
