import {
  Context,
  useProductFactory,
  ProductsSearchParams,
  UseProductFactoryParams,
  Logger
} from '@vue-storefront/core';
import { ProductsResponse } from '../types';
const params: UseProductFactoryParams<ProductsResponse, any> = {
  productsSearch: async (context: Context, params: ProductsSearchParams): Promise<ProductsResponse> => {
    const { customQuery, ...searchParams } = params;
    try {
      return await context.$sylius.api.getProduct(searchParams, customQuery);
    } catch (e) {
      Logger.error(e);
    }
  }
};

export const useProduct = useProductFactory<ProductsResponse, any>(params);
