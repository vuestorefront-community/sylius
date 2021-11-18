import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core';
import { apolloClientFactory, createSyliusConnection } from './apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { defaultSettings } from './settings';
import { Config, ClientInstance } from './types';
import * as api from './api';
import ApolloClient from 'apollo-client';

const onCreate = (settings: Config): { config: Config, client: ClientInstance} => {
  const config = {
    ...defaultSettings,
    ...settings,
    state: settings.state || defaultSettings.state
  };

  if (settings.client) {
    return {
      client: settings.client,
      config
    };
  }

  if (settings.customOptions && settings.customOptions.link) {
    return {
      client: new ApolloClient({
        cache: new InMemoryCache(),
        ...settings.customOptions
      }),
      config
    };
  }

  const { apolloLink } = createSyliusConnection(config);

  const client = apolloClientFactory({
    link: apolloLink,
    cache: new InMemoryCache(),
    ...settings.customOptions
  });

  return {
    config,
    client
  };
};

const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',
  hooks: (req, res) => ({
    beforeCreate: ({ configuration }) => {
      const cartCookieName = configuration.cookies?.cartCookieName || defaultSettings.cookies.cartCookieName;
      const customerCookieName = configuration.cookies?.customerCookieName || defaultSettings.cookies.customerCookieName;
      const customerRefreshCookieName = configuration.cookies?.customerRefreshCookieName || defaultSettings.cookies.customerRefreshCookieName;
      const customerIdCookieName = configuration.cookies?.customerIdCookieName || defaultSettings.cookies.customerIdCookieName;
      const storeCookieName = configuration.cookies?.storeCookieName || defaultSettings.cookies.storeCookieName;

      return {
        ...configuration,
        state: {
          getCartId: () => req.cookies[cartCookieName],
          setCartId: (id) => {
            if (!id) {
              req.cookies[cartCookieName];
              return;
            }
            res.cookie(cartCookieName, JSON.stringify(id));
          },
          getCustomerToken: () => req.cookies[customerCookieName],
          setCustomerToken: (token) => {
            if (!token) {
              delete req.cookies[customerCookieName];
              return;
            }
            res.cookie(customerCookieName, JSON.stringify(token));
          },
          getCustomerRefreshToken: () => req.cookies[customerRefreshCookieName],
          setCustomerRefreshToken: (token) => {
            if (!token) {
              delete req.cookies[customerRefreshCookieName];
              return;
            }
            res.cookie(customerRefreshCookieName, JSON.stringify(token));
          },
          getCustomerId: () => req.cookies[customerIdCookieName],
          setCustomerId: (id) => {
            if (!id) {
              delete req.cookies[customerIdCookieName];
              return;
            }
            res.cookie(customerCookieName, JSON.stringify(id));
          },
          getStore: () => req.cookies[storeCookieName],
          setStore: (id) => {
            if (!id) {
              delete req.cookies[storeCookieName];
              return;
            }
            res.cookie(storeCookieName, JSON.stringify(id));
          }
        }
      };
    }
  })
};

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api,
  extensions: [tokenExtension]
});

export {
  createApiClient
};
