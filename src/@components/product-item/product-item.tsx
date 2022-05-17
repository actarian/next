
import { Card, Image, Text } from '@geist-ui/core';
import NextLink from 'next/link';

export default function ProductItem({ item }) {
  return (
    <>
      <NextLink href={item.slug}>
        <Card shadow hoverable width="100%" style={{ cursor: 'pointer' }}>
          <Image src={item.image} draggable={false} title={item.title} />
          <Text h4 my={0}>{item.title}</Text>
          <Text>{item.abstract}</Text>
        </Card>
      </NextLink>
    </>
  );
}
