import { CustomQuery } from '@vue-storefront/core';
import { BaseQuery } from './queries';
import { ProductInput } from '../../types';
import { Logger } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(context, params, customQuery?: CustomQuery) {
  const variables: ProductInput = {
    search: params.search ? params.search : null,
    slug: params.slug ? params.slug : null,
    categorySlug: params.categorySlug,
    itemsPerPage: params.itemsPerPage,
    page: params.page,
    orderBy: []
  };

  Logger.info(params);

  if (params.sort) {
    const sortArray = params.sort.split('_');
    const sortObject = {};
    sortObject[sortArray[0]] = sortArray[1];
    variables.orderBy.push(sortObject);
  }

  const { productsQuery } = context.extendQuery(
    customQuery, {
      productsQuery: {
        query: BaseQuery,
        variables
      }
    }
  );

  const { data } = await context.client.query({
    query: productsQuery.query,
    variables: productsQuery.variables,
    fetchPolicy: 'no-cache'
  });

  const { locale } = context.config;

  const pagination = data.products.paginationInfo;
  const products = data.products.collection.map(item => {
    item.attributes = item.attributes.edges
      .map(edges => edges.node)
      .filter(node => node.type === 'integer' || node.localeCode === locale);
    const mapCategories = item.productTaxons.edges.map(edge => edge.node);
    item._categoriesRef = mapCategories.map(cat => cat.taxon.id);
    item.options = item.options.edges.map(edge => {
      edge.node.values = edge.node.values.edges.map(e => e.node);
      return edge.node;
    });
    item.variants = item.variants.collection.map(variant => {
      variant.optionValues = variant.optionValues.edges.map(e => e.node);
      variant.channelPricings = variant.channelPricings.collection;
      return variant;
    });
    item.selectedVariant = item.variants[0];

    const mapImages = item.imagesRef.collection;
    // @todo move image path to config
    item.images = mapImages.map(img => `https://sylius-vsf2.bitbag.shop/media/cache/sylius_shop_product_thumbnail/${img.path}`);
    item.galleryImages = mapImages.map(img => `https://sylius-vsf2.bitbag.shop/media/cache/sylius_shop_product_large_thumbnail/${img.path}`);

    delete item.productTaxons;
    delete item.imagesRef;
    return item;
  });

  return {
    products,
    pagination
  };
}

