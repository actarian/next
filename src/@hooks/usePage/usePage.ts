import { IPageContext, PageContext } from '@models/page/page.provider';
import { useContext } from 'react';

export function usePage() {
  const { page } = useContext<IPageContext>(PageContext);
  return page;
}
