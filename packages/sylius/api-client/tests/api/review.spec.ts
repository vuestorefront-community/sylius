import { getReviews, addReview } from '../../src/api/review';
import { getReviewsQuery } from '../../src/api/review/queries';
import { addReviewMutation } from '../../src/api/review/mutations';
import { defaultSettings } from '../../src/settings';

describe('[sylius-api-client] reviews', () => {
  it('gets reviews', async () => {
    const params = {};

    const context = {
      config: defaultSettings,
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual(params);
          expect(query).toEqual(getReviewsQuery);
          return {
            data: {
              productReviews: {
                collection: []
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await getReviews(context, params);
    expect(Array.isArray(result)).toBe(true);
  });

  it('adds a review', async () => {
    const defaultVariables = {
    };

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(addReviewMutation);
          return { };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await addReview(context, defaultVariables);
    expect(result).toStrictEqual({});
  });
});
