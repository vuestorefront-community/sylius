import getProduct from '../../src/api/getProduct';
import { defaultSettings } from '../../src/settings';
import { BaseQuery } from '../../src/api/getProduct/queries';

describe('[sylius-api-client] getProduct', () => {
  it('fetches products', async () => {
    const params = {
      page: 1,
      itemsPerPage: 20,
      orderBy: [
        { createdAt: 'ASC' }
      ],
      slug: 'test',
      search: 'test',
      categorySlug: 'test'
    };

    const context = {
      config: defaultSettings,
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual(params);
          expect(query).toEqual(BaseQuery);
          return {
            data: {
              products: {
                collection: [
                  {
                    attributes: { edges: [
                      {
                        node: {}
                      }
                    ]},
                    productTaxons: { edges: []},
                    options: { edges: [
                      {
                        node: {
                          values: { edges: []}
                        }
                      }
                    ]},
                    variants: { collection: [
                      {
                        optionValues: { edges: []},
                        channelPricings: { collection: []}
                      }
                    ]},
                    imagesRef: { collection: []}
                  }
                ]
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const { products } = await getProduct(context, {
      ...params,
      sort: 'createdAt_ASC'
    });
    expect(Array.isArray(products)).toBe(true);
  });
});
