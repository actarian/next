import { IEquatable } from '@core';
import { Button, Image, Text } from '@geist-ui/core';
import { Trash } from '@geist-ui/icons';
import { useCart, useMounted } from '@hooks';
import { usePrice } from '@pipes';
import NextLink from 'next/link';
import React from 'react';
import styles from './cart-mini-item.module.scss';

export type ICartMiniItem = {
  id: IEquatable;
  schema: string;
  image: string;
  title: string;
  href: string;
  price: number;
  qty: number;
}

export default function CartMiniItem({ item }: { item: ICartMiniItem }) {

  const price = usePrice(item.price * item.qty);

  const { add, remove } = useCart();

  const mounted = useMounted();
  return (
    <>
      <div className={styles.card}>
        {<Image className={styles.image} width="80px" height="80px" src={item.image} draggable={false} title={item.title} />}
        <div className={styles.info}>
          <div className={styles.row}>
            <Text my={0}>{item.qty}</Text>
            <Text paddingLeft={1} paddingRight={1}>x</Text>
            <Text className={styles.text} my={0}>{<NextLink href={item.href || ''}>{item.title}</NextLink>}</Text>
          </div>
          <div className={styles.row}>
            <Text my={0}>{price}</Text>
          </div>
        </div>
        {mounted &&
          <Button className={styles.button} auto type="abort" padding={0} onClick={() => remove(item)}>{<Trash />}</Button>
        }
      </div>
    </>
  );
}
