import { fromUnixTime, isPast } from 'date-fns';
const atob = require('atob');
export default async ({ $vsf }) => {
  const apiState = $vsf.$sylius.config.state;

  const authCookie = apiState.getCustomerToken();
  if (!authCookie) return;

  const parseJWT = JSON.parse(atob(authCookie.split('.')[1]));
  if (! parseJWT?.exp) return;

  // check if JWT token is expired (include 30s buffer)
  if (isPast(fromUnixTime(parseJWT.exp - 30))) {
    const refreshToken = apiState.getCustomerRefreshToken();
    if (refreshToken) {
      apiState.setCustomerToken(null);
      const refreshLoginResponse = await $vsf.$sylius.api.refreshLoginUser({
        token: {refreshToken}
      });
      apiState.setCustomerToken(refreshLoginResponse.token);
    }
  }
};
