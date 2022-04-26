# `useReview`

## Features

`useReview` composable is used for adding and fetching reviews by search parameters.

## API

* `reviews: Review[]` - an array of fetched reviews.
* `loading: boolean` - a reactive object containing information whether reviews are loading.
* `error: UseReviewErrors` - a map of errors per method

[Review](../api-client/sylius-api.review.md)

### `search`
function for fetching reviews based on passed `params`.

### `addReview`
function for adding a review.


## Getters

* `getItems: ReviewItem[]`
* `getReviewId: string`
* `getReviewAuthor: string`
* `getReviewRating: number`
* `getReviewDate: string`
* `getTotalReviews: number`
* `getAverageRating: number`
* `getRatesCount: AgnosticRateCount[]`
* `getReviewsPage: number`

[AgnosticRateCount](https://docs.vuestorefront.io/v2/reference/api/core.agnosticratecount.html)

## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useReview, reviewGetters } from '@realtainment/sylius';
export default {
  setup () {
    const { reviews, search } = useReview();

    onSSR(async () => {
      await search({ productId: 123 });
    });

    return {
      reviews,
      reviewGetters
    }
  }
};
```
