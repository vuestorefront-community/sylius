const canEnterShipping = (cart) => cart.billingAddress !== null;
const canEnterPayment = (cart) => cart.shippingAddress !== null;

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) return;

  const cartId = $vsf.$sylius.config.state.getCartId();
  if (cartId) {
    const activeCart = await $vsf.$sylius.api.getCart(cartId);

    switch (currentPath) {
      case 'shipping':
        if (!canEnterShipping(activeCart)) {
          app.context.redirect('/checkout/billing');
        }
        break;
      case 'payment':
        if (!canEnterShipping(activeCart)) {
          app.context.redirect('/checkout/billing');
        }

        if (!canEnterPayment(activeCart)) {
          app.context.redirect('/checkout/billing');
        }
        break;
    }
  }
};

