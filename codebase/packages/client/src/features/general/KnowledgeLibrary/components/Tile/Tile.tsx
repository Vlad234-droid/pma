import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

import { BasicTile } from 'components/Tile';

import { Item } from '../../types';

type Props = Omit<Item, 'id'>;

export const TEST_ID = 'test-tile';

const Tile: FC<Props> = ({ ...rest }) => {
  const { css } = useStyle();

  return (
    <div data-test-id={TEST_ID} className={css(tileRule)}>
      <BasicTile
        target='_blank'
        customStyle={{
          height: '100%',
        }}
        {...rest}
      />
    </div>
  );
};

const tileRule: Rule = {
  flex: '1 0 248px',
};

export default Tile;
