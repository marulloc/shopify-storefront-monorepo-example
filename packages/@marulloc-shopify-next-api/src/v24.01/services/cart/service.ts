import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  updateCartLinesMutation,
  removeFromCartMutation,
  updateCartLocaleMutation,
} from '../../@shopify-graphql/mutations/cart';
import { getCartQuery } from '../../@shopify-graphql/queries/cart';
import { ShopifyCartLineUpdateInput } from '../../@shopify-types/shopify-cart';
import { ShopifyLocaleContext } from '../../@shopify-types/shopify-common';
import { storeFetch } from '../../storeFetch';
import { ToolkitCart } from '../../@toolkit-types/toolkit-cart';
import { parseCart } from './parser';
import {
  AddToCartService,
  CreateCartService,
  GetCartService,
  UpdateCartLinesService,
  RemoveFromCartService,
  UpdateCartLocaleService,
  UpdateCartService,
} from './types';

export const createCart = async (locale?: ShopifyLocaleContext): Promise<ToolkitCart> => {
  const res = await storeFetch<CreateCartService>({
    query: createCartMutation,
    cache: 'no-store',
    variables: {
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parseCart(res.body.data.cartCreate.cart);
};

export const addToCart = async (
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
  locale?: ShopifyLocaleContext,
): Promise<ToolkitCart> => {
  const res = await storeFetch<AddToCartService>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartLinesAdd.cart);
};

export const removeFromCart = async (
  cartId: string,
  lineIds: string[],
  locale?: ShopifyLocaleContext,
): Promise<ToolkitCart> => {
  const res = await storeFetch<RemoveFromCartService>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartLinesRemove.cart);
};

export const updateCart = async (
  cartId: string,
  lines: { id: string; merchandiseId?: string; quantity: number }[],
  locale?: ShopifyLocaleContext,
): Promise<ToolkitCart> => {
  const res = await storeFetch<UpdateCartService>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartLinesUpdate.cart);
};

export const getCart = async (cartId: string, locale?: ShopifyLocaleContext): Promise<ToolkitCart> => {
  const res = await storeFetch<GetCartService>({
    query: getCartQuery,
    variables: { cartId, country: locale?.country?.toUpperCase(), language: locale?.language?.toUpperCase() },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cart);
};

export const updateCartLocale = async (cartId: string, locale: ShopifyLocaleContext): Promise<ToolkitCart> => {
  const res = await storeFetch<UpdateCartLocaleService>({
    query: updateCartLocaleMutation,
    variables: { cartId: cartId, country: locale.country?.toUpperCase(), language: locale?.language?.toUpperCase() },
    cache: 'no-store',
  });

  return parseCart(res.body.data.cartBuyerIdentityUpdate.cart);
};

export const updateCartLines = async (
  cartId: string,
  lines: ShopifyCartLineUpdateInput[],
  locale?: ShopifyLocaleContext,
) => {
  const res = await storeFetch<UpdateCartLinesService>({
    query: updateCartLinesMutation,
    variables: { cartId, lines, country: locale?.country?.toUpperCase(), language: locale?.language?.toUpperCase() },
  });

  return parseCart(res.body.data.cartLinesUpdate.cart);
};
