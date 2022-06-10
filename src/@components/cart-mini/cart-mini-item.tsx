import { Button, Image, Text } from '@geist-ui/core';
import { Trash } from '@geist-ui/icons';
import { useCart, useMounted } from '@hooks';
import { IProduct } from '@models';
import { usePrice } from '@pipes';
import NextLink from 'next/link';
import React from 'react';
import styles from './cart-mini-item.module.scss';

export default function CartMiniItem({ item }: { item: IProduct }) {

  const price = usePrice(item.price);

  const { add, remove } = useCart();

  const mounted = useMounted();
  return (
    <>
      <div className={styles.card}>
        {<Image className={styles.image} width="80px" height="80px" src={item.image} draggable={false} title={item.title} />}
        <Text className={styles.text} my={0}>{<NextLink href={item.href || ''}>{item.title}</NextLink>}</Text>
        <Text my={0}>{price}</Text>
        {mounted &&
          <Button className={styles.button} auto type="abort" padding={0} onClick={() => remove(item)}>{<Trash />}</Button>
        }
      </div>
    </>
  );
}
