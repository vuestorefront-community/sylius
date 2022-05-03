# `useUserShipping`

## Features

`useUserShipping` composable is used for loading, adding, updating and deleting shipping address.

## API

* `shipping: Order | null` - created order.
* `loading: boolean` - a reactive object containing information whether order is loading.
* `error: UseUserShippingErrors` - a map of errors per method

[UseUserShippingErrors](https://docs.vuestorefront.io/v2/reference/api/core.useusershippingerrors.html)


### `load`
function for loading all saved addresses for current user.

### `addAddress`
function for adding a new address.

### `updateAddress`
function for updating an address.

### `deleteAddress`
function for deleting an address.


## Getters

* `getAddresses: AddressItem[]`
* `getDefault: AddressItem`
* `getTotal: number`
* `getPostCode: string`
* `getStreetNumber: string`
* `getCity: string`
* `getFirstName: string`
* `getLastName: string`
* `getCountry: string`
* `getPhone: string`
* `getEmail: string`
* `getProvince: string`
* `getCompanyName: string`
* `getTaxNumber: string`
* `getId: string`
* `getApartmentNumber: string | number`
* `isDefault: boolean`


## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useUserShipping, userShippingGetters } from '@realtainment/sylius';

export default {
  setup () {
    const { shipping, load, loading } = useUserShipping();

    onSSR(async () => {
      await load();
    });

    return {
      shipping,
      userShippingGetters
    }
  }
};
```
