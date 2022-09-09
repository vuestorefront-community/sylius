
import { useRoute, useRouter } from '@nuxtjs/composition-api';

const nonFilters = ['page', 'sort', 'phrase', 'itemsPerPage'];

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]]
  };
};

const getFiltersDataFromUrl = (query, onlyFilters) => {
  return Object.keys(query)
    .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
    .reduce(reduceFilters(query), {});
};

const getQueryParameter = (item): string => {
  return Array.isArray(item)
    ? item[0]
    : item;
};

const useUiHelpers = () => {
  const route = useRoute();
  const router = useRouter();
  const { query, params } = route.value;

  const getFacetsFromURL = () => {
    return {
      categorySlug: Object.values(params).filter(Boolean).join('/'),
      page: parseInt(getQueryParameter(query.page)) || 1,
      phrase: query.phrase,
      sort: query.sort || 'latest',
      itemsPerPage: parseInt(getQueryParameter(query.itemsPerPage)) || 10
    } as any;
  };

  // eslint-disable-next-line
  const getCatLink = (category): string => {
    return `/c/${category.slug}`;
  };

  // eslint-disable-next-line
  const changeSorting = (sort: string) => {
    router.push({ query: { ...query, sort } });
  };

  // eslint-disable-next-line
  const changeFilters = (filters) => {
    console.warn('[VSF] please implement useUiHelpers.changeFilters.');
  };

  // eslint-disable-next-line
  const changeItemsPerPage = (itemsPerPage: number) => {
    router.push({
      query: {
        ...getFiltersDataFromUrl(query, false),
        itemsPerPage
      }
    });
  };

  // eslint-disable-next-line
  const setTermForUrl = (term: string) => {
    router.push({
      query: {
        ...getFiltersDataFromUrl(query, false),
        phrase: term || undefined
      }
    });
  };

  // eslint-disable-next-line
  const isFacetColor = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetColor.');

    return false;
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');

    return false;
  };

  const getSearchTermFromUrl = () => {
    console.warn('[VSF] please implement useUiHelpers.getSearchTermFromUrl.');
  };

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl
  };
};

export default useUiHelpers;
