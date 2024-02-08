import { Fragment, useState } from 'react';
import { classNames } from '@marulloc/components-library/utils';
import { HiMenu, HiOutlineSearch, HiOutlineShoppingBag } from 'react-icons/hi';
import CartTriggerIcon from './cart/triggers/CartIconTrigger';
import MenuIconTrigger from './menu/triggers/MenuIconTrigger';
import { ShopifyLocaleContext } from '@/@marulloc-shopify-nextapi/v24.01/@shopify-types/shopify-common';
import { getMenu } from '@/@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { splitLocale } from '@/utils/locale';
import { getCollections } from '@/@marulloc-shopify-nextapi/v24.01/services/collection/service';

type Props = {
  locale?: ShopifyLocaleContext;
};

const Header = async ({ locale }: Props) => {
  const menu = await getMenu('custom-storefront-menu', { country: locale?.country, language: locale?.language });
  const collections = await getCollections();

  return (
    <div className="fixed top-0 w-full z-30 ">
      <header
        className={classNames('max-w-7xl mx-auto ', 'bg-opacity-20', 'backdrop-blur-sm ', 'shadow-md ', 'bg-slate-100')}
      >
        <nav aria-label="Top">
          {/* Secondary navigation */}
          <div className="  ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className=" ">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center   font-bold text-xl">
                    <a href="#">
                      <span className="sr-only">Your Company</span>
                      Marulloc
                    </a>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <MenuIconTrigger menu={menu} collections={collections} />
                  </div>

                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Marulloc</span>
                    Marulloc
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <a href="#" className="-m-2 p-2 ">
                            <span className="sr-only">Search</span>
                            <HiOutlineSearch className="h-6 w-6" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                      <div className="flow-root">
                        <CartTriggerIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;