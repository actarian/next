import Breadcrumb from '@components/breadcrumb/breadcrumb';
import { FilterRecap } from '@components/filter/filter-recap';
import { FilterSidebar } from '@components/filter/filter-sidebar';
import Headline from '@components/headline/headline';
import ProductItem from '@components/product-item/product-item';
import Layout from '@components/_layout';
import { asStaticProps } from '@core/utils';
import { Grid, Note, Pagination } from '@geist-ui/core';
import { useApiGet } from '@hooks/useApi/useApi';
import { useFilters } from '@hooks/useFilters/useFilters';
import { usePagination } from '@hooks/usePagination/usePagination';
import { IFeatureType } from '@models/feature_type/feature_type';
import { getFeatureTypes } from '@models/feature_type/feature_type.service';
import { getLayout } from '@models/layout/layout.service';
import { PageProps } from '@models/page/page';
import { getPage } from '@models/page/page.service';
import { filterProductItem } from '@models/product_search/product_search.service';
import { getStaticPathsForSchema } from '@models/route/route.service';
import { ITile } from '@models/tile/tile';
import { getTiles } from '@models/tile/tile.service';
import { useCallback } from 'react';

export default function ProductSearchCSR({ layout, page, tiles, featureTypes, params }: ProductSearchCSRProps) {

  if (!page) {
    return;
  }

  const filterItem = useCallback(filterProductItem, []);

  const { filteredItems, filters, setFilter, values } = useFilters<ITile>(tiles, featureTypes, filterItem);

  const pagination = usePagination<ITile>(filteredItems);

  const onFilterSidebarDidChange = (filter, values) => {
    console.log('ProductSearchCSR.onFilterSidebarDidChange', filter, values);
    setFilter(filter, values);
    pagination.goToPage(0);
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
            title: `${x.collection.name} ${x.tile.name}`,
            abstract: `${minimal.size} ${minimal.finish}`,
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
          <Grid xs={24} sm={6} direction="column">

            <FilterRecap filters={filters} onChange={onFilterSidebarDidChange}></FilterRecap>

            <FilterSidebar filters={filters} values={values} onChange={onFilterSidebarDidChange}></FilterSidebar>

          </Grid>
          <Grid xs={24} sm={18} direction="column">

            <Note type="warning" marginBottom={1}>{filteredItems.length} items found</Note>

            {pagination.items &&
              <Grid.Container gap={2} justify="flex-start">
                {pagination.items.map((item) =>
                  <Grid xs={24} sm={12} md={8} key={item.id}>
                    <ProductItem item={item} showImage={false} />
                  </Grid>
                )}
              </Grid.Container>
            }

            {pagination.items &&
              <Grid.Container gap={2}>
                <Grid xs={24} padding={2} justify="center">
                  <Pagination count={pagination.pages} initialPage={pagination.page} onChange={(page: number) => pagination.goToPage(page)} />
                </Grid>
              </Grid.Container>
            }

            {/*pagination.page < pagination.pages &&
              <Grid.Container gap={2}>
                <Grid xs={24} padding={2} justify="center">
                  <Button type="success" ghost auto onClick={pagination.nextPage}>View More</Button>
                </Grid>
              </Grid.Container>
          */}

          </Grid>
        </Grid.Container>

      </Layout>
    </>
  )
}

export interface ProductSearchCSRProps extends PageProps {
  tiles: ITile[];
  featureTypes: IFeatureType[];
}

export async function getStaticProps(context) {
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);
  const page = await getPage('product_search_csr', id, market, locale);
  const tiles = await getTiles({ market, locale });
  const featureTypes = await getFeatureTypes({ market, locale });
  const props = asStaticProps({ ...context, layout, page, tiles, featureTypes });
  // console.log('ProductSearchCSR getStaticProps', props);
  return {
    props,
  };
}

export async function getStaticPaths() {
  const paths = await getStaticPathsForSchema('product_search_csr');
  return {
    paths,
    fallback: true,
  };
}
