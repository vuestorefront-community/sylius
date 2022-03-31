import gql from 'graphql-tag';
import { addressFragment } from '../fragments/address';
import { cartFragment } from '../fragments/cart';

export const createCartMutation = gql`
  mutation createCart(
    $locale: String
  ) {
    cart: shop_postOrder(input: {
      localeCode: $locale
    }) {
      order {
        tokenValue
      }
    }
  }
`;

export const addToCartMutation = gql`
  mutation addToCart(
    $token: String!,
    $variantId: String!,
    $quantity: Int!
  ) {
    shop_add_itemOrder(input: {
      orderTokenValue: $token
      productVariant: $variantId
      quantity: $quantity
    }) {
      order {
        ${cartFragment}
      }
    }
  }
`;

export const removeFromCartMutation = gql`
  mutation removeFromCart(
    $cartId: String!,
    $itemId: String!
  ) {
    shop_remove_itemOrder(input: {
      id: $cartId
      orderItemId: $itemId
    }) {
      order {
        ${cartFragment}
      }
    }
  }
`;

export const clearCartMutation = gql`
  mutation deleteCart(
    $cartId: String!
  ) {
    deleteOrder(input: {
      id: $cartId
    }) {
      order {
        tokenValue
      }
    }
  }
`;

export const addShippingAddressMutation = gql`
  mutation addAddress(
    $addAddressInput: shop_add_shipping_addressOrderInput!
  ) {
    shop_add_shipping_addressOrder(
      input: $addAddressInput
    ){
      order {
        shippingAddress {
          ${addressFragment}
        }
      }
    }
  }
`;

export const addBillingAddressMutation = gql`
  mutation addAddress(
    $addAddressInput: shop_add_billing_addressOrderInput!
  ) {
    shop_add_billing_addressOrder(
      input: $addAddressInput
    ){
      order {
        billingAddress {
          ${addressFragment}
        }
      }
    }
  }
`;

export const applyCouponMutation = gql`
  mutation addCouponToCart(
    $coupon: shop_apply_couponOrderInput!
  ) {
    shop_apply_couponOrder(
      input: $coupon
    ) {
      order {
        ${cartFragment}
      }
    }
  }
`;

export const removeCouponFromCartMutation = gql`
  mutation removeCouponFromCart(
    $removeCouponInput: shop_remove_couponOrderInput!
  ) {
    shop_remove_couponOrder(
      input:$removeCouponInput
    ) {
      order {
        ${cartFragment}
      }
    }
  }
`;

export const updateCartQuantityMutation = gql`
  mutation updateCartQuantity(
    $cartId: String!,
    $itemId: String!,
    $quantity: Int!
  ) {
    shop_change_quantityOrder(input: {
      id: $cartId
      orderItemId: $itemId
      quantity: $quantity
    }) {
      order {
        ${cartFragment}
      }
    }
  }
`;

export const updateCartPaymentMutation = gql`
  mutation updateCartPayment(
    $paymentMethod: shop_select_payment_methodOrderInput!
  ) {
    shop_select_payment_methodOrder(
      input: $paymentMethod
    ) {
      order {
        ${cartFragment}
      }
    }
  }
`;

export const updateCartShippingMutation = gql`
  mutation updateCartShipping(
    $shippingMethod: shop_select_shipping_methodOrderInput!
  ) {
    shop_select_shipping_methodOrder(
      input: $shippingMethod
    ) {
      order {
        ${cartFragment}
      }
    }
  }
`;
