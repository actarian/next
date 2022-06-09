
import { Breadcrumb, FilterRecap, FilterResult, FilterSidebar, Headline, Layout } from '@components';
import { asStaticProps, IEquatable } from '@core';
import { Grid, Note, Pagination } from '@geist-ui/core';
import { Filter, filtersToParams, useFilters, usePagination, useSearchParams } from '@hooks';
import { filterProductItem, getFeatureTypes, getLayout, getPage, getStaticPathsForSchema, getTiles, IFeatureType, ITile, PageProps } from '@models';
import { GetStaticPropsContext } from 'next/types';
import { useCallback } from 'react';

export default function ProductSearchCSR({ page, items, featureTypes }: ProductSearchCSRProps) {

  // deserialize queryString encoded params
  const { params, replaceParamsSilently } = useSearchParams();

  // using item filter callback from service
  const filterItem = useCallback(filterProductItem, []);

  // initialize filters with items, featureTypes and queryString params
  const filterParams = params && params.filter;
  const { filteredItems, filters, setFilter } = useFilters<ITile>(items, featureTypes, filterItem, filterParams);

  // initialize pagination with filteredItems and queryString params
  const paginationParams = (params && params.pagination) || {};
  const pagination = usePagination<ITile>(filteredItems, paginationParams.page, paginationParams.perPage);

  // fires when user make a change on filters
  function onFilterChange(filter: Filter, values?: IEquatable[]) {
    // console.log('ProductSearchCSR.onFilterChange', filter, values);
    setFilter(filter, values);
    pagination.goToPage(1);
    // serializing querystring filter
    const filterParams = filtersToParams(filters);
    replaceParamsSilently({ filter: filterParams, pagination: { page: 1 } });
  };

  // fires when user make a change on pagination
  function onPaginationChange(page: number) {
    pagination.goToPage(page);
    // serializing querystring pagination
    replaceParamsSilently({ pagination: { page } });
  };

  /*
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
  */

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

            <Note type="warning" label={false} marginBottom={1}>{filteredItems.length} items found</Note>

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
                  <Pagination count={pagination.pages} initialPage={pagination.page} page={pagination.page} onChange={onPaginationChange} />
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
  items: ITile[];
  featureTypes: IFeatureType[];
}

export async function getStaticProps(context: GetStaticPropsContext<any>) {

  // Layout
  const id = parseInt(context.params.id);
  const market = context.params.market;
  const locale = context.params.locale;
  const layout = await getLayout(market, locale);

  // Page
  const page = await getPage('product_search_csr', id, market, locale);

  // Search
  const items = await getTiles({ market, locale });
  const featureTypes = await getFeatureTypes({ market, locale });

  const props = asStaticProps({ ...context, layout, page, items, featureTypes });
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
