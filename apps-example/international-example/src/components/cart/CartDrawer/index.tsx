'use client';

import { classNames } from '@marulloc/components-library/utils';
import Drawer from '@marulloc/components-library/Drawer';
import React from 'react';
import { usePortalRecoil } from '@/hooks/portal-hooks';
import CartContents from './CartContents';
import SemanticBox from '@/components/SemanticBox';

const CartDrawer = () => {
  const [{ isActive }, { deactivate }] = usePortalRecoil('cart-drawer');

  return (
    <Drawer anchor="right" open={isActive} onClose={() => deactivate()}>
      <Drawer.Backdrop>
        {({ closeDrawer }) => (
          <SemanticBox
            fill="glassy-backdrop"
            onClick={() => closeDrawer()}
            className={classNames('isolate w-full h-full')}
          />
        )}
      </Drawer.Backdrop>

      <Drawer.Contents>{({ isOpen, closeDrawer }) => <CartContents closeDrawer={closeDrawer} />}</Drawer.Contents>
    </Drawer>
  );
};

export default CartDrawer;
