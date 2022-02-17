import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';

import { BasicTile } from 'components/Tile';
import { Item } from '../../types';

type Props = Omit<Item, 'id'>;

const Tile: FC<Props> = ({ img, title, description, link = '' }) => {
  const { css } = useStyle();

  return (
    <div className={css(tileRule)}>
      <BasicTile
        target='_blank'
        hover={!!link}
        {...{ img, title, description, link }}
        customStyle={{
          height: '100%',
        }}
      />
    </div>
  );
};

const tileRule: Rule = {
  flex: '1 0 248px',
};

export default Tile;
