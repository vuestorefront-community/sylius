# `useProduct`

## Features

`useProduct` composable is used for fetching products by search parameters.

## API

* `products: Product[]` - an array of fetched products.
* `loading: boolean` - a reactive object containing information whether products are loading.


### `productsSearch`
function for fetching products based on passed `params: ProductsSearchParams`.

[ProductsSearchParams](https://docs.vuestorefront.io/v2/reference/api/core.productssearchparams.html)


## Getters

* `getId: string`
* `getName: string`
* `getSlug: string`
* `getPrice: AgnosticPrice`
* `getGallery: AgnosticMediaGalleryItem[]`
* `getCoverImage: string`
* `getFiltered: Product[]`
* `getAttributes: Record<string, AgnosticAttribute | string>`
* `getDescription: string`
* `getCategoryIds: string[]`
* `getFormattedPrice: string`
* `getTotalReviews: number`
* `getAverageRating: number`
* `getOptions: any`

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useProduct, productGetters } from '@realtainment/sylius';
export default {
  setup () {
    const { products, search } = useProduct('products');

    onSSR(async () => {
      await search({ slug });
    });

    return {
      products,
      productGetters
    }
  }
};
```
