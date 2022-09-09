import { getReviewsQuery } from './queries';
import { addReviewMutation } from './mutations';
import {mutate, query, extendQuery } from '../helpers';
import { CustomQuery } from '@vue-storefront/core';

export const getReviews = async (context, params) => {
  const { productReviews } = await query(context, getReviewsQuery, params);
  return productReviews.collection;
};

export const addReview = async (context, defaultVariables, customQuery?: CustomQuery) => {
  const queryGql = extendQuery(context, addReviewMutation, defaultVariables, customQuery);
  await mutate(context, queryGql);
  return {};
};
