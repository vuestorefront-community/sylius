import {
  Context,
  Logger,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { Category } from '../types';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, params) => {
    try {
      const category = await context.$sylius.api.getCategory(params);
      return category;
    } catch (e) {
      Logger.error(e);
    }
    return [];
  }
};

export const useCategory = useCategoryFactory<Category, any>(params);
