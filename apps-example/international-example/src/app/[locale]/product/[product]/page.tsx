import { getProduct } from '@/@marulloc-shopify-nextapi/v24.01/services/product/service';
import { localTheme } from '@/theme/local-theme';
import { splitLocale } from '@/utils/locale';
import { classNames } from '@marulloc/components-library/utils';
import { Metadata } from 'next';
import ImageGallery, { ImageGallerySkeleton } from './ImageGallery';
import Description, { DescriptionSkeleton } from './Description';
import Recommendations, { RecommendationsSkeleton } from './Recommendations';
import ProductOptions, { ProductOptionsSkeleton } from './ProductOptions';
import { Suspense } from 'react';

type TParams = { locale: string; product: string };

export const generateMetadata = async ({ params }: { params: TParams }): Promise<Metadata> => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { product: handle } = params;

  const product = await getProduct(handle, { country: countryCode, language: languageCode });

  return {};
};

const ProductPage = async ({ params }: { params: TParams }) => {
  const { countryCode, languageCode } = splitLocale(params.locale);
  const { product: handle } = params;

  return (
    <main className={classNames(' relative min-h-screen  ')}>
      <div className="flex flex-col lg:flex-row">
        <div className={classNames('h-full flex-1 lg:border-r', localTheme.border.base.main)}>
          <section
            className={classNames(
              'block',
              localTheme.fill.base.main + ' bg-opacity-40 backdrop-blur-sm',
              localTheme.border.base.main + ' border-b',
            )}
          >
            <Suspense fallback={<ImageGallerySkeleton />}>
              <ImageGallery handle={handle} locale={{ country: countryCode, language: languageCode }} />
            </Suspense>
          </section>

          <section
            className={classNames(
              'block lg:hidden ',
              localTheme.fill.base.main + ' bg-opacity-40 backdrop-blur-sm',
              localTheme.border.base.main + ' border-b',
            )}
          >
            <Suspense fallback={<ProductOptionsSkeleton />}>
              <ProductOptions handle={handle} locale={{ country: countryCode, language: languageCode }} />
            </Suspense>
          </section>

          <section className={classNames()}>
            <Suspense fallback={<DescriptionSkeleton />}>
              <Description handle={handle} locale={{ country: countryCode, language: languageCode }} />
            </Suspense>
          </section>
        </div>

        <div>
          <section className={classNames(' hidden lg:block sticky top-16 flex-shrink-0')}>
            <Suspense fallback={<ProductOptionsSkeleton />}>
              <ProductOptions handle={handle} locale={{ country: countryCode, language: languageCode }} />
            </Suspense>
          </section>
        </div>
      </div>

      <section className={classNames('border-t ', localTheme.border.base.main)}>
        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations handle={handle} locale={{ country: countryCode, language: languageCode }} />
        </Suspense>
      </section>
    </main>
  );
};

export default ProductPage;
