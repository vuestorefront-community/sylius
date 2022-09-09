import { Context, useFacetFactory, FacetSearchResult, Logger } from '@vue-storefront/core';
const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    let products = [];
    let category = [];
    let categories = [];
    let categoriesFlat = [];
    let pagination = {
      totalCount: 0,
      lastPage: 0,
      itemsPerPage: 0
    };

    try {
      const data = await Promise.all([
        context.$sylius.api.getCategory(params.input),
        context.$sylius.api.getProduct(params.input)
      ]);
      categories = data[0];
      categoriesFlat = categories.reduce((acc, curr) => {
        return acc.concat(curr.children);
      }, categories);
      category = categoriesFlat.find(cat => cat.slug === params.input.categorySlug);

      const {products: loadedProducts, pagination: loadedPagination } = data[1];
      products = loadedProducts;
      pagination = loadedPagination;
    } catch (e) {
      Logger.error(e);
    }

    return {
      products,
      category,
      categories,
      categoriesFlat,
      facets: [],
      page: params.input.page,
      total: pagination.totalCount,
      totalPages: pagination.lastPage,
      availableFilters: [],
      availableSortingOptions: [
        { type: 'sort', id: 'latest', value: 'Latest' },
        { type: 'sort', id: 'oldest', value: 'Oldest' }
      ],
      perPageOptions: [10, 20, 50],
      itemsPerPage: pagination.itemsPerPage
    };
  }
};

export const useFacet = useFacetFactory<any>(factoryParams);
