import React, { useState, useEffect, FC } from 'react';
import { Rule, useStyle, Styles } from '@pma/dex-wrapper';
import { Item } from './components';
import ReactPaginate from 'react-paginate';
import { Icon } from 'components/Icon';

const TablePaginator: FC<{
  itemsPerPage: number;
  data: Array<Record<string, string | number | null>>;
  Element: FC<any>;
  tableTitles: Array<string>;
}> = ({ itemsPerPage, data, Element, tableTitles }) => {
  const { css } = useStyle();
  const [currentItems, setCurrentItems] = useState<any>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className={css(paginatorContainer)}>
      <Item currentItems={currentItems} Element={Element} tableTitles={tableTitles} />
      <ReactPaginate
        breakLabel='...'
        nextLabel={<Icon graphic={'arrowRightPaginator'} iconStyles={{ marginTop: '-5px', marginRight: '5px' }} />}
        previousLabel={<Icon graphic={'arrowLeftPaginator'} iconStyles={{ marginRight: '5px', marginTop: '-5px' }} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        //@ts-ignoreI
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

const paginatorContainer: Rule = ({ theme }) =>
  ({
    overflow: 'hidden',
    '> ul': {
      display: 'inline-flex',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing.s0,
      margin: `${theme.font.fixed.f16.fontSize} 50% ${theme.spacing.s0} 50%`,
      maxHeight: theme.font.fixed.f32.fontSize,
      transform: 'translateX(-50%)',
    },
    '> ul:first-child': {
      listStyleType: 'none',
    },
    '> ul:last-child': {
      listStyleType: 'none',
    },
    '> ul li': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      width: theme.font.fixed.f32.fontSize,
      height: theme.font.fixed.f32.fontSize,
      borderRadius: '3px',
      color: theme.colors.tescoBlue,
      '& path': {
        fill: theme.colors.grayscale,
      },
    },
    '> ul li.selected': {
      background: theme.colors.tescoBlue,
      color: theme.colors.white,
    },
    '> ul li.disabled path': {
      // @ts-ignore
      fill: theme.colors.lightGray,
    },
    '> ul li.disabled': {
      pointerEvents: 'none',
      cursor: 'default',
    },
  } as Styles);
export default TablePaginator;
