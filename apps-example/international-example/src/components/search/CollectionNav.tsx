import CollectionList from '@/components/collection/CollectionList';
import Skeleton from '@/components/loading/Skeleton';
import { delay } from '@/utils/asyncUtils';
import { getCollections } from '@marulloc/shopify-next-api/v24.01/services';
import { Suspense } from 'react';

type TCollectionNavProps = {
  locale: { country: string; language: string };
};

const CollectionNavWrapper = async ({ locale }: TCollectionNavProps) => {
  return (
    <>
      <h3 className="text-xs font-semibold leading-6 text-default-muted">All Collections</h3>
      <div className="mt-2">
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="w-full h-4">
                <Skeleton />
              </div>
              <div className="w-full h-4">
                <Skeleton />
              </div>
              <div className="w-full h-4">
                <Skeleton />
              </div>
            </div>
          }
        >
          <CollectionNav locale={locale} />
        </Suspense>
      </div>
    </>
  );
};

export default CollectionNavWrapper;

const CollectionNav = async ({ locale }: TCollectionNavProps) => {
  // await delay(1000);
  const collections = await getCollections(locale);

  return <CollectionList collections={collections} variant="small" />;
};
