import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { Product } from '@realtainment/sylius-api/src/types';

type ProductVariantFilters = any

// TODO: Add interfaces for some of the methods in core
// Product

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductName = (product: Product): string => product.name;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductSlug = (product: Product): string => product.slug;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductPrice = (product: Product): AgnosticPrice => {
  let price = product?.selectedVariant?.channelPricings[0].price;
  if (price) price /= 100;
  return {
    regular: price || 0,
    special: 0
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: Product): AgnosticMediaGalleryItem[] => product?.galleryImages.map((image, i) => ({
  small: (Array.isArray(product?.images) && product?.images?.length) ? product.images[i] : '',
  normal: image,
  big: image
})) || [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCoverImage = (product: Product): string => {
  if (Array.isArray(product?.images) && product?.images?.length) {
    return product.images[0];
  }
  return '';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products: Product[], filters: ProductVariantFilters | any = {}): Product[] => {
  return products.map(product => {
    const filteredVariant = product.variants.filter(variant => {
      const filterVariantOptions = variant.optionValues.filter(optionValue => {
        const attribute = optionValue.option.id.replace('/api/v2/shop/product-options/', '');
        return optionValue.code === filters.attributes[attribute];
      });

      return filterVariantOptions.length === Object.keys(filters.attributes).length;
    });

    if (filteredVariant.length) {
      return {
        ...product,
        selectedVariant: filteredVariant[0]
      };
    }

    return product;
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  const attributes = {};
  const configuration = {};

  const product = Array.isArray(products) ? products[0] : products;

  const options = product.options.map(option => ({
    name: option.code,
    label: option.name,
    value: option.values.map(optionValue => ({
      label: optionValue.value,
      value: optionValue.code
    }))
  }));

  for (const index in options) {
    attributes[options[index].name] = options[index];
  }

  if (!Array.isArray(products) && product.selectedVariant) {
    for (const optionCode in attributes) {
      const filteredVariant = product.selectedVariant.optionValues.filter(variant => variant.option.id === `/api/v2/shop/product-options/${optionCode}`);
      if (filteredVariant.length) configuration[optionCode] = filteredVariant[0].code;
    }
    return configuration;
  }

  return attributes;
};

export const getProductOptions = (product: Product): any => {
  const options = [];

  for (const index in product.options) {
    const filteredVariant = product.selectedVariant.optionValues.filter(variant => variant.option.id === product.options[index].id);
    options.push({
      name: product.options[index].name,
      value: filteredVariant[0].value
    });
  }

  return options;
};

export const getProductDescription = (product: Product): any => (product as any)?.description || '';

export const getProductCategoryIds = (product: Product): string[] => (product as any)?._categoriesRef || '';

export const getProductId = (product: Product): string => (product as any)?._id || '';

export const getFormattedPrice = (price: number) => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductTotalReviews = (product: Product): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAverageRating = (product: Product): number => product.averageRating;

export const productGetters: ProductGetters<Product, ProductVariantFilters> = {
  getName: getProductName,
  getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  getCoverImage: getProductCoverImage,
  getFiltered: getProductFiltered,
  getAttributes: getProductAttributes,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getFormattedPrice: getFormattedPrice,
  getTotalReviews: getProductTotalReviews,
  getAverageRating: getProductAverageRating,
  getOptions: getProductOptions
};
