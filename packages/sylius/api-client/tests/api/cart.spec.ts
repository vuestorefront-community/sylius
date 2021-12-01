import { defaultSettings } from '../../src/settings';
import {
  addToCartMutation, clearCartMutation, createCartMutation, removeFromCartMutation,
  updateCartQuantityMutation, updateCartPaymentMutation, updateCartShippingMutation
} from '../../src/api/cart/mutations';
import { getCartQuery, getPaymentMethodsQuery, getShippingMethodsQuery } from '../../src/api/cart/queries';
import {
  addToCart, clearCart, createCart, getCart, getPaymentMethods, getShippingMethods,
  removeFromCart, updateCartQuantity, updateCartPayment, updateCartShipping
} from '../../src/api/cart';

describe('[sylius-api-client] cart', () => {
  it('creates new cart', async () => {
    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual({
            locale: defaultSettings.locale
          });
          expect(mutation).toEqual(createCartMutation);
          return {
            data: {
              cart: {
                order: {
                  tokenValue: 'cart-id'
                }
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await createCart(context);
    expect(result).toHaveProperty('cartToken');
  });

  it('adds product to the cart', async () => {
    const defaultVariables = {
      itemId: 'item-id',
      cartId: 'cart-id'
    };

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(addToCartMutation);
          return {
            data: {
              shop_add_itemOrder: {
                order: {
                  items: { edges: [] },
                  payments: { edges: [] },
                  shipments: { edges: [] }
                }
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await addToCart(context, defaultVariables);
    expect(result).toHaveProperty('items');
  });

  it('gets cart', async () => {
    const defaultVariables = {
      cartId: 'cart-id',
      locale: defaultSettings.locale,
      acceptLanguage: defaultSettings.acceptLanguage
    };

    const context = {
      config: defaultSettings,
      client: {
        query: ({ variables, query }) => {
          expect(variables).toEqual(defaultVariables);
          expect(query).toEqual(getCartQuery);
          return {
            data: {
              order: {
                items: { edges: [] },
                payments: { edges: [] },
                shipments: { edges: [] }
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await getCart(context, defaultVariables.cartId);
    expect(result).toHaveProperty('items');
  });

  it('gets payment methods', async () => {
    defaultSettings.locale = 'en_US';
    const context = {
      config: defaultSettings,
      client: {
        query: ({ query }) => {
          expect(query).toEqual(getPaymentMethodsQuery);
          return {
            data: {
              paymentMethods: {
                collection: [
                  {
                    code: 'bank_transfer',
                    enabled: true,
                    translations: {
                      collection: [
                        {
                          name: 'Bank transfer',
                          description: 'Quaerat dolores iste minus accusamus doloribus aspernatur aliquam.',
                          locale: 'en_US'
                        },
                        {
                          name: 'Bank transfer',
                          description: 'Quaerat dolores iste minus accusamus doloribus aspernatur aliquam.',
                          locale: 'de_DE'
                        },
                        {
                          name: 'Bank transfer',
                          description: 'Quaerat dolores iste minus accusamus doloribus aspernatur aliquam.',
                          locale: 'fr_FR'
                        },
                        {
                          name: 'Bank transfer',
                          description: 'Quaerat dolores iste minus accusamus doloribus aspernatur aliquam.',
                          locale: 'pl_PL'
                        },
                        {
                          name: 'Bank transfer',
                          description: 'Quaerat dolores iste minus accusamus doloribus aspernatur aliquam.',
                          locale: 'es_ES'
                        },
                        {
                          name: 'Bank transfer',
                          description: 'Quaerat dolores iste minus accusamus doloribus aspernatur aliquam.',
                          locale: 'es_MX'
                        },
                        {
                          name: 'Bank transfer',
                          description: 'Quaerat dolores iste minus accusamus doloribus aspernatur aliquam.',
                          locale: 'pt_PT'
                        },
                        {
                          name: 'Bank transfer',
                          description: 'Quaerat dolores iste minus accusamus doloribus aspernatur aliquam.',
                          locale: 'zh_CN'
                        }
                      ]
                    },
                    channels: {
                      collection: [
                        {
                          code: 'FASHION_WEB'
                        }
                      ]
                    }
                  }
                ]
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await getPaymentMethods(context);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContainEqual({
      label: 'Bank transfer',
      value: 'bank_transfer',
      description: 'Quaerat dolores iste minus accusamus doloribus aspernatur aliquam.'
    });
  });

  it('gets shipping methods', async () => {
    defaultSettings.locale = 'en_US';
    const context = {
      config: defaultSettings,
      client: {
        query: ({ query }) => {
          expect(query).toEqual(getShippingMethodsQuery);
          return {
            data: {
              shippingMethods: {
                collection: [
                  {
                    code: 'ups',
                    calculator: 'flat_rate',
                    configuration: {
                      FASHION_WEB: {
                        amount: 738
                      }
                    },
                    translations: {
                      collection: [
                        {
                          name: 'UPS',
                          description: 'Tenetur praesentium quibusdam corrupti nobis id delectus rerum.',
                          locale: 'en_US'
                        },
                        {
                          name: 'UPS',
                          description: 'Tenetur praesentium quibusdam corrupti nobis id delectus rerum.',
                          locale: 'de_DE'
                        },
                        {
                          name: 'UPS',
                          description: 'Tenetur praesentium quibusdam corrupti nobis id delectus rerum.',
                          locale: 'fr_FR'
                        },
                        {
                          name: 'UPS',
                          description: 'Tenetur praesentium quibusdam corrupti nobis id delectus rerum.',
                          locale: 'pl_PL'
                        },
                        {
                          name: 'UPS',
                          description: 'Tenetur praesentium quibusdam corrupti nobis id delectus rerum.',
                          locale: 'es_ES'
                        },
                        {
                          name: 'UPS',
                          description: 'Tenetur praesentium quibusdam corrupti nobis id delectus rerum.',
                          locale: 'es_MX'
                        },
                        {
                          name: 'UPS',
                          description: 'Tenetur praesentium quibusdam corrupti nobis id delectus rerum.',
                          locale: 'pt_PT'
                        },
                        {
                          name: 'UPS',
                          description: 'Tenetur praesentium quibusdam corrupti nobis id delectus rerum.',
                          locale: 'zh_CN'
                        }
                      ]
                    },
                    channels: {
                      collection: [
                        {
                          code: 'FASHION_WEB'
                        }
                      ]
                    }
                  }
                ]
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await getShippingMethods(context, { });
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContainEqual({
      label: 'UPS',
      value: 'ups',
      description: 'Tenetur praesentium quibusdam corrupti nobis id delectus rerum.',
      cost: 7.38
    });
  });

  it('removes product from the cart', async () => {
    const defaultVariables = {
      quantity: 1,
      variantId: 'variant-id',
      cartId: 'cart-id'
    };

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(removeFromCartMutation);
          return {
            data: {
              shop_remove_itemOrder: {
                order: {
                  items: { edges: [] },
                  payments: { edges: [] },
                  shipments: { edges: [] }
                }
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await removeFromCart(context, defaultVariables);
    expect(result).toHaveProperty('items');
  });

  it('updates cart shipping', async () => {
    const defaultVariables = {
      cartId: 'cart-id'
    };

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(updateCartShippingMutation);
          return {
            data: {
              shop_select_shipping_methodOrder: {
                order: {
                  items: { edges: [] },
                  payments: { edges: [] },
                  shipments: { edges: [] }
                }
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await updateCartShipping(context, defaultVariables);
    expect(result).toHaveProperty('items');
  });

  it('updates cart payment', async () => {
    const defaultVariables = {
      cartId: 'cart-id'
    };

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(updateCartPaymentMutation);
          return {
            data: {
              shop_select_payment_methodOrder: {
                order: {
                  items: { edges: [] },
                  payments: { edges: [] },
                  shipments: { edges: [] }
                }
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await updateCartPayment(context, defaultVariables);
    expect(result).toHaveProperty('items');
  });

  it('updates cart item quantity', async () => {
    const defaultVariables = {
      quantity: 1,
      itemId: 'item-id',
      cartId: 'cart-id'
    };

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(updateCartQuantityMutation);
          return {
            data: {
              shop_change_quantityOrder: {
                order: {
                  items: { edges: [] },
                  payments: { edges: [] },
                  shipments: { edges: [] }
                }
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await updateCartQuantity(context, defaultVariables);
    expect(result).toHaveProperty('items');
  });

  it('clears cart', async () => {
    const defaultVariables = {
      cartId: 'cart-id'
    };

    const context = {
      config: defaultSettings,
      client: {
        mutate: ({ variables, mutation }) => {
          expect(variables).toEqual(defaultVariables);
          expect(mutation).toEqual(clearCartMutation);
          return {
            data: {
              deleteOrder: {
                order: {
                  tokenValue: defaultVariables.cartId
                }
              }
            }
          };
        }
      },
      extendQuery: (customQuery, args) => args
    };

    const result = await clearCart(context, defaultVariables);
    expect(result).toHaveProperty('tokenValue');
    expect(result.tokenValue).toBe(defaultVariables.cartId);
  });
});
