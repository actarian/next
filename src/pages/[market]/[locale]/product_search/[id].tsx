import Breadcrumb from '@components/breadcrumb/breadcrumb';
import { FilterSidebar } from '@components/filter/filter-sidebar';
import Headline from '@components/headline/headline';
import ProductItem from '@components/product-item/product-item';
import Layout from '@components/_layout';
import { IEquatable } from '@core/entity/entity';
import { asStaticProps } from '@core/utils';
import { Button, Grid, Note } from '@geist-ui/core';
import { useApiGet } from '@hooks/useApi/useApi';
import { useFilters } from '@hooks/useFilters/useFilters';
import { IFeatureType } from '@models/feature_type/feature_type';
import { getFeatureTypes } from '@models/feature_type/feature_type.service';
import { getLayout } from '@models/layout/layout.service';
import { PageProps } from '@models/page/page';
import { getPage } from '@models/page/page.service';
import { getStaticPathsForSchema } from '@models/route/route.service';
import { ITile } from '@models/tile/tile';
import { getTiles } from '@models/tile/tile.service';
import { useCallback } from 'react';

export default function ProductSearch({ layout, page, tiles, featureTypes, params }: ProductSearchProps) {

  if (!page) {
    return;
  }

  const filterMap = useCallback((key: string, item: ITile, value: IEquatable) => {
    switch (key) {
      case 'title':
        return item.title.toLowerCase().includes(value.toString().toLowerCase());
      default:
        return item.featureIds.includes(value);
    }
  }, []);

  const { visibleItems, filters, setFilter, values, hasMore, viewMore, total } = useFilters(tiles, featureTypes, filterMap);

  const onFilterSidebarDidChange = (filter, values) => {
    console.log('ProductSearch.onFilterSidebarDidChange', filter, values);
    setFilter(filter, values);
  };

  if (false) {
    const { response: items } = useApiGet('/tiles');
    if (items) {
      const mappedItems = [];
      (items as any[]).forEach(x => {
        x.minimals.forEach((minimal, i) => {
          mappedItems.push({
            id: `${x.id}-${minimal.finish}-${minimal.size}-${i}`,
            schema: "tile",
            categoryId: x.collection.id,
            categoryName: x.collection.name,
            title: x.tile.name,
            image: x.tile.image,
            href: minimal.url,
            finish: minimal.finish,
            size: minimal.size,
            featureIds: minimal.features,
          });
        });
      });
      console.log('mappedItems', JSON.stringify(mappedItems));
    }
  }

  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

        <Grid.Container gap={2} justify="flex-start">
          <Grid xs={24} sm={8}>

            <FilterSidebar filters={filters} values={values} onChange={onFilterSidebarDidChange}></FilterSidebar>

          </Grid>
          <Grid xs={24} sm={16} direction="column">

            <Note type="warning" marginBottom={1}>{total} items found</Note>

            {visibleItems &&
              <Grid.Container gap={2} justify="flex-start">
                {visibleItems.map((item) =>
                  <Grid xs={24} sm={12} md={8} key={item.id}>
                    <ProductItem item={item} />
                  </Grid>
                )}
              </Grid.Container>
            }

            {hasMore &&
              <Grid.Container gap={2}>
                <Grid xs={24} padding={2} justify="center">
                  <Button type="success" ghost auto onClick={viewMore}>View More</Button>
                </Grid>
              </Grid.Container>
            }

          </Grid>
        </Grid.Container>

      </Layout>
    </>
  )
}

export interface ProductSearchProps extends PageProps {
  tiles: ITile[];
  featureTypes: IFeatureType[];
}

export async function getStaticProps(context) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage('product_search', id, market, locale);
  const tiles = await getTiles({ market, locale });
  const featureTypes = await getFeatureTypes({ market, locale });
  const props = asStaticProps({ ...context, layout, page, tiles, featureTypes });
  // console.log('ProductSearch getStaticProps', props);
  return {
    props,
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('product_search');
  return {
    paths,
    fallback: true,
  };
}
