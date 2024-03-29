'use client';

import { classNames } from '@marulloc/components-library/utils';
import React, { useEffect } from 'react';
import ProductPrice from '@/components/product/ProductPrice';
import Price from '@/components/product/Price';
import LoadingDots from '@/components/loading/LoadingDots';
import { useSelectVariant } from '@/hooks/useSelectProductVariant';
import { useSyncDataUrl } from '@/hooks/useSyncDataUrl';
import AddToCartButton from '../../cart/AddToCartButton';
import { TDictionary } from '@/dictionaries';
import Skeleton from '../../loading/Skeleton';
import Typography from '../../Typography';
import { ToolkitProduct } from '@marulloc/shopify-next-api/v24.01/@toolkit-types';

type TProps = {
  product: ToolkitProduct;
  dict: TDictionary['product'];
};

const ProductOptions = ({ product, dict }: TProps) => {
  const [queryParams, navigateWithParams] = useSyncDataUrl({ keys: product.options.map((option) => option.name) });
  const [{ selectedOptions, selectedVariant }, selectOption] = useSelectVariant({ product, initialValue: queryParams });
  const dictionary = dict.VariantSelector;

  useEffect(() => {
    navigateWithParams(
      selectedOptions,
      product.options.map((option) => option.name),
    );
  }, [navigateWithParams, product.options, selectedOptions]);

  return (
    <div>
      <div className={classNames('pb-2 sm:pb-4 md:pb-6')}>
        <Typography as="h1" size="xl" color="default-accent" className={classNames('font-semibold mb-1')}>
          {product.title}
        </Typography>
        <Typography as="span" size="lg">
          <ProductPrice priceRange={product.priceRange} />
        </Typography>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <Typography
          as="h3"
          size="sm"
          color="default-muted"
          noWarn
          className={classNames('border-b text-right', 'border-default-muted', 'font-semibold mb-3')}
        >
          {dictionary.title}
        </Typography>
        {product.options.map((option, index) => (
          <fieldset key={`${product.title}-option-${option.name}`} className={classNames('my-2 sm:my-4 md:my-6')}>
            <legend className={classNames('pb-1 sm:pb-2 md:pb-3')}>
              <Typography as="span" size="sm" noWarn>{`${index + 1}. ${option.name}`}</Typography>
            </legend>
            <ul className={classNames(' flex md:grid flex-wrap md:grid-cols-4 gap-3')}>
              {option.values.map((value) => (
                <li key={`${option.name}_${value}`} className="relative h-full">
                  <input
                    className="sr-only peer"
                    type="radio"
                    value={value}
                    name={option.name}
                    id={`${option.name}_${value}`}
                    checked={selectedOptions[option.name] === value}
                    onChange={() => {}}
                  />
                  <label
                    htmlFor={`${option.name}_${value}`}
                    className={classNames(
                      'flex min-w-[48px] h-full items-center justify-center rounded-lg border px-3 py-2 text-sm ',
                      'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-primary-base',
                      'peer-checked:ring-2 peer-checked:ring-primary-base  ',
                      'cursor-pointer',
                    )}
                    onClick={() => selectOption(option.name, value)}
                  >
                    <Typography as="span" size="sm" noWarn color="default-accent" className=" ">
                      {value}
                    </Typography>
                  </label>
                  <div className="absolute hidden inset-0  peer-checked:block  " />
                </li>
              ))}
            </ul>
          </fieldset>
        ))}

        <div>
          <div className={classNames('my-4 border-b', 'border-default-muted')}></div>
          <div>
            <div className="mb-4">
              {selectedVariant && (
                <div>
                  <Typography as="p" size="sm" noWarn className={classNames('text-xs')}>
                    <span className={classNames('pb-1')}> {`Selected price : `} </span>
                    <span>&quot;{selectedVariant.title}&quot;</span>{' '}
                  </Typography>

                  <Typography size="2xl" color="primary-base" className="md:text-xl">
                    <Price currencyCode={selectedVariant.price.currencyCode} amount={selectedVariant.price.amount} />
                  </Typography>
                </div>
              )}
            </div>

            <div className="relative">
              <AddToCartButton
                variant={selectedVariant}
                className={({ state }) => {
                  return classNames(
                    'block w-full rounded-lg text-center py-3  shadow-lg',
                    state === 'notYet' && classNames('bg-secondary-muted text-secondary-contrast'),
                    state === 'soldOut' && classNames('bg-default-contrast  text-primary-contrast  '),
                    state === 'adding' && classNames('bg-primary-base text-primary-contrast'),
                    state === 'waiting' && classNames('bg-primary-base text-primary-contrast'),
                  );
                }}
              >
                {({ state, fullForm }) => (
                  <Typography size="lg">
                    {state === 'adding' ? (
                      <LoadingDots className="my-2 m-4" />
                    ) : (
                      <span className={classNames()}>{fullForm}</span>
                    )}
                  </Typography>
                )}
              </AddToCartButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(ProductOptions);

export const ProductOptionsSkeleton = () => {
  return (
    <div className={classNames('border-0  w-full lg:w-[500px]', 'p-4 sm:p-6 md:p-8')}>
      <div className={classNames('pb-2 sm:pb-4 md:pb-6')}>
        <div className="h-4 mb-2">
          <Skeleton />
        </div>
        <div className="h-4 w-1/3">
          <Skeleton />
        </div>
      </div>

      <div className={classNames('border-b   flex justify-end ', 'border-default-muted', 'font-semibold mb-3')}>
        <div className=" w-1/4 h-4 mb-2">
          <Skeleton />
        </div>
      </div>

      <ul className={classNames(' flex md:grid flex-wrap md:grid-cols-4 gap-3')}>
        <li className="w-full h-8 min-w-[48px]">
          <Skeleton />
        </li>{' '}
        <li className="w-full h-8 min-w-[48px]">
          <Skeleton />
        </li>{' '}
        <li className="w-full h-8 min-w-[48px]">
          <Skeleton />
        </li>{' '}
        <li className="w-full h-8 min-w-[48px]">
          <Skeleton />
        </li>
      </ul>

      <div>
        <div className={classNames('my-4 border-b', 'border-default-muted')}></div>
        <div className="w-full h-12 ">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};
