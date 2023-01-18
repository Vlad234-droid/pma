import React, { FC, useMemo } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

import Tile from '../Tile';
import { Tenant, useTenant } from 'features/general/Permission';
import { TFunction, useTranslation } from 'components/Translation';

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
  const getTitle = useTitle(t);
  const tenant = useTenant();

  //TODO: remove in future
  const mappedData = data.map(({ title, link, ...rest }) => ({
    link: title === 'system_guidance_and_faqs_title' && tenant === Tenant.BANK ? '' : link,
    title,
    ...rest,
  }));

  return (
    <div data-test-id={TEST_ID} className={css(customRule)}>
      {title && <div className={css(titleRule)}>{title}</div>}
      <div className={css(wrapperRule)}>
        {mappedData.map(({ id, img, title, description, imgDescription, link = '', withTenant }) => (
          <Tile
            key={id}
            img={img}
            title={getTitle({
              title: t(title, withTenant ? { ns: tenant } : undefined),
              disabled: !link,
            })}
            description={t(description, withTenant ? { ns: tenant } : undefined)}
            link={link}
            imgDescription={t(imgDescription)}
          />
        ))}
      </div>
    </div>
  );
};

const useTitle = (t: TFunction) => {
  const disabledDefaultText = t('disabled_knowledge_library_tile_text');

  const getTitle = useMemo(
    () =>
      ({
        title,
        disabled,
        disabledText = disabledDefaultText,
      }: {
        title: string | TFunction;
        disabled: boolean;
        disabledText?: string | TFunction;
      }) =>
        `${title}${disabled ? ` ${disabledText}` : ''}`,
    [disabledDefaultText],
  );

  return getTitle;
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
