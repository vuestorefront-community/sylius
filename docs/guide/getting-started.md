# Getting started

After cloning the project, the `middleware.config.js` file located in the theme folder needs to be updated.
By default it will point to our demo shop.

## Middleware configuration

You can read more about middleware configuration in Vue Storefront [here](https://docs.vuestorefront.io/v2/architecture/server-middleware.html).

```js
module.exports = {
  integrations: {
    sylius: {
      location: '@realtainment/sylius-api/server',
      configuration: {
        api: 'YOUR SYLIUS GRAPHQL URL',
        locale: 'en_US',
        cookies: {
          currencyCookieName: 'vsf-currency',
          countryCookieName: 'vsf-country',
          localeCookieName: 'vsf-locale',
          cartCookieName: 'vsf-cart',
          customerCookieName: 'vsf-customer',
          customerRefreshCookieName: 'vsf-customer-token',
          customerIdCookieName: 'vsf-customer-id',
          storeCookieName: 'vsf-store'
        },
        imagePaths: {
          thumbnail: 'https://sylius-vsf2.bitbag.shop/media/cache/sylius_shop_product_thumbnail',
          regular: 'https://sylius-vsf2.bitbag.shop/media/cache/sylius_shop_product_large_thumbnail'
        },
        customHeaders: {}
      }
    }
  }
};
```

### `api`

URL path to GraphQL endpoint in Sylius.

### `locale`

Default locale value used in some GraphQL mutations.

### `imagePaths`

- `thumbnail`: URL path to thumbnail image - used in cart, listing page
- `regular`: URL path to regular image - used in product detail page

### `customHeaders`

Custom HTTP headers that are passed to GraphQL endpoint.
Example:
```js
customHeaders: {
  'X-FORWARDED-HOST': 'URL'
}
```

## Commands

### `yarn build:sylius`

Builds whole project: `api-client`, `composables`, `theme`.

### `yarn start:sylius`

Runs the project in production mode.

### `yarn dev:sylius`

Runs the project in development mode - (`composables` and `theme` are hot-reloading)

### `yarn test:sylius`

Runs the Jest tests for `api-client`.
