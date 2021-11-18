import {ClientConfig} from './types';

export const defaultSettings: ClientConfig = {
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
  state: {
    getCartId: () => '',
    setCartId: () => {},
    getCustomerToken: () => '',
    setCustomerToken: () => {},
    getCustomerRefreshToken: () => '',
    setCustomerRefreshToken: () => {},
    getCustomerId: () => '',
    setCustomerId: () => {},
    getStore: () => '',
    setStore: () => {}
  }
};
