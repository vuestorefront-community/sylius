import gql from 'graphql-tag';
import { customerFragment } from '../fragments/customer';
import { addressFragment } from '../fragments/address';

export const getUserQuery = gql`
  query getUser(
    $id: ID!
  ) {
    customer (
      id: $id
    ) {
      ${customerFragment}
    }
  }
`;

export const getUserAddressesQuery = gql`
  query getUserAddresses {
    addresses {
      collection {
        ${addressFragment}
      }
    }
  }
`;

export const getUserOrdersQuery = gql`
  query getCustomerOrders(
    $id: ID!
  ) {
    customer (
      id: $id
    ) {
      orders {
        edges {
          node {
            id
            number
            total
            paymentState
            shippingState
            shippingTotal
            createdAt
            payments {
              edges {
                node {
                  id
                  state
                  method {
                    code
                  }
                }
              }
            }
            items {
              edges {
                node {
                  id
                  total
                  productName
                  quantity
                  variant {
                    code
                    product {
                      _id
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

