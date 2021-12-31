import {
  Context,
  Logger,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { Category } from '../types';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, { customQuery, ...searchParams }) => {
    try {
      const category = await context.$sylius.api.getCategory(searchParams, customQuery);
      return category;
    } catch (e) {
      Logger.error(e);
    }
    return [];
  }
};

export const useCategory = useCategoryFactory<Category, any>(params);
