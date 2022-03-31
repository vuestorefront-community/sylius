import gql from 'graphql-tag';
import { categoryFragment } from './fragments';

export const BaseQuery = gql`
  query categoryList(
    $categorySlug: String,
    $categoryName: String,
  ) {
    taxa(
      translations_slug: $categorySlug
      translations_name: $categoryName
    ){
      collection {
        ${categoryFragment}
        children {
          collection {
            ${categoryFragment}
          }
        }
      }
    }
  }
`;
