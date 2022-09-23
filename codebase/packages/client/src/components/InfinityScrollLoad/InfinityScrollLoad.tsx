import React, { useState, FC } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useStyle, Rule, Styles, Button } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';

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
  loadOnScroll = true,
  threshold = 250,
  customStyles = {},
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [offSet, setOffSet] = useState<number>(0);

  const onScrollHandler = () => {
    if (loading) return;
    loadMore(limit, limit + offSet);
    setOffSet((prev) => prev + limit);
  };

  return (
    <div className={css(scrollWrapper, customStyles)}>
      <InfiniteScroll
        threshold={threshold}
        initialLoad={initialLoad}
        pageStart={pageStart}
        loadMore={() => {
          if (!loadOnScroll) return;
          if (loading) return;
          loadMore(limit, limit + offSet);
          setOffSet((prev) => prev + limit);
        }}
        hasMore={hasMore}
        useWindow={useWindow}
      >
        {
          <>
            {render()}
            {loading ? (
              <div className={css({ marginBottom: '20px' })}>
                <Spinner />
              </div>
            ) : (
              hasMore &&
              !loadOnScroll && (
                <Button styles={[buttonStyles]} onPress={onScrollHandler}>
                  {t('see_more', 'See more')}
                </Button>
              )
            )}
          </>
        }
      </InfiniteScroll>
    </div>
  );
};

const buttonStyles: Rule = ({ theme }) => ({
  marginBottom: '14px',
  display: 'inline-block',
  padding: '8px',
  marginLeft: '50%',
  transform: 'translateX(-50%)',
  lineHeight: 'none',
  background: 'transparent',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
});

const scrollWrapper: Rule = {
  overflow: 'auto',
  maxHeight: '1084px',
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
