'use client';

import { DefaultValue, atom, selector } from 'recoil';
import { atomLocale } from './locale-atoms';
import { debounce } from '@/utils/asyncUtils';
import { deepCompare } from '@/utils/compare';
import { ToolkitCart } from '@marulloc/shopify-next-api/v24.01/@toolkit-types';
import { createCart, getCart, updateCartLines, updateCartLocale } from '@marulloc/shopify-next-api/v24.01/services';

const STORAGE_KEY = 'marulloc-cart';
const store = typeof window !== 'undefined' ? window.localStorage : null;

/**
 *
 *
 *
 */
export const atomCart = atom({
  key: 'cart-atom-with-locale',
  default: selector({
    key: 'cart-with-locale-loader',
    get: async ({ get: subscribe }) => {
      if (!store) return;
      const locale = subscribe(atomLocale);

      const memoizedCart = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') as ToolkitCart | null;

      let savedOrNewCart: ToolkitCart;
      if (!memoizedCart?.id) {
        savedOrNewCart = await createCart(locale);
      } else {
        if (locale.country?.toUpperCase() !== memoizedCart.buyerIdentity.countryCode.toUpperCase()) {
          savedOrNewCart = await updateCartLocale(memoizedCart.id, locale);
        } else {
          savedOrNewCart = await getCart(memoizedCart.id, locale);
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedOrNewCart));
      return savedOrNewCart;
    },
  }),

  effects: [
    ({ onSet, setSelf, trigger, getLoadable, getPromise }) => {
      const updateOptimisticCartLines = debounce(
        async (newValue: ToolkitCart, oldValue: undefined | ToolkitCart | DefaultValue) => {
          const locale = await getPromise(atomLocale);
          const cartId = newValue.id;
          const lines = newValue.lines.map(({ id, merchandise, quantity }) => ({
            id,
            merchandiseId: merchandise.id,
            quantity,
          }));

          const updatedCart = await updateCartLines(cartId, lines, locale);

          if (deepCompare(updatedCart, oldValue)) return;
          setSelf(updatedCart);
        },
        300,
      );

      onSet(async (newValue, oldValue, isReset) => {
        if (newValue?.id) updateOptimisticCartLines(newValue, oldValue);

        if (isReset) return localStorage.removeItem(STORAGE_KEY);
        return localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
      });
    },
  ],
});

/**
 *
 *
 *
 */
export const atomOptimisticCartLines = selector({
  key: 'cart-subscribe1244',
  get: ({ get: subscribe }) => {
    if (!store) return [];

    const cart = subscribe(atomCart);
    if (!cart) return [];
    return cart.lines;
  },
  set: ({ set }, newValue) => {
    set(atomCart, (cart) => {
      if (!cart) return;
      if (!newValue || newValue instanceof DefaultValue) return cart;

      const optimisticTotalQty = newValue.reduce((prevResult, { quantity }) => prevResult + quantity, 0);

      return { ...cart, lines: newValue, totalQuantity: optimisticTotalQty };
    });
  },
});
