# `useCart`

## Features

`useCart` composable can be used to:

* create new cart or load existing one,
* add, update and remove items in the cart,
* applying and removing coupons,
* checking if product is already added to the cart.

## API

* `cart: Cart` - a main data object.
* `loading: boolean` - a reactive object containing information about loading state of the cart.
* `error` - reactive object containing the error message.

[Cart](../api-client/sylius-api.cart.md)

### `load`
function for loading existing cart from cookie or creating a brand new cart and storing cart identifier to cookie.
function required to fetch cart from a server or create brand new if it doesn't exist.


### `addItem`
function for adding products to the cart and it accepts an object with the following keys:

  * `product: Product`

  * `quantity: number`

  * `customQuery?: customQuery`

### `updateItemQty`
function for updating quantity of a product in cart and it accepts an object with the following keys:

  * `product: Product`

  * `quantity: number`

  * `customQuery?: CustomQuery`

### `removeItem`
function for removing a product from cart and it accepts an object with the following keys:

  * `product: Product`

  * `customQuery?: CustomQuery`

### `isInCart`
function for checking if given product is currently in the cart.

* `clear` - function for removing all items in cart.

* `applyCoupon` - function for applying coupon to cart and it accepts an object with the following keys:

  * `couponCode: string`

  * `customQuery?: CustomQuery`

### `removeCoupon`
function for removing coupon from cart and it accepts an object with the following keys:

  * `coupon: string`

  * `customQuery?: CustomQuery`

## Getters

* `getTotals: AgnosticTotals`
* `getShippingPrice: number`
* `getItems: CartLineItem[]`
* `getItemName: string`
* `getItemImage: string`
* `getItemPrice: AgnosticPrice`
* `getItemQty: number`
* `getItemAttributes: Array<string>`
* `getItemSku: string`
* `getFormattedPrice: string`
* `getTotalItems: number`
* `getCoupons: AgnosticCoupon[]`
* `getDiscounts: AgnosticDiscount[]`

## Example

```js
import { useCart, cartGetters } from '@realtainment/sylius';
import { onSSR } from '@vue-storefront/core';
import { computed, ref } from '@vue/composition-api';
export default {
  setup () {
    const { cart, removeItem, updateItemQty, applyCoupon, load, removeCoupon, error } = useCart();

    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value));

    onSSR(async () => {
      if (!cart.value) await load();
    });

    const submitCouponForm = async () => {
      await applyCoupon({ couponCode: promoCode.value });
      const errorKeys = Object.keys(error.value);
      errorKeys.forEach(errorKey => {
        if (error.value[errorKey] && error.value[errorKey]?.message) {
          console.log({ type: 'danger', message: error.value[errorKey].message });
        }
      });
    };

    const handleCouponRemoval = async (couponCode) => {
      await removeCoupon({ couponCode });
    };

    return {
      cartGetters,
      discounts,
      totalItems,
      products,
      totals,
      removeItem,
      updateItemQty,
      applyCoupon,
      handleCouponRemoval
    };
  }
};
```
