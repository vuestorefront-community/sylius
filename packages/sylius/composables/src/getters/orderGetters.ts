/* istanbul ignore file */
import { parse as parseDate, format as formatDate } from 'date-fns';
import { UserOrderGetters } from '@vue-storefront/core';
import { Order, OrderItem } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDate = (order: any): string => {
  if (order?.createdAt) {
    const parsedDate = parseDate(order.createdAt, 'yyyy-MM-dd\'T\'HH:mm:ssxxx', new Date());
    return formatDate(parsedDate, 'dd.MM.yyyy');
  }
  return '-';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getId = (order: any): string => order?.number;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStatus = (order: any): string => order?.status || 'Failed';
export const getPaymentStatus = (order: any): string => {
  switch (order.paymentState) {
    case 'awaiting_payment':
      return 'awaiting';
    default:
      return order.paymentState;
  }
};
export const getShippingStatus = (order: any): string => order.shippingState;
export const getShippingTotal = (order: any): number => order.shippingTotal / 100;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getPrice = (order: any): number | null => order.total / 100;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItems = (order: any): any[] => order?.items || [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemSku = (item: any): string => item?.sku || 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemName = (item: any): string => item.productName;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemQty = (item: any): number => item.quantity;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemPrice = (item: any): number => item.total / 100;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number) => String(price);

function getOrdersTotal(orders: any): number {
  return orders.total;
}

export const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getDate,
  getId,
  getStatus,
  getPaymentStatus,
  getShippingStatus,
  getShippingTotal,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getOrdersTotal
};
