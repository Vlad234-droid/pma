export type ScrollProps = {
  loadMore: (limit: number, start: number) => void;
  limit: number;
  loading?: boolean;
  useWindow?: boolean;
  initialLoad?: boolean;
  pageStart?: number;
  render: () => JSX.Element;
  hasMore: boolean;
};
