import { integrationPlugin } from '@vue-storefront/core';
import { mapConfigToSetupObject } from '@realtainment/sylius/nuxt/helpers';
const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

const defaultConfig = {
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
};

export default integrationPlugin(({ app, integration }) => {
  const cartCookieName = moduleOptions.cookies?.cartCookieName || defaultConfig.cookies.cartCookieName;
  const customerCookieName = moduleOptions.cookies?.customerCookieName || defaultConfig.cookies.customerCookieName;
  const customerRefreshCookieName = moduleOptions.cookies?.customerRefreshCookieName || defaultConfig.cookies.customerRefreshCookieName;
  const customerIdCookieName = moduleOptions.cookies?.customerIdCookieName || defaultConfig.cookies.customerIdCookieName;

  const getCartId = () => app.$cookies.get(cartCookieName);
  const setCartId = (id) => {
    if (!id) {
      app.$cookies.remove(cartCookieName);
      return;
    }
    app.$cookies.set(cartCookieName, id);
  };

  const getCustomerToken = () => app.$cookies.get(customerCookieName);
  const setCustomerToken = (token) => {
    if (!token) {
      app.$cookies.remove(customerCookieName);
      return;
    }
    app.$cookies.set(customerCookieName, token);
  };

  const getCustomerRefreshToken = () => app.$cookies.get(customerRefreshCookieName);
  const setCustomerRefreshToken = (token) => {
    if (!token) {
      app.$cookies.remove(customerRefreshCookieName);
      return;
    }
    app.$cookies.set(customerRefreshCookieName, token);
  };

  const getCustomerId = () => app.$cookies.get(customerIdCookieName);
  const setCustomerId = (id) => {
    if (!id) {
      app.$cookies.remove(customerIdCookieName);
      return;
    }
    app.$cookies.set(customerIdCookieName, id);
  };

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app,
    additionalProperties: {
      state: {
        getCartId,
        setCartId,
        getCustomerToken,
        setCustomerToken,
        setCustomerRefreshToken,
        getCustomerRefreshToken,
        getCustomerId,
        setCustomerId
      }
    }
  });

  integration.configure('sylius', settings);
});
