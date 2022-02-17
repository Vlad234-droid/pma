import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

import { BasicTile } from 'components/Tile';
import { Icon } from 'components/Icon';
import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import { Link } from 'react-router-dom';

const HelpWidgets: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <div data-test-id='help-widgets' className={css(wrapperStyles)}>
      <div data-test-id='question-tile' className={css(wrrapperRule)}>
        <Link to={buildPath(Page.KNOWLEDGE_LIBRARY)}>
          <BasicTile
            img={<Icon graphic='question' />}
            hover
            title={t('want_to_learn_more', 'Want to learn more about Your Contribution at Tesco?')}
            imgCustomStyle={imageStyles}
            customStyle={{
              ...widgetStyles,
            }}
            icon={true}
          />
        </Link>
      </div>
    </div>
  );
};

export default HelpWidgets;

const wrrapperRule: Rule = {
  height: '100%',
};

const wrapperStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 216px',
  gap: '8px',
  alignItems: 'stretch',
};

const widgetStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: '24px 27px 24px 10px',
};

const imageStyles: Rule = {
  width: '30px',
  margin: '8px auto 0px',
};
