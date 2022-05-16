import { Button } from '@strapi/design-system/Button';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import { ArrowLeft, Pencil, Plus } from '@strapi/icons';
import { useRouter } from 'next/router';
import React from 'react';

export default function Headline({ title, abstract }) {
  const router = useRouter()
  return (
    <BaseHeaderLayout title={title} subtitle={abstract} as="h2"
      navigationAction={<Button startIcon={<ArrowLeft />} onClick={() => router.back()}>Go back</Button>}
      primaryAction={false ? <Button startIcon={<Plus />}>Add an entry</Button> : null}
      secondaryAction={false ? <Button variant="tertiary" startIcon={<Pencil />}>Edit</Button> : null}
    />
  );
}
