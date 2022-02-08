import React, { FC } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { useStyle, Rule, Button, Styles, colors } from '@dex-ddl/core';

import { TileWrapper } from 'components/Tile';
import { Icon, Graphics } from 'components/Icon';

export type Props = {
  onClick: () => void;
  customStyle?: React.CSSProperties | {};
};

export const TEST_ID = 'organization-widget';

const OrganizationWidget: FC<Props> = ({ onClick, customStyle }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();

  const getContent = (): [Graphics, string, string] => {
    return [
      'multiLanguage',
      t('organization_objectives_description', 'Your organization has 6 drivers share to all colleagues'),
      t('view_objectives', 'View'),
    ];
  };

  const [graphic, description, actionTitle] = getContent();

  return (
    <TileWrapper customStyle={{ ...customStyle }}>
      <div className={css(wrapperStyle)} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <div className={css(headerBlockStyle)}>
            <div className={css({ display: 'flex', alignItems: 'center' })}>
              <Icon
                graphic={graphic}
                iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }}
                backgroundRadius={10}
              />
              <span className={css(titleStyle)}>
                <Trans i18nKey='organization_objectives'>Strategic drivers</Trans>
              </span>
            </div>
            <span className={css(descriptionStyle)}>{description}</span>
          </div>
        </div>
        <div className={css(bodyStyle)}>
          <div className={css(bodyBlockStyle)}>
            <Button mode='inverse' styles={[btnStyle({ theme }) as Styles]} onPress={onClick}>
              {actionTitle}
            </Button>
          </div>
        </div>
      </div>
    </TileWrapper>
  );
};

const wrapperStyle: Rule = ({ theme }) => ({
  padding: '16px',
  backgroundColor: theme.colors.white,
  color: theme.colors.tescoBlue,
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  flexDirection: 'column',
  display: 'flex',
});

const headStyle: Rule = {
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};

const bodyBlockStyle: Rule = {
  display: 'grid',
  paddingTop: '14px',
};

const titleStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '16px',
};

const descriptionStyle: Rule = {
  marginTop: '15px',
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  color: colors.base,
};

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

const btnStyle = ({ theme }) => ({
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  color: theme.colors.tescoBlue,
  height: '30px',
  background: 'transparent',
  border: `1px solid ${theme.colors.tescoBlue}`,
});

export default OrganizationWidget;
