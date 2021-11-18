import { BaseQuery } from './queries';

export default async function getCategory(context, params) {
  const { data } = await context.client.query({
    query: BaseQuery,
    variables: params
  });

  const categories = data.taxa.collection.map(cat => {
    cat.children = cat.children.collection;
    return cat;
  });

  return categories;
}
