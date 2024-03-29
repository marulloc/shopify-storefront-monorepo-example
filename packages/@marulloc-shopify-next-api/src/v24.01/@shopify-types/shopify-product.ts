import { Connection, ShopifyImage, ShopifyMoney, ShopifySEO } from './shopify-common';

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ShopifyProductOption[];
  priceRange: {
    maxVariantPrice: ShopifyMoney;
    minVariantPrice: ShopifyMoney;
  };
  variants: Connection<ShopifyProductVariant>;
  featuredImage: ShopifyImage;
  images: Connection<ShopifyImage>;
  seo: ShopifySEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: ShopifyMoney;
};
