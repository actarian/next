
import { Card, Image, Text } from '@geist-ui/core';
import NextLink from 'next/link';
import React from 'react';
import styles from './product-item.module.scss';

export default function ProductItem({ item, showImage = true }) {

  // const MyLink = React.forwardRef((props, ref) => <NextLink innerRef={ref} {...props} />);

  return (
    <>
      <Card shadow hoverable width="100%" style={{ cursor: 'pointer' }}>
        {showImage && <Image src={item.image} draggable={false} title={item.title} className={styles.image} />}
        <Text h4 my={0}>{<NextLink href={item.href}>{item.title}</NextLink>}</Text>
        <Text p>{item.abstract}</Text>
      </Card>
    </>
  );
}
