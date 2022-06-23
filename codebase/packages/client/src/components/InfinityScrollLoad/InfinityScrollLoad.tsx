import React, { useState, FC } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useStyle, Rule, Styles } from '@pma/dex-wrapper';
import { ScrollProps as Props } from './types';

const InfinityScrollLoad: FC<Props> = ({
  loadMore,
  limit,
  loading,
  useWindow = false,
  initialLoad = false,
  pageStart = 0,
  hasMore,
  render,
}) => {
  const { css } = useStyle();
  const [offSet, setOffSet] = useState<number>(0);

  return (
    <div className={css(scrollWrapper)}>
      <InfiniteScroll
        initialLoad={initialLoad}
        pageStart={pageStart}
        loadMore={() => {
          if (loading) return;
          loadMore(limit, limit + offSet);
          setOffSet((prev) => prev + limit);
        }}
        hasMore={hasMore}
        useWindow={useWindow}
      >
        {render()}
      </InfiniteScroll>
    </div>
  );
};

const scrollWrapper: Rule = {
  overflow: 'auto',
  maxHeight: '604px',
  '&::-webkit-scrollbar': {
    width: '14px',
  },
  '&::-webkit-scrollbar-thumb': {
    border: '4px solid rgba(0, 0, 0, 0)',
    backgroundClip: 'padding-box',
    borderRadius: '100vmax',
    backgroundColor: 'rgba(134,134,134,255)',
  },
} as Styles;

export default InfinityScrollLoad;
