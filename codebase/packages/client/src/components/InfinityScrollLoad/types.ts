import { CSSProperties } from 'react';
import { Rule, Styles } from '@pma/dex-wrapper';

export type ScrollProps = {
  loadMore: (limit: number, start: number) => void;
  limit: number;
  loading?: boolean;
  useWindow?: boolean;
  initialLoad?: boolean;
  pageStart?: number;
  render: () => JSX.Element;
  hasMore: boolean;
  id?: string;
  loadOnScroll?: boolean;
  threshold?: number;
  customStyles?: Rule | CSSProperties | Styles | {};
};
