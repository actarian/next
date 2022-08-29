import { Breadcrumb, FilterRecap, FilterResult, FilterSidebar, Headline, Layout } from '@components';
import { asStaticProps, IEquatable } from '@core';
import { Grid, Note, Pagination } from '@geist-ui/core';
import { decode, Filter, filtersToParams, getFilters, getPaginationInfo, IFilter, setFilters, updateSearchParams, useLabel } from '@hooks';
import { filterProductItem, getFeatureTypes, getLayout, getPage, getTiles, ITile, PageProps } from '@models';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';

export default function ProductSearchSSR({ page, serializedFilters, pagination }: ProductSearchSSRProps) {

  // using router to update queryString searchParams
  const router = useRouter();

  // deserialize serialized filters to instances with methods
  const filters = serializedFilters.map(x => new Filter(x));

  // fires when user make a change on filters
  function onFilterChange(filter: Filter, values?: IEquatable[]) {
    filter.values = values || [];
    const params = filtersToParams(filters);
    const { pathname, query } = updateSearchParams(router.asPath, { filter: params, pagination: { page: 1 } });
    router.replace({ pathname, query });
  }

  // fires when user make a change on pagination
  function onPaginationChange(page: number) {
    const { pathname, query } = updateSearchParams(router.asPath, { pagination: { page } });
    router.replace({ pathname, query });
  }

  const label = useLabel();
  return (
    <>
      <Layout>

        <Breadcrumb items={page.breadcrumb} />

        <Headline title={page.title} abstract={page.abstract}></Headline>

        <Grid.Container gap={2} justify="flex-start">
          <Grid xs={24} sm={6} direction="column">

            <FilterSidebar filters={filters} onChange={onFilterChange}></FilterSidebar>

          </Grid>
          <Grid xs={24} sm={18} direction="column">

            <Note type="warning" label={false} marginBottom={1}>{label('product_search.items', { total: pagination.total })}</Note>

            <FilterRecap filters={filters} onChange={onFilterChange}></FilterRecap>

            {pagination.items &&
              <Grid.Container gap={2} justify="flex-start">
                {pagination.items.map((item) =>
                  <Grid xs={24} sm={12} md={8} key={item.id}>
                    <FilterResult item={item} showImage={false} />
                  </Grid>
                )}
              </Grid.Container>
            }

            {pagination.items &&
              <Grid.Container gap={2}>
                <Grid xs={24} padding={2} justify="center">
                  <Pagination count={pagination.pages} initialPage={pagination.page} page={pagination.page} onChange={(page: number) => onPaginationChange(page)}>
                    <Pagination.Previous>{label('pagination.prev')}</Pagination.Previous>
                    <Pagination.Next>{label('pagination.next')}</Pagination.Next>
                  </Pagination>
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
  serializedFilters: IFilter[];
  pagination: { page: number, pages: number, total: number, items: ITile[] };
}

export async function getServerSideProps(context: GetServerSidePropsContext<any>): Promise<GetServerSidePropsResult<ProductSearchSSRProps>> {

  const params = context.params;
  const query = context.query;

  // Layout
  const id = parseInt(params.id);
  const market = params.market;
  const locale = params.locale;
  const layout = await getLayout(market, locale);

  // Page
  const page = await getPage('product_search_ssr', id, market, locale);

  /*
  {
    title: 'Product Search',
    abstract: 'Product Search',
    description: 'Product Search',
    texts: [{
      key: 'title',
      value: 'Product Search',
    }, {
      key: 'abstract',
      value: 'Product Search',
      }]
    media: [{ type: 'hero' }],
    related: [{
      type: 'component',
      items: [{
        related: [{
          type: 'component',

        }]
      }],
    }],
    components: [{

    }],
    features: [{
    }]
  }
*/


  // Decode search params
  const searchParams = decode(context.query.params as string);

  // Search
  const items = await getTiles({ market, locale });
  const featureTypes = await getFeatureTypes({ market, locale });

  const filters = getFilters(items, featureTypes, filterProductItem, searchParams?.filter);
  const filteredItems = setFilters(items, filters);

  // Pagination
  let pagination = searchParams?.pagination || {};
  pagination = getPaginationInfo<ITile>(filteredItems, pagination.page, pagination.perPage);

  const props = asStaticProps({ params, query, layout, page, serializedFilters: filters, pagination });
  // console.log('ProductSearchSSR getStaticProps', props);
  return {
    props,
  };
}
