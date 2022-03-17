module.exports = {
  integrations: {
    sylius: {
      location: '@realtainment/sylius-api/server',
      configuration: {
        api: 'https://sylius-vsf2.bitbag.shop/api/v2/graphql',
        locale: 'en_US',
        imagePaths: {
          thumbnail: 'https://sylius-vsf2.bitbag.shop/media/cache/sylius_shop_product_thumbnail',
          regular: 'https://sylius-vsf2.bitbag.shop/media/cache/sylius_shop_product_large_thumbnail'
        },
        customHeaders: {}
      }
    }
  }
};
