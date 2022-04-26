import React, { useState, FC } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useStyle, Rule } from '@pma/dex-wrapper';
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
  //TODO check with big list of data
  // height: '580px',
  // maxHeight: '580px',
  height: '530px',
};

export default InfinityScrollLoad;
