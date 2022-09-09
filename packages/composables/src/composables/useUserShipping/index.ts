import {
  Context,
  useUserShippingFactory,
  UseUserShippingFactoryParams
} from '@vue-storefront/core';

const params: UseUserShippingFactoryParams<any, any> = {
  addAddress: async (context: Context, { address, customQuery }) => {
    await context.$sylius.api.addUserAddress({ address }, customQuery);
    return await context.$sylius.api.getUserAddresses();
  },

  deleteAddress: async (context: Context, { address, customQuery }) => {
    await context.$sylius.api.deleteUserAddress({
      address: {
        id: address.id
      }
    }, customQuery);
    return await context.$sylius.api.getUserAddresses();
  },

  updateAddress: async (context: Context, { address, customQuery}) => {
    await context.$sylius.api.updateUserAddress({ address }, customQuery);
    await context.$sylius.api.getUserAddresses();
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, data?) => {},
  load: async (context: Context) => {
    return await context.$sylius.api.getUserAddresses();
  }
};

export const useUserShipping = useUserShippingFactory<any, any>(params);
