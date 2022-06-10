
import { apiGet } from '@core';
import { Drawer } from '@geist-ui/core';
import { useCart, useLayout } from '@hooks';
import { IProduct } from '@models';
import React, { ReactNode, useEffect, useState } from 'react';
import CartMiniItem, { ICartMiniItem } from './cart-mini-item';

export default function CartMini({ children, visible, onClose }: CartMiniProps) {

  const { locale } = useLayout();
  const { items } = useCart();
  const [cartItems, setCartItems] = useState<ICartMiniItem[]>([]);

  useEffect(() => {
    if (visible) {
      // declare the data fetching function
      const fetchData = async () => {
        const products = await apiGet(`/product?locale=${locale}`) as IProduct[];
        if (products) {
          const cartItems = items.map(x => {
            const product = products.find(p => p.schema === x.schema && p.id === x.id);
            if (product) {
              return {
                ...product,
                ...x,
              };
            } else {
              return null;
            }
          }).filter(x => x !== null) as ICartMiniItem[];
          setCartItems(cartItems);
        }
      };
      fetchData().catch(console.error);
    }
  }, [visible, items]);

  return (
    <Drawer visible={visible} onClose={onClose} placement="right">
      <Drawer.Title>Cart</Drawer.Title>
      <Drawer.Subtitle>{items.length} items found</Drawer.Subtitle>
      <Drawer.Content>
        {cartItems && cartItems.map((item, i) =>
          <CartMiniItem key={i} item={item} />
        )}
      </Drawer.Content>
    </Drawer>
  )
}

export interface CartMiniProps {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
}
