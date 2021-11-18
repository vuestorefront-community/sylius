/* istanbul ignore file */

import {
  Context,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import { OrdersResponse, OrderSearchParams } from '../types';

const params: UseUserOrderFactoryParams<OrdersResponse, OrderSearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params: OrderSearchParams): Promise<OrdersResponse> => {
    const apiState = context.$sylius.config.state;
    const userOrdersResponse = await context.$sylius.api.getUserOrders(apiState.getCustomerId());
    return {
      results: userOrdersResponse,
      total: userOrdersResponse.length
    };
  }
};

export const useUserOrder = useUserOrderFactory<OrdersResponse, OrderSearchParams>(params);
