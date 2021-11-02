import gql from 'graphql-tag';
import { reviewFragment } from '../fragments/review';

export const getReviewsQuery = gql`
  query productReviews(
    $productId: Int,
    $userId: Int
  ) {
    productReviews(
      reviewSubject_id: $productId,
      author_id: $userId
    ) {
      collection {
        ${reviewFragment}
      }
    }
  }
`;
