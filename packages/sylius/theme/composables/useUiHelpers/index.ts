import { AgnosticCategoryTree, AgnosticFacet } from '@vue-storefront/core';
import { getInstance } from '~/helpers/hooks/getInstance';

const nonFilters = ['page', 'sort', 'term', 'itemsPerPage'];

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]]
  };
};

const getFiltersDataFromUrl = (context, onlyFilters) => {
  const { query } = context.$router.currentRoute;

  return Object.keys(query)
    .filter((f) => (onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f)))
    .reduce(reduceFilters(query), {});
};

const useUiHelpers = () => {
  const instance = getInstance();

  const getFacetsFromURL = () => {
    const { query, params } = instance.$router.currentRoute;

    const categorySlugs = [params.slug_1];
    if (params.slug_2) categorySlugs.push(params.slug_2);
    if (params.slug_3) categorySlugs.push(params.slug_3);

    return {
      categorySlug: categorySlugs.join('/'),
      filters: getFiltersDataFromUrl(instance, true),
      itemsPerPage: Number.parseInt(query.itemsPerPage, 10) || 20,
      page: Number.parseInt(query.page, 10) || 1,
      sort: query.sort || '',
      term: query.term
    };
  };

  const changeSearchTerm = (term: string) => term;

  const getSearchTermFromUrl = () => {
    const { query } = instance.$router.history.current;

    return {
      page: parseInt(query.page, 10) || 1,
      sort: query.sort || '',
      filters: getFiltersDataFromUrl(instance, true),
      itemsPerPage: parseInt(query.itemsPerPage, 10) || 20,
      term: query.term
    };
  };

  const getCatLink = (category): string => `/c/${category.slug}`;

  const getAgnosticCatLink = (category: AgnosticCategoryTree): string => `/c${category.slug}`;

  const changeSorting = (sort: string) => {
    const { query } = instance.$router.history.current;
    instance.$router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters: any) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        ...filters
      }
    });
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        itemsPerPage
      }
    });
  };

  const setTermForUrl = (term: string) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        term: term || undefined
      }
    });
  };

  const isFacetColor = (facet: AgnosticFacet): boolean => facet.id === 'color';

  const isFacetCheckbox = (): boolean => false;

  return {
    getFacetsFromURL,
    getCatLink,
    getAgnosticCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl,
    changeSearchTerm
  };
};

export default useUiHelpers;
