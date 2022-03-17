import {
  applyCouponMutation, addBillingAddressMutation, addShippingAddressMutation,
  createCartMutation, addToCartMutation, clearCartMutation, removeFromCartMutation,
  removeCouponFromCartMutation, updateCartPaymentMutation, updateCartShippingMutation,
  updateCartQuantityMutation
} from './mutations';
import {
  getCartQuery, getPaymentMethodsQuery, getShippingMethodsQuery, getCountriesQuery
} from './queries';
import { CustomQuery } from '@vue-storefront/core';
import {mutate, query, extendQuery, transformCart} from '../helpers';

export const createCart = async (context, customQuery?: CustomQuery) => {
  const { locale } = context.config;
  const defaultVariables = { locale };

  const queryGql = extendQuery(context, createCartMutation, defaultVariables, customQuery);
  const { cart } = await mutate(context, queryGql);
  const cartToken = `/api/v2/shop/orders/${cart.order.tokenValue}`;

  return {
    cartToken
  };
};

export const getCart = async (context, cartId: string, customQuery?: CustomQuery) => {
  const { locale, acceptLanguage } = context.config;
  const variables = {
    cartId,
    locale,
    acceptLanguage
  };
  const queryGql = extendQuery(context, getCartQuery, variables, customQuery);
  const data = await query(context, queryGql, variables);
  return data.order ? transformCart(context, data.order) : {};
};

export const addToCart = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, addToCartMutation, defaultVariables, customQuery);
  const { shop_add_itemOrder } = await mutate(context, queryGql);
  return transformCart(context, shop_add_itemOrder.order);
};

export const updateCartQuantity = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, updateCartQuantityMutation, defaultVariables, customQuery);
  const { shop_change_quantityOrder } = await mutate(context, queryGql);
  return transformCart(context, shop_change_quantityOrder.order);
};

export const removeFromCart = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, removeFromCartMutation, defaultVariables, customQuery);
  const { shop_remove_itemOrder } = await mutate(context, queryGql);
  return transformCart(context, shop_remove_itemOrder.order);
};

export const addCouponToCart = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, applyCouponMutation, defaultVariables, customQuery);
  const { shop_apply_couponOrder } = await mutate(context, queryGql);
  return transformCart(context, shop_apply_couponOrder.order);
};

export const removeCouponFromCart = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, removeCouponFromCartMutation, defaultVariables, customQuery);
  const { shop_remove_couponOrder } = await mutate(context, queryGql);
  return transformCart(context, shop_remove_couponOrder.order);
};

export const clearCart = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, clearCartMutation, defaultVariables, customQuery);
  const { deleteOrder } = await mutate(context, queryGql);
  return deleteOrder.order;
};

export const addAddress = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const query = defaultVariables.addAddressInput?.shippingAddress
    ? addShippingAddressMutation
    : addBillingAddressMutation;
  const queryGql = extendQuery(context, query, defaultVariables, customQuery);
  const data = await mutate(context, queryGql);
  return defaultVariables.addAddressInput?.shippingAddress
    ? data.shop_add_shipping_addressOrder.order
    : data.shop_add_billing_addressOrder.order;
};

export const updateCartPayment = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, updateCartPaymentMutation, defaultVariables, customQuery);
  const { shop_select_payment_methodOrder } = await mutate(context, queryGql);
  return transformCart(context, shop_select_payment_methodOrder.order);
};

export const updateCartShipping = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, updateCartShippingMutation, defaultVariables, customQuery);
  const { shop_select_shipping_methodOrder } = await mutate(context, queryGql);
  return transformCart(context, shop_select_shipping_methodOrder.order);
};

export const getPaymentMethods = async (context) => {
  const { locale } = context.config;
  const { paymentMethods } = await query(context, getPaymentMethodsQuery, {});

  return paymentMethods.collection.map(method => {
    const translation = method.translations.collection.find(translation => translation.locale === locale);
    return {
      label: translation.name,
      value: method.code,
      description: translation.description
    };
  });
};

export const getShippingMethods = async (context, defaultVariables) => {
  const { locale } = context.config;
  const { shippingMethods } = await query(context, getShippingMethodsQuery, defaultVariables);

  return shippingMethods.collection.map(method => {
    const translation = method.translations.collection.find(translation => translation.locale === locale);
    const channel = method.channels.collection[0].code;
    return {
      label: translation.name,
      value: method.code,
      description: translation.description,
      cost: method.configuration[channel].amount / 100
    };
  });
};

export const getCountries = async (context) => {
  const data = await query(context, getCountriesQuery, {});
  return data.countries.collection;
};
