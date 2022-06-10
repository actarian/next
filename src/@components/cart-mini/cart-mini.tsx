
import { apiGet } from '@core';
import { Drawer } from '@geist-ui/core';
import { useCart, useLayout } from '@hooks';
import { IProduct } from '@models';
import React, { ReactNode, useEffect, useState } from 'react';
import CartMiniItem from './cart-mini-item';

export default function CartMini({ children, visible, onClose }: CartMiniProps) {

  const { locale } = useLayout();
  const { items } = useCart();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (visible) {
      // declare the data fetching function
      const fetchData = async () => {
        const data = await apiGet(`/product?locale=${locale}`) as IProduct[];
        if (data) {
          const products = data.filter(x => items.find(w => w.schema === x.schema && w.id === x.id) != null);
          setProducts(products);
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
        {products && products.map((product, i) =>
          <CartMiniItem key={i} item={product} />
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
