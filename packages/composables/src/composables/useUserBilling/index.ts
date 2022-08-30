import {
  Context,
  useUserBillingFactory,
  UseUserBillingFactoryParams
} from '@vue-storefront/core';

const params: UseUserBillingFactoryParams<any, any> = {
  addAddress: async () => {},
  deleteAddress: async () => {},
  updateAddress: async () => {},
  setDefaultAddress: async () => {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, data?) => {
    return await context.$sylius.api.getUserAddresses();
  }

};

export const useUserBilling = useUserBillingFactory<any, any>(params);
