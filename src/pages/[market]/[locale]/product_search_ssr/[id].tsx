import Breadcrumb from '@components/breadcrumb/breadcrumb';
import { FilterRecap } from '@components/filter/filter-recap';
import { FilterSidebar } from '@components/filter/filter-sidebar';
import Headline from '@components/headline/headline';
import ProductItem from '@components/product-item/product-item';
import Layout from '@components/_layout';
import { IEquatable } from '@core/entity/entity';
import { asStaticProps } from '@core/utils';
import { Grid, Note, Pagination } from '@geist-ui/core';
import { Filter, IFilter } from '@hooks/useFilters/filter';
import { filtersToParams, getFilters, setFilter } from '@hooks/useFilters/filter.service';
import { decode, pushSearchParams } from '@hooks/useSearchParams/useSearchParams';
import { getFeatureTypes } from '@models/feature_type/feature_type.service';
import { getLayout } from '@models/layout/layout.service';
import { PageProps } from '@models/page/page';
import { getPage } from '@models/page/page.service';
import { filterProductItem } from '@models/product_search/product_search.service';
import { ITile } from '@models/tile/tile';
import { getTiles } from '@models/tile/tile.service';
import { useRouter } from 'next/router';

export default function ProductSearchSSR({ page, ssrFilters, values, pagination }: ProductSearchSSRProps) {
  if (!page) {
    return;
  }

  const router = useRouter();

  const filters = ssrFilters.map(x => new Filter(x));

  const onFilterSidebarDidChange = (filter, values) => {
    filter.values = values || [];
    const params = filtersToParams(filters);
    pushSearchParams(router, 'filter', params);
  };

  const setPagination = (page: number) => {
    pushSearchParams(router, 'pagination', { page });
  };

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

            <Note type="warning" marginBottom={1}>{pagination.total} items found</Note>

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
                  <Pagination count={pagination.pages} initialPage={pagination.page} onChange={setPagination} />
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

export interface ProductSearchSSRProps extends PageProps {
  values: IEquatable[][];
  ssrFilters: IFilter[];
  pagination: { page: number, pages: number, total: number, items: ITile[] };
}

export async function getServerSideProps(context) {

  // Layout
  const params = context.params;
  const id = parseInt(params.id);
  const market = params.market;
  const locale = params.locale;
  const layout = await getLayout(market, locale);

  // Page
  const page = await getPage('product_search_ssr', id, market, locale);

  // Search
  const query = context.query;
  const tiles = await getTiles({ market, locale });
  const featureTypes = await getFeatureTypes({ market, locale });

  const filterParams = (query && query.params) ? decode(query.params, 'filter') : null;
  const pagination = (query && query.params ? decode(query.params, 'pagination') : null) || {};

  const filters = getFilters(tiles, featureTypes, filterProductItem, filterParams);
  const filteredItems = setFilter(tiles, filters);
  const items = filteredItems;
  const values = filters.map(x => x.values);



  pagination.page = pagination.page || 0;
  pagination.total = items.length;
  pagination.pages = Math.ceil(pagination.total / 15);
  pagination.items = filteredItems.slice(pagination.page * 15, Math.min(filteredItems.length, (pagination.page + 1) * 15));

  const props = asStaticProps({ params, query, layout, page, values, ssrFilters: filters, pagination });
  // console.log('ProductSearchSSR getStaticProps', props);
  return {
    props,
  };
}
