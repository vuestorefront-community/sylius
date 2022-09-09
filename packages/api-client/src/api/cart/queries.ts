import gql from 'graphql-tag';
import {cartFragment} from '../fragments/cart';

export const getCartQuery = gql`
  query getCart($cartId: ID!) {
    order(id: $cartId) {
      ${cartFragment}
    }
  }
`;

export const getShippingMethodsQuery = gql`
  query getShippingMethods(
    $zone: String
  ) {
    shippingMethods(
      enabled: true,
      zone_members_code: $zone
    ) {
      collection {
        code
        calculator
        configuration
        translations {
          collection {
            name
            description
            locale
          }
        }
        channels {
          collection {
            code
          }
        }
      }
    }
  }
`;

export const getPaymentMethodsQuery = gql`
  query getPaymentMethods {
    paymentMethods(
      enabled: true
    ) {
      collection {
        code
        translations {
          collection {
            name
            description
            locale
          }
        }
        channels {
          collection {
            code
          }
        }
      }
    }
  }
`;

export const getCountriesQuery = gql`
  query getCountries {
    countries {
      collection {
        key: code
        enabled
        label: name
      }
    }
  }
`;

