import getCategory from '../../src/api/getCategory';
import { defaultSettings } from '../../src/settings';
import { BaseQuery } from '../../src/api/getCategory/queries';

describe('[sylius-api-client] getCategory', () => {
  it('gets categories', async () => {
    const params = {};

    const context = {
      config: defaultSettings,
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual(params);
          expect(query).toEqual(BaseQuery);
          return {
            data: {
              taxa: {
                collection: []
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await getCategory(context, params);
    expect(Array.isArray(result)).toBe(true);
  });
});
