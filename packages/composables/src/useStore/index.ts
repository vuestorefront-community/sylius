import { Context, useStoreFactory } from '@vue-storefront/core';

type TODO = unknown;
type Store = TODO;

export const useStore = useStoreFactory<Store>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load(context: Context, params) {
    // console.log('Mocked: useStore.load');
    return Promise.resolve({});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change(context: Context, params) {
    // console.log('Mocked: useStore.change');
    return Promise.resolve({});
  }
});
