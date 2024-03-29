import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from '../../@shopify-graphql/queries/product';
import { ShopifyLocaleContext } from '../../@shopify-types/shopify-common';
import { storeFetch } from '../../storeFetch';
import { flatConnection } from '../../utils/flat';
import { ToolkitProduct } from '../../@toolkit-types/toolkit-product';
import { parseProduct, parseProducts } from './parser';
import { GetProductRecommendationsService, GetProductService, GetProductsService } from './types';

export const getProduct = async (handle: string, locale?: ShopifyLocaleContext): Promise<ToolkitProduct> => {
  const res = await storeFetch<GetProductService>({
    query: getProductQuery,
    variables: {
      handle,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parseProduct(res.body.data.product);
};

export const getProductRecommendations = async (
  productId: string,
  locale?: ShopifyLocaleContext,
): Promise<ToolkitProduct[]> => {
  const res = await storeFetch<GetProductRecommendationsService>({
    query: getProductRecommendationsQuery,
    variables: {
      productId,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parseProducts(res.body.data.productRecommendations);
};

export const getProducts = async ({
  query,
  reverse,
  sortKey,
  locale,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  locale?: ShopifyLocaleContext;
}): Promise<ToolkitProduct[]> => {
  const res = await storeFetch<GetProductsService>({
    query: getProductsQuery,
    variables: {
      query,
      reverse,
      sortKey,
      country: locale?.country?.toUpperCase(),
      language: locale?.language?.toUpperCase(),
    },
  });

  return parseProducts(flatConnection(res.body.data.products));
};
