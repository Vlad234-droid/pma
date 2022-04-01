import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

import Tile from '../Tile';

import { Item } from '../../types';

type Props = {
  title?: string;
  data: Item[];
  customRule?: Rule;
};

export const TEST_ID = 'test-list';

const List: FC<Props> = ({ title, data = [], customRule = {} }) => {
  const { css } = useStyle();

  return (
    <div data-test-id={TEST_ID} className={css(customRule)}>
      {title && <div className={css(titleRule)}>{title}</div>}
      <div className={css(wrapperRule)}>
        {data.map(({ id, ...tileProps }) => (
          <Tile key={id} {...tileProps} />
        ))}
      </div>
    </div>
  );
};

const titleRule: Rule = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const wrapperRule: Rule = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
  height: '100%',
  paddingBottom: '60px',
};

export default List;
