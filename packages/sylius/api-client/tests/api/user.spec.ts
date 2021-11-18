import {
  getUser, loginUser, refreshLoginUser, getUserAddresses, getUserOrders,
  addUserAddress, updateUserAddress, deleteUserAddress, updateUserPassword, updateUserProfile,
  resetUserPassword, triggerResetUserPassword, registerUser
} from '../../src/api/user';
import { getUserQuery, getUserAddressesQuery, getUserOrdersQuery } from '../../src/api/user/queries';
import {
  loginMutation, refreshLoginTokenMutation, addAddressMutation, deleteAddressMutation, updateAddressMutation,
  updatePasswordMutation, updateProfileMutation, resetPasswordMutation, triggerResetPasswordMutation, registerMutation
} from '../../src/api/user/mutations';
import { defaultSettings } from '../../src/settings';

describe('[sylius-api-client] users', () => {
  it('get user', async () => {
    const id = '1';

    const context = {
      config: defaultSettings,
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual({ id });
          expect(query).toEqual(getUserQuery);
          return {
            data: {
              customer: { id }
            }
          };
        }
      }
    };

    const result = await getUser(context, id);
    expect(result).toStrictEqual({ id });
  });

  it('login user', async () => {
    const defaultVariables = {};

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(loginMutation);
          return { data: { shop_loginShopUserToken: { shopUserToken: 'token' } }};
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await loginUser(context, defaultVariables);
    expect(result).toBe('token');
  });

  it('register user', async () => {
    const defaultVariables = {};
    const user = {
      username: '',
      email: '',
      customer: {}
    };

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(registerMutation);
          return { data: { shop_registerUser: { user }}};
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await registerUser(context, defaultVariables);
    expect(result).toStrictEqual({
      username: '',
      email: ''
    });
  });

  it('refresh login user', async () => {
    const defaultVariables = {};

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(refreshLoginTokenMutation);
          return { data: { shop_refreshShopUserToken: { shopUserToken: 'token' } }};
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await refreshLoginUser(context, defaultVariables);
    expect(result).toBe('token');
  });

  it('get user address', async () => {
    const id = '1';
    const collection = [];

    const context = {
      config: defaultSettings,
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual({ id });
          expect(query).toEqual(getUserAddressesQuery);
          return {
            data: {
              addresses: { collection }
            }
          };
        }
      }
    };

    const result = await getUserAddresses(context, id);
    expect(result).toStrictEqual(collection);
  });

  it('add user address', async () => {
    const defaultVariables = {};

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(addAddressMutation);
          return { data: { shop_postAddress: { address: {} } }};
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await addUserAddress(context, defaultVariables);
    expect(result).toStrictEqual({});
  });

  it('update user address', async () => {
    const defaultVariables = {};

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(updateAddressMutation);
          return { data: { shop_putAddress: { address: {} } }};
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await updateUserAddress(context, defaultVariables);
    expect(result).toStrictEqual({});
  });

  it('update user profile', async () => {
    const defaultVariables = {};

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(updateProfileMutation);
          return { data: { shop_putCustomer: { customer: {} } }};
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await updateUserProfile(context, defaultVariables);
    expect(result).toStrictEqual({});
  });

  it('update user password', async () => {
    const defaultVariables = {};

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(updatePasswordMutation);
          return { data: { shop_password_updateCustomer: { customer: {} } }};
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await updateUserPassword(context, defaultVariables);
    expect(result).toStrictEqual({});
  });

  it('trigger reset user password', async () => {
    const defaultVariables = { customerPassword: {}};

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(triggerResetPasswordMutation);
          return { data: { shop_send_reset_password_emailCustomer: { customer: {} } }};
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await triggerResetUserPassword(context, defaultVariables);
    expect(result).toStrictEqual({});
  });

  it('reset user password', async () => {
    const defaultVariables = {};

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(resetPasswordMutation);
          return { data: { shop_reset_passwordCustomer: { customer: {} } }};
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await resetUserPassword(context, defaultVariables);
    expect(result).toStrictEqual({});
  });

  it('delete user address', async () => {
    const defaultVariables = {};

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(deleteAddressMutation);
          return { data: { deleteAddress: { address: {} } }};
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await deleteUserAddress(context, defaultVariables);
    expect(result).toStrictEqual({});
  });

  it('get user orders', async () => {
    const id = '1';
    const edges = [
      { node: { items: { edges: []}}}
    ];

    const context = {
      config: defaultSettings,
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual({ id });
          expect(query).toEqual(getUserOrdersQuery);
          return {
            data: {
              customer: { orders: { edges } }
            }
          };
        }
      }
    };

    const result = await getUserOrders(context, id);
    expect(result).toStrictEqual([{
      items: []
    }]);
  });

});
