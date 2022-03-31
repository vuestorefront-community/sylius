import { createApiClient } from '../src/index.server';

jest.mock('apollo-client');

describe('[sylius-api-client] setup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates instance for direct connection', () => {
    createApiClient({ api: 'api-config' } as any);
  });

});
