import { Button, Card, Image, Text } from '@geist-ui/core';
import { Heart, HeartFill } from '@geist-ui/icons';
import { useMounted, useWishlist } from '@hooks';
import { IProduct } from '@models';
import NextLink from 'next/link';
import React from 'react';
import styles from './product-item.module.scss';

export default function ProductItem({ item, showImage = true }: { item: IProduct, showImage?: boolean }) {

  const { has, toggle } = useWishlist();
  const added = has(item);

  // const MyLink = React.forwardRef((props, ref) => <NextLink innerRef={ref} {...props} />);

  const mounted = useMounted();

  return (
    <>
      <Card shadow hoverable width="100%" style={{ cursor: 'pointer', position: 'relative' }}>
        {showImage && <Image src={item.image} draggable={false} title={item.title} className={styles.image} />}
        {mounted &&
          <Button auto type="abort" padding={0} style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => toggle(item)}>{added ? <HeartFill /> : <Heart />}</Button>
        }
        <Text h4 my={0}>{<NextLink href={item.href || ''}>{item.title}</NextLink>}</Text>
        <Card.Footer>
          <Text p>{item.abstract}</Text>
        </Card.Footer>
      </Card>
    </>
  );
}
