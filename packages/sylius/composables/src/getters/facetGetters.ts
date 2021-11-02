import {
  FacetsGetters,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAll = (searchData, criteria?: string[]): AgnosticFacet[] => {
  if (!searchData.data) {
    return [];
  }
  return searchData.data.facets;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getGrouped = (searchData, criteria?: string[]): AgnosticGroupedFacet[] => {
  if (!searchData.data) {
    return [];
  }
  return searchData.data.facets;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSortOptions = (searchData): AgnosticSort => {
  return {
    options: searchData.data ? searchData.data.availableSortingOptions : [],
    selected: searchData?.input?.sort
  };
};

const getCategoryTree = (searchData): AgnosticCategoryTree => {
  const buildTree = (category: any): AgnosticCategoryTree => ({
    label: category.name,
    slug: category.slug,
    items: (Array.isArray(category?.children)) ? category.children.map(cat => buildTree(cat)) : [],
    isCurrent: (category.code === searchData.data?.category?.code)
  });

  if (!searchData.data) {
    return {} as AgnosticCategoryTree;
  }

  return {
    label: 'Root',
    slug: 'root',
    items: searchData.data.categories.map(cat => buildTree(cat)),
    isCurrent: false
  } as AgnosticCategoryTree;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProducts = (searchData): any => {
  if (!searchData || !searchData.data) {
    return [];
  }
  return searchData.data.products;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPagination = (searchData): AgnosticPagination => {
  if (searchData.data) {
    return {
      currentPage: searchData.data.page,
      totalPages: searchData.data.totalPages,
      totalItems: searchData.data.total,
      itemsPerPage: searchData.data.itemsPerPage,
      pageOptions: searchData.data.perPageOptions
    };
  }

  return {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 0,
    pageOptions: []
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBreadcrumbs = (searchData): AgnosticBreadcrumb[] => {
  const category = searchData?.data?.categoriesFlat.find(cat => cat.code === searchData?.data?.category?.code);
  if (category) {
    const breadcrumbs = [
      {text: 'Home', link: '/'}
    ];

    if (category.parent.id !== '/api/v2/shop/taxons/MENU_CATEGORY') {
      breadcrumbs.push({
        text: category.parent.name,
        link: `/c/${category.parent.slug}`
      });
    }

    breadcrumbs.push({
      text: category.name,
      link: `/c/${category.slug}`
    });

    return breadcrumbs;
  }
  return [];
};

export const facetGetters: FacetsGetters<any, any> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};
