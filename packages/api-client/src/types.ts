import ApolloClient, { ApolloClientOptions } from 'apollo-client';
import {FilterEqualTypeInput, FilterMatchTypeInput} from './api/getCategory/types';

export type ProductAttributeFilterInput = {
  name: FilterMatchTypeInput
  sku: FilterEqualTypeInput
  url_key: FilterEqualTypeInput
}

export type ProductInput = {
  itemsPerPage: number;
  page: number;
  slug: string;
  categorySlug: string;
  id?: string,
  search?: string;
  filter?: ProductAttributeFilterInput;
  orderBy?: any
};

export type ProductOptionValue = {
  code: string,
  value: string
  option: {
    id: string;
  }
}
export type ProductOption = {
  id: string;
  code: string;
  name: string;
  label: string;
  values: ProductOptionValue[];
}

export type ProductVariant = {
  id: string;
  price: number;
  code: string;
  quantity?: number;
  channelPricings: any[];
  optionValues: ProductOptionValue[]
}
export type Wishlist = Record<string, unknown>;
export type Product = {
  _id?: number;
  description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  slug: string;
  images: string[];
  options: ProductOption[];
  galleryImages: string[];
  price: {
    special: number;
    regular: number;
  };
  reviews: {
    paginationInfo: {
      totalCount: number;
    }
  },
  averageRating: number;
  selectedVariant: ProductVariant | null;
  variants: ProductVariant[];
};
export type Category = {
  id: number;
  name: string;
  slug: string;
  items: Category[];
};
export type CategoryFilter = Record<string, unknown>;
export type ShippingMethod = Record<string, unknown>;

export type CartLineItem = {
  _id: string;
  code: string;
  sku?: string;
  name?: string;
  productName: string;
  unitPrice: number;
  qty?: number;
  quantity: number;
  images: string[];
  variant: {
    code: string;
    product: {
      images: string[];
    }
  }
  price?: {
    regular: number;
    special: number;
  }
  selectedVariant: {
    optionValues: ProductOptionValue[];
    product: {
      options: ProductOption[];
    }
  }
}
export type Cart = {
  items: CartLineItem[];
  total: number;
  shippingTotal: number;
  orderPromotionTotal: number;
  promotionCoupon: any;
}

export interface Storage {
  set: (
      name: string,
      value: any
  ) => void;
  get: (name: string) => any;
  remove: (name: string) => any;
  removeAll: () => void;
}

export type ConfigState = {
  getCartId(): string;
  setCartId(id: string): void;
  getCustomerToken(): string;
  setCustomerToken(token: string): void;
  getCustomerRefreshToken(): string;
  setCustomerRefreshToken(token: string): void;
  getCustomerId(): string;
  setCustomerId(id: string): void;
  getStore(): string;
  setStore(id: string): void;
};

export interface ClientConfig {
  locale: string;
  api: string;
  customOptions?: ApolloClientOptions<any>;
  state: ConfigState;
  cookies: Record<string, string>;
  acceptLanguage: string[];
}

export interface Config<T = any> extends ClientConfig {
  client?: ApolloClient<T>;
  storage: Storage;
}

export type ClientInstance = ApolloClient<any>

export type TODO = unknown;

export type Setttings = TODO;

export type Endpoints = TODO;

export type BillingAddress = TODO;

export type CartItem = TODO;

export type Coupon = TODO;

export type Facet = TODO;

export type FacetSearchCriteria = TODO;

export type Order = TODO;

export type OrderItem = TODO;

export type PasswordResetResult = TODO;

export type ProductFilter = TODO;

export type Review = TODO;

export type ReviewItem = TODO;

export type User = TODO;

export type UserBillingAddress = TODO;

export type UserBillingAddressItem = TODO;

export type UserBillingAddressSearchCriteria = TODO;

export type UserShippingAddress = TODO;

export type UserShippingAddressItem = TODO;

export type UserAddressItem = {
  id: string;
  firstName: string;
  lastName: string;
  postcode: string;
  street: string;
  city: string;
  countryCode: string;
  phoneNumber: string;
};

export type UserShippingAddressSearchCriteria = TODO;

export type ShippingAddress = TODO;

export type ShippingProvider = TODO;

export type WishlistItem = TODO;
