module.exports = {
  integrations: {
    sylius: {
      location: '@vue-storefront/sylius-api/server',
      configuration: {
        cookies: {
          currencyCookieName: 'vsf-currency',
          countryCookieName: 'vsf-country',
          localeCookieName: 'vsf-locale',
          cartCookieName: 'vsf-cart',
          customerCookieName: 'vsf-customer',
          customerRefreshCookieName: 'vsf-customer-token',
          customerIdCookieName: 'vsf-customer-id',
          storeCookieName: 'vsf-store'
        }
      }
    }
  }
};
