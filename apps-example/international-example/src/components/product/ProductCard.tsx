import { ToolkitProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-product';
import { localTheme } from '@/theme/local-theme';
import { classNames } from '@marulloc/components-library/utils';
import ProductPrice from './ProductPrice';
import Image from 'next/image';

type Props = {
  variant: 'small' | 'big';
} & { product: ToolkitProduct };

const ProductCard = ({ variant, product }: Props) => {
  switch (variant) {
    case 'small':
      return <SmallProductCard product={product} />;

    default:
    case 'big':
      return <BigProductCard product={product} />;
  }
};

export default ProductCard;

const SmallProductCard = ({ product }: Omit<Props, 'variant'>) => {
  return (
    <div className="group flex items-center  space-x-6">
      <div
        className={classNames(
          'aspect-square h-14 w-14 bg-gray-400 ',
          'rounded-lg flex justify-center items-center overflow-hidden',
          'border group-hover:border-indigo-600 group-hover:text-indigo-600',
        )}
      >
        {product.featuredImage && (
          <Image
            src={product.featuredImage.url || ''}
            alt={product.featuredImage.altText || product.title}
            width={product.featuredImage.width || 0}
            height={product.featuredImage.height || 0}
            className="h-14 w-14 object-cover object-center"
          />
        )}
      </div>

      <div
        className={classNames(
          'text-base',
          'text-gray-600 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
        )}
      >
        <div>{product.title}</div>
        <div className={classNames('text-sm')}>
          <ProductPrice priceRange={product.priceRange} />
        </div>
      </div>
    </div>
  );
};

const BigProductCard = ({ product }: Omit<Props, 'variant'>) => {
  return (
    <div className="relative group h-full rounded-lg overflow-hidden   ">
      <div
        className={classNames(
          'w-full h-full relative',
          'text-zinc-200 flex justify-center items-center',
          localTheme.fill.base.muted,
        )}
      >
        {product.featuredImage ? (
          <Image
            src={product.featuredImage?.url}
            alt={product.featuredImage?.altText || ''}
            width={product.featuredImage?.width}
            height={product.featuredImage?.height}
            className="group-hover:scale-110 transition-all duration-300 w-full h-full"
          />
        ) : (
          <>NO IMAGE</>
        )}
      </div>

      <div
        className={classNames(
          'absolute bottom-0 h-1/2 w-full rounded-none z-30',
          'transform transition-all  duration-500',
          'group-hover:visible invisible',
          'group-hover:translate-y-0 translate-y-full',
          'bg-gradient-to-t  from-gray-50 bg-opacity-90',
        )}
      >
        <div className=" h-full p-4 flex flex-col justify-end items-end">
          <p className={classNames(localTheme.text.size.small, localTheme.text.color.base.main)}>{product.title}</p>
          <ProductPrice
            priceRange={product.priceRange}
            className={classNames(localTheme.text.size.small, localTheme.text.color.primary.main)}
          />
        </div>
      </div>
    </div>
  );
};