import ApolloClient from 'apollo-client';
import fetch from 'isomorphic-fetch';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Logger } from '@vue-storefront/core';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import { setContext } from 'apollo-link-context';

export const handleRetry = () => (count, operation, error) => {
  if (count > 3) {
    return false;
  }

  if (error?.result?.message === 'invalid_token') {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    Logger.debug(`Apollo retry-link, the operation (${operation.operationName}) sent with wrong token, creating a new one... (attempt: ${count})`);
    return true;
  }

  return false;
};

const createErrorHandler = () => onError(({
  graphQLErrors,
  networkError
}) => {
  Logger.info('createErrorHandler');
  Logger.debug(graphQLErrors);
  Logger.debug(networkError);

  if (graphQLErrors) {
    graphQLErrors.forEach(({
      message,
      locations,
      path
    }) => {
      if (!message.includes('Resource Owner Password Credentials Grant')) {
        if (!locations) {
          Logger.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
          return;
        }

        const parsedLocations = locations.map(({
          column,
          line
        }) => `[column: ${column}, line: ${line}]`);

        Logger.error(`[GraphQL error]: Message: ${message}, Location: ${parsedLocations.join(', ')}, Path: ${path}`);
      }
    });
  }

  if (networkError) {
    Logger.error(`[Network error]: ${networkError}`);
  }
});

export const apolloLinkFactory = (settings, handlers?: {
    authLink?: ApolloLink;
}) => {
  const baseAuthLink = handlers?.authLink || setContext((apolloReq, { headers }) => ({
    headers: {
      ...headers
    }
  }));
  const httpLink = createHttpLink({ uri: settings.api, fetch });

  const onErrorLink = createErrorHandler();

  const errorRetry = new RetryLink({
    attempts: handleRetry(),
    delay: () => 0
  });

  return ApolloLink.from([onErrorLink, errorRetry, baseAuthLink.concat(httpLink)]);
};

export const authLinkFactory = ({ state, customHeaders }) => setContext((apolloReq, { headers }) => {
  Logger.debug('Apollo authLinkFactory', apolloReq.operationName);

  const token: string = state.getCustomerToken();

  if (token) {
    Logger.debug('Apollo authLinkFactory, finished, token: ', token);
  }

  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...customHeaders
    }
  };
});

export const apolloClientFactory = (customOptions: Record<string, any>) => new ApolloClient({
  cache: new InMemoryCache(),
  ...customOptions
});

export const createSyliusConnection = (settings) => {
  const { state, customHeaders } = settings;
  const authLink = authLinkFactory({ state, customHeaders });

  const apolloLink = apolloLinkFactory(settings, {
    authLink
  });

  return {
    apolloLink
  };
};
