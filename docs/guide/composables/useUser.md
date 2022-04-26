# `useUser`

## Features

`useUser` composable is used for performing user authentication, registration, profile updates and changing password.

## API

* `user: User | null` - user object.
* `loading: boolean` - a reactive object containing information whether user object is loading.
* `isAuthenticated: boolean ` - a reactive object containing information whether current user is authenticated.
* `error: UseUserErrors ` - a map of errors per method

[User](../api-client/sylius-api.user.md)
[UseUserErrors](https://docs.vuestorefront.io/v2/reference/api/core.useusererrors.html)


### `load`
function for loading the current user.

### `logIn`

### `logOut`

### `register`

### `updateUser`

### `changePassword`


## Getters

* `getFirstName: string`
* `getLastName: string`
* `getFullName: string`
* `getEmailAddress: string`


## Example

```js
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { useUser, userGetters } from '@realtainment/sylius';

export default {
  setup () {
    const { user, load, loading } = useUser();

    onSSR(async () => {
      await load();
    });

    return {
      user,
      userGetters
    }
  }
};
```
