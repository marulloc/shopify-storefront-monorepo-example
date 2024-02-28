import { ToolkitPredictiveSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-search';
import { getPredictiveSearch } from '@/@marulloc-shopify-nextapi/v24.01/services/search/service';
import { useCallback, useEffect, useState } from 'react';

/**
 *
 * @returns
 */
export const usePredictiveSearch = ({ locale }: { locale?: { country: string; language: string } }) => {
  const [status, setStatus] = useState<'pending' | 'loaded'>('pending');
  const [predictiveResult, setPredictiveResult] = useState<ToolkitPredictiveSearch>({ products: [], collections: [] });

  useEffect(() => {
    (async () => {
      setStatus('pending');
      const { products, collections } = await getPredictiveSearch('', {
        country: locale?.country,
        language: locale?.language,
      });
      setPredictiveResult({ products, collections });
      setStatus('loaded');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const predictiveSearch = useCallback(
    async (value: string) => {
      setStatus('pending');
      const { products, collections } = await getPredictiveSearch(value, {
        country: locale?.country,
        language: locale?.language,
      });
      setPredictiveResult({ products, collections });
      setStatus('loaded');
    },
    [locale?.country, locale?.language],
  );

  return [{ predictiveResult, status }, predictiveSearch] as const;
};
