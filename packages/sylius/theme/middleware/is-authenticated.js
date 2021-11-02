export default async (data) => {
  if (!data.app.$cookies.get('vsf-customer') || !data.app.$cookies.get('vsf-customer-id')) {
    return data.redirect('/');
  }
};
