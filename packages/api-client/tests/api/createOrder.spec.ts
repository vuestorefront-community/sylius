import createOrder from '../../src/api/createOrder';
import { defaultSettings } from '../../src/settings';
import createOrderMutation from '../../src/api/createOrder/mutations';

describe('[sylius-api-client] createOrder', () => {
  it('creates new order', async () => {
    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual({
            locale: defaultSettings.locale
          });
          expect(mutation).toEqual(createOrderMutation);
          return {
            data: {
              shop_completeOrder: { order: {}}
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await createOrder(context, { locale: defaultSettings.locale });
    expect(result).toStrictEqual({ });
  });
});
