import React, { FC } from 'react';
import { useStyle, Rule, colors } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';

import { BasicTile } from 'components/Tile';
import { Item } from '../../types';
import { useTenant } from 'features/general/Permission';
import { Tenant } from 'utils';

type Props = Omit<Item, 'id'>;

export const TEST_ID = 'test-tile';

const Tile: FC<Props> = ({ img, title, description, imgDescription, link = '' }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  //TODO: Remove when Tesco Bank Useful resources ready
  const tenant = useTenant();
  const bankProps = tenant === Tenant.BANK ? { disabled: true, description: 'Coming soon' } : {};

  return (
    <div data-test-id={TEST_ID} className={css(tileRule)}>
      <BasicTile
        target='_blank'
        hover={!!link}
        {...{ img, title: t(title), description: t(description), link, imgDescription: t(imgDescription) }}
        customStyle={{
          height: '100%',
        }}
        {...bankProps}
      />
    </div>
  );
};

const tileRule: Rule = {
  flex: '1 0 248px',
};

export default Tile;
