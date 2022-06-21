import { Button, Card, Grid, Spacer, Text } from '@geist-ui/core';
import { ArrowLeft } from '@geist-ui/icons';
import { useLabel } from '@hooks';
import { useRouter } from 'next/router';

export default function Headline({ title, abstract }: { title?: string, abstract?: string }) {
  const router = useRouter();
  const label = useLabel();
  return (
    <>
      <Grid.Container gap={1.5}>
        <Grid xs={24} justify="center">
          <Card width="100%">
            <Text h4 my={0}>{title}</Text>
            <Text p>{abstract}</Text>
            <Card.Footer>
              <Button icon={<ArrowLeft />} auto onClick={() => router.back()}>{label('navigation.back')}</Button>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer h={.5} />
    </>
  );
}
