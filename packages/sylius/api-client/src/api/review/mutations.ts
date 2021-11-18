import gql from 'graphql-tag';

export const addReviewMutation = gql`
  mutation addReview(
    $review: shop_createProductReviewInput!
  ) {
    shop_createProductReview(
      input: $review
    ) {
      clientMutationId
    }
  }
`;
