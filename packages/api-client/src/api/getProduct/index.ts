import { CustomQuery } from '@vue-storefront/core';
import { BaseQuery } from './queries';
import gql from 'graphql-tag';

type ProductSort = {
  createdAt: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function getProduct(context, params, customQuery?: CustomQuery) {
  if (params.sort) {
    const sortObject = {} as ProductSort;

    switch (params.sort) {
      case 'latest':
        sortObject.createdAt = 'DESC';
        break;
      case 'oldest':
        sortObject.createdAt = 'ASC';
        break;
    }
  }

  let pagination = {};
  let products = [];

  try {
    const { productsQuery } = context.extendQuery(
      customQuery,
      {
        productsQuery: {
          query: BaseQuery,
          variables: params
        }
      }
    );

    const { data } = await context.client.query({
      query: gql`${productsQuery.query}`,
      variables: productsQuery.variables,
      fetchPolicy: 'no-cache'
    });

    const { locale, imagePaths } = context.config;
    pagination = data.products.paginationInfo;
    products = data.products.collection.map(item => {
      if (item.attributes) {
        item.attributes = item.attributes.edges
          .map(edges => edges.node)
          .filter(node => node.type === 'integer' || node.localeCode === locale);
      }

      if (item.productTaxons) {
        const mapCategories = item.productTaxons.edges.map(edge => edge.node);
        item._categoriesRef = mapCategories.map(cat => cat.taxon.id);
        delete item.productTaxons;
      }

      if (item.options) {
        item.options = item.options.edges.map(edge => {
          edge.node.values = edge.node.values.edges.map(e => e.node);
          return edge.node;
        });
      }

      if (item.variants) {
        item.variants = item.variants.collection.map(variant => {
          variant.optionValues = variant.optionValues.edges.map(e => e.node);
          if (variant.channelPricings) {
            variant.channelPricings = variant.channelPricings.collection;
          }
          return variant;
        });
      }
      item.selectedVariant = item?.variants?.length ? item.variants?.[0] : null;

      if (item.imagesRef) {
        const mapImages = item.imagesRef.collection;
        item.images = mapImages.map(img => [imagePaths.thumbnail, img.path].join('/'));
        item.galleryImages = mapImages.map(img => [imagePaths.regular, img.path].join('/'));
        delete item.imagesRef;
      }
      return item;
    });
  } catch (err) {
    console.log('Sylius getProduct error', err);
  }

  return {
    products,
    pagination
  };
}

