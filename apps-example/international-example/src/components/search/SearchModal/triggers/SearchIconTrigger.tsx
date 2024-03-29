'use client';

import { classNames } from '@marulloc/components-library/utils';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import IconButton from '@/components/IconButton';

import { useSetPortalRecoil } from '@/hooks/portal-hooks';
import { useGetDictioanry } from '@/hooks/locale-hooks';
const SearchIconTrigger = () => {
  const { activate } = useSetPortalRecoil('search-modal');
  const dictionary = useGetDictioanry().search.SearchIconTrigger;

  return (
    <IconButton className={classNames(' text-default-muted hover:text-default-accent p-2')} onClick={() => activate()}>
      <HiOutlineMagnifyingGlass className="h-6 w-6" aria-hidden="true" />
      <span className="sr-only">{dictionary.sr}</span>
    </IconButton>
  );
};

export default SearchIconTrigger;
