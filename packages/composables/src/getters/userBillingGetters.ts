import { UserBillingGetters } from '@vue-storefront/core';
import type {
  UserBillingAddress as Address,
  UserAddressItem as AddressItem,
  UserBillingAddressSearchCriteria
} from '@realtainment/sylius-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAddresses(billing, criteria?: UserBillingAddressSearchCriteria): AddressItem[] {
  if (!criteria || !Object.keys(criteria).length) {
    return billing;
  }
  const entries = Object.entries(criteria);
  return billing.filter(address => entries.every(([key, value]) => address[key] === value));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDefault(billing: Address): AddressItem {
  return billing[0];
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotal(billing: Address): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPostCode(address: AddressItem): string {
  return address.postcode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStreetName(address: AddressItem): string {
  return address.street;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStreetNumber(address: AddressItem): string | number {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCity(address: AddressItem): string {
  return address.city;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFirstName(address: AddressItem): string {
  return address.firstName;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getLastName(address: AddressItem): string {
  return address.lastName;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCountry(address: AddressItem): string {
  return address.countryCode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPhone(address: AddressItem): string {
  return address.phoneNumber;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getEmail(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProvince(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCompanyName(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTaxNumber(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(address: AddressItem): string {
  return address.id;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getApartmentNumber(address: AddressItem): string | number {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isDefault(address: AddressItem): boolean {
  return false;
}

export const userBillingGetters: UserBillingGetters<Address, AddressItem> = {
  getAddresses,
  getDefault,
  getTotal,
  getPostCode,
  getStreetName,
  getStreetNumber,
  getCity,
  getFirstName,
  getLastName,
  getCountry,
  getPhone,
  getEmail,
  getProvince,
  getCompanyName,
  getTaxNumber,
  getId,
  getApartmentNumber,
  isDefault
};
