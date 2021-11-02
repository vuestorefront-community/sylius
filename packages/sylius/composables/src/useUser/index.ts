/* istanbul ignore file */

import {
  Context,
  Logger,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { User } from '../types';
import { useCart } from '../useCart';
const params: UseUserFactoryParams<User, any, any> = {
  provide() {
    return {
      cart: useCart()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    const apiState = context.$sylius.config.state;
    const customerId = apiState.getCustomerId();
    if (customerId) {
      try {
        return await context.$sylius.api.getUser(customerId);
      } catch (e) {
        Logger.error(e);
      }
    }
    return null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    const apiState = context.$sylius.config.state;
    apiState.setCustomerToken(null);
    apiState.setCustomerRefreshToken(null);
    apiState.setCustomerId(null);
    apiState.setCartId(null);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData, customQuery }) => {
    const apiState = context.$sylius.config.state;
    return await context.$sylius.api.updateUserProfile({
      customer: {
        id: apiState.getCustomerId(),
        // emailCanonical: updatedUserData.email,
        ...updatedUserData
      }
    }, customQuery);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, { email, password, firstName, lastName }) => {
    try {
      const registerUserResponse = await context.$sylius.api.registerUser({
        user: {
          firstName,
          lastName,
          password,
          email
        }
      });
      await params.logIn(context, { username: email, password});
      return registerUserResponse;
    } catch (err) {
      const error = {
        ...err?.response?.data?.graphQLErrors?.[0],
        message: err?.response?.data?.graphQLErrors?.[0].debugMessage
      };
      throw error;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {
    const apiState = context.$sylius.config.state;
    const orderTokenValue = apiState.getCartId()?.replace('/api/v2/shop/orders/', '');
    if (orderTokenValue) {
      try {
        const loginUserResponse = await context.$sylius.api.loginUser({
          login: {
            username,
            password,
            orderTokenValue
          }
        });
        // if (typeof window !== 'undefined') {
        //   localStorage.setItem('customer/token', loginUserResponse.token);
        //   localStorage.setItem('customer/id', loginUserResponse.user.customer.id);
        // }
        apiState.setCustomerToken(loginUserResponse.token);
        apiState.setCustomerRefreshToken(loginUserResponse.refreshToken);
        apiState.setCustomerId(loginUserResponse.user.customer.id);
      } catch (e) {
        console.log(e);
        throw {
          message: 'Can\'t authenticate with provided username/password.'
        };
      }
    }
    return params.load(context);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword, customQuery }) => {
    const apiState = context.$sylius.config.state;
    await context.$sylius.api.updateUserPassword({
      customerPassword: {
        shopUserId: apiState.getCustomerId().replace('/api/v2/shop/customers/', ''),
        currentPassword,
        newPassword,
        confirmNewPassword: newPassword
      }
    }, customQuery);
    await params.logOut(context, { currentUser });
    const { cartToken } = await context.$sylius.api.createCart();
    apiState.setCartId(cartToken);
    return await params.logIn(context, { username: currentUser.email, password: newPassword });
  }
};

export const useUser = useUserFactory<User, any, any>(params);
