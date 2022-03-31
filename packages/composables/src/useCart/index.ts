import {
  Context,
  Logger,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import type {
  Cart,
  CartItem,
  Product
} from '@realtainment/sylius-api';
const params: UseCartFactoryParams<Cart, CartItem, Product> = {
  load: async (context: Context) => {
    const apiState = context.$sylius.config.state;
    let cartId = apiState.getCartId();

    const createCart = async (): Promise<string> => {
      const { cartToken } = await context.$sylius.api.createCart();
      apiState.setCartId(cartToken);
      return cartToken;
    };

    try {
      // create new cart object in the backend
      if (!cartId) cartId = await createCart();

      const cartResponse = await context.$sylius.api.getCart(cartId);

      // empty response means cart token is no longer valid
      if (cartResponse && Object.keys(cartResponse).length === 0) {
        cartId = await createCart();
      }
    } catch (e) {
      Logger.error(e);
    }

    return await context.$sylius.api.getCart(cartId);
  },
  addItem: async (context: Context, { product, quantity, customQuery }) => {
    const apiState = context.$sylius.config.state;
    const variant = product as Product;
    const variantId = variant.selectedVariant.id;
    let cartId = apiState.getCartId();

    if (!cartId) {
      await params.load(context, {});
      cartId = apiState.getCartId();
    }

    const token = cartId.replace('/api/v2/shop/orders/', '');

    const cart = await context.$sylius.api.addToCart({
      quantity,
      variantId,
      token
    }, customQuery);
    return cart;
  },
  removeItem: async (context: Context, { product, customQuery}) => {
    const apiState = context.$sylius.config.state;
    const cartId = apiState.getCartId();
    const cart = await context.$sylius.api.removeFromCart({
      cartId,
      itemId: String((product as Product)._id)
    }, customQuery);
    return cart;
  },
  updateItemQty: async (context: Context, { product, quantity, customQuery }) => {
    const apiState = context.$sylius.config.state;
    const cartId = apiState.getCartId();
    const cart = await context.$sylius.api.updateCartQuantity({
      cartId,
      itemId: String((product as Product)._id),
      quantity
    }, customQuery);
    return cart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context) => {
    const apiState = context.$sylius.config.state;
    const cartId = apiState.getCartId();
    return await context.$sylius.api.clearCart({ cartId });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    const apiState = context.$sylius.config.state;
    const orderTokenValue = apiState.getCartId().replace('/api/v2/shop/orders/', '');
    try {
      const applyCouponResponse = await context.$sylius.api.addCouponToCart({
        coupon: {
          orderTokenValue,
          couponCode
        }
      }, customQuery);
      return {
        updatedCart: applyCouponResponse,
        updatedCoupon: couponCode
      };
    } catch (err) {
      err.message = err?.response?.data?.graphQLErrors?.[0]?.extensions?.message || err.message;
      throw err?.response?.data?.graphQLErrors?.[0]?.extensions || err;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, customQuery, couponCode }) => {
    const apiState = context.$sylius.config.state;
    const orderTokenValue = apiState.getCartId().replace('/api/v2/shop/orders/', '');
    const removeCouponResponse = await context.$sylius.api.removeCouponFromCart({
      removeCouponInput: {
        orderTokenValue,
        couponCode
      }
    }, customQuery);
    return {
      updatedCart: removeCouponResponse
    };
  },
  isInCart: (context: Context, { currentCart, product }) => {
    if (currentCart?.items) {
      const productCheck = currentCart.items.filter(p => product.selectedVariant.code === p.variant.code);
      return productCheck.length > 0;
    }

    return false;
  }
};

export const useCart = useCartFactory<Cart, CartItem, Product>(params);
