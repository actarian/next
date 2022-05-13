
import { Box } from '@strapi/design-system/Box';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductItem({ item }) {
  return (
    <Box padding={0}>
      <Box padding={0} style={{ textAlign: 'center' }}>
        <Image alt={item.title} src={item.image} layout="intrinsic" width={200} height={200} />
      </Box>
      <Box padding={2} style={{ textAlign: 'center' }}>
        <Link href={item.slug}>{item.title}</Link>
      </Box>
    </Box>
  );
}
/*
import { Card, CardAction, CardAsset, CardBadge, CardBody, CardCheckbox, CardContent, CardHeader, CardSubtitle, CardTimer, CardTitle } from '@strapi/design-system/Card';
import { IconButton } from '@strapi/design-system/IconButton';
import { Heart } from '@strapi/icons';
import Link from 'next/link';

export default function ProductItem({ item }) {
  return (
    <Card style={{ width: '240px' }} id="first">
      <CardHeader>
        <CardCheckbox value={false} />
        <CardAction position="end">
          <IconButton label="Add to favourite" icon={<Heart />} />
        </CardAction>
        <CardAsset src={item.image} />
        <CardTimer>{item.price.toString()}</CardTimer>
      </CardHeader>
      <CardBody>
        <CardContent>
          <Link href={item.slug} passHref>
            <CardTitle>{item.title}</CardTitle>
          </Link>
          <CardSubtitle>{item.price.toString()}</CardSubtitle>
        </CardContent>
        <CardBadge>Doc</CardBadge>
      </CardBody>
    </Card>
  );
}
*/
/*

    <Box paddingLeft={10} paddingRight={10} background="neutral100">
      <Link href={item.slug}>{item.title}</Link>
    </Box>
*/
