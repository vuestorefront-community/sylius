export const defaultSettings = {
  locale: null,
  acceptLanguage: null,
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
