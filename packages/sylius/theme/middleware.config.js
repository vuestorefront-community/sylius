module.exports = {
  integrations: {
    sylius: {
      location: '@realtainment/sylius-api/server',
      configuration: {
        api: 'https://sylius-vsf2.bitbag.shop/api/v2/graphql',
        acceptLanguage: ['en', 'de'],
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
        }
      }
    }
  }
};
