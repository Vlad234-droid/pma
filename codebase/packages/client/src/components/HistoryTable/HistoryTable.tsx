import React from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

const HistoryTable = ({ headers, items, isVisible }) => {
  const { css } = useStyle();
  if (items.length < 1) return null;

  const modifyTime = (time) => {
    const newDate = new Date(time);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const hour = newDate.getHours();
    const minutes = newDate.getMinutes();
    return `${day}/${month}/${year} at ${hour}:${minutes}`;
  };

  return (
    <div key={items.id} className={`${!isVisible && css(unvisible)}`}>
      <div className={`${css(row)} ${css(header)}`}>
        {headers.map((el) => {
          return (
            <div className={css(col)} key={el}>
              {el}
            </div>
          );
        })}
      </div>

      {items.map((el) => {
        return (
          <div key={el.updatedTime} className={`${css(row)} ${css(separator)}`}>
            <div className={`${css(col)} ${css(colBody)}`}>
              {el?.updatedBy?.firstName || ''} {el.updatedBy?.lastName || ''}
            </div>
            <div className={`${css(col)} ${css(colBody)}`}>{el?.action}</div>
            <div className={`${css(col)} ${css(colBody)}`}>{modifyTime(el?.updatedTime)}</div>
          </div>
        );
      })}
    </div>
  );
};

const separator = {
  borderBottom: '2px solid gray',
  width: '100%',
  height: '1px',
  padding: '33px',
} as Rule;

const unvisible = {
  display: 'none',
} as Rule;

const header = {
  backgroundColor: '#F3F9FC',
  color: '#000000',
  fontWeight: 'bold',
} as Rule;

const row = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '24px',
} as Rule;

const col = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '33.3%',
  padding: '10px 16px',
} as Rule;

const colBody = {
  padding: '24px 16px',
} as Rule;

export default HistoryTable;
