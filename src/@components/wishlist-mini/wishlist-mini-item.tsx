import { Button, Image, Text } from '@geist-ui/core';
import { Heart, HeartFill } from '@geist-ui/icons';
import { useMounted, useUI, useWishlist } from '@hooks';
import { IProduct } from '@models';
import NextLink from 'next/link';
import React from 'react';
import styles from './wishlist-mini-item.module.scss';

export default function WishlistMiniItem({ item }: { item: IProduct }) {

  const { has, toggle } = useWishlist();
  const added = has(item);

  const reduceUI = useUI(state => state.reduce);

  function onSetDrawer(value?: string) {
    reduceUI((state) => ({ drawer: value }));
  }

  const closeDrawer = () => {
    return onSetDrawer();
  };

  const mounted = useMounted();
  return (
    <>
      <div className={styles.card}>
        {<Image className={styles.image} width="80px" height="80px" src={item.image} draggable={false} title={item.title} />}
        <Text className={styles.text} my={0} onClick={closeDrawer}>{<NextLink href={item.href || ''}>{item.title}</NextLink>}</Text>
        {mounted &&
          <Button className={styles.button} auto type="abort" padding={0} onClick={() => toggle(item)}>{added ? <HeartFill color="white" /> : <Heart />}</Button>
        }
      </div>
    </>
  );
}
