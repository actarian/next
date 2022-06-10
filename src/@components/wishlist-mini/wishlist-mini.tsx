
import { apiGet } from '@core';
import { Drawer } from '@geist-ui/core';
import { useLayout, useWishlist } from '@hooks';
import { IProduct } from '@models';
import React, { ReactNode, useEffect, useState } from 'react';
import WishlistMiniItem from './wishlist-mini-item';

export default function WishlistMini({ children, visible, onClose }: WishlistMiniProps) {
  const { locale } = useLayout();
  const { items } = useWishlist();
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
  }, [visible]);

  return (
    <Drawer visible={visible} onClose={onClose} placement="right">
      <Drawer.Title>Wishlist</Drawer.Title>
      <Drawer.Subtitle>{items.length} items found</Drawer.Subtitle>
      <Drawer.Content>
        {products && products.map((product) =>
          <WishlistMiniItem item={product} />
        )}
      </Drawer.Content>
    </Drawer>
  )
}

export interface WishlistMiniProps {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
}
