import { createApiClient } from '../src/index.server';

jest.mock('apollo-client');

export default createApiClient({
  api: {} as any,
  locale: 'en',
  acceptLanguage: ['en', 'de'],
  currency: 'USD',
  country: 'UK',
  cookies: {
    currencyCookieName: 'test-vsf-currency',
    countryCookieName: 'test-vsf-country',
    localeCookieName: 'test-vsf-locale'
  },
  auth: {
    onTokenChange: jest.fn(),
    onTokenRemove: jest.fn()
  }
} as any);
