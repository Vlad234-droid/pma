import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

import Tile from '../Tile';
import { useTenant } from 'features/general/Permission';
import { useTranslation } from 'components/Translation';

import { Item } from '../../types';

type Props = {
  title?: string;
  data: Item[];
  customRule?: Rule;
};

export const TEST_ID = 'test-list';

const List: FC<Props> = ({ title, data = [], customRule = {} }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const tenant = useTenant();

  return (
    <div data-test-id={TEST_ID} className={css(customRule)}>
      {title && <div className={css(titleRule)}>{title}</div>}
      <div className={css(wrapperRule)}>
        {data.map(({ id, img, title, description, imgDescription, link = '', withTenant }) => (
          <Tile
            key={id}
            img={img}
            title={t(title, withTenant ? { ns: tenant } : undefined)}
            description={t(description, withTenant ? { ns: tenant } : undefined)}
            //TODO: remove in future
            link={title !== 'system_guidance_and_faqs_title' ? link : ''}
            imgDescription={t(imgDescription)}
          />
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
