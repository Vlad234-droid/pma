import React, { FC } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { useStyle, Rule, Button, Styles } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';

export type Props = {
  onClick: () => void;
  customStyle?: React.CSSProperties | {};
};

export const TEST_ID = 'organization-widget';
export const CLICK_BUTTON_TEST_ID = 'click-button-test-id';

const BusinessObjectives: FC<Props> = ({ onClick, customStyle }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();

  return (
    <TileWrapper customStyle={{ ...customStyle }}>
      <div className={css(wrapperStyle)} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <div className={css(headerBlockStyle)}>
            <div className={css({ display: 'flex', alignItems: 'center' })}>
              <Icon
                graphic={'globe'}
                iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }}
                backgroundRadius={10}
              />
              <span className={css(titleStyle)}>
                <Trans i18nKey={'business_objectives'} ns={'bank'}>
                  Bank wide objectives
                </Trans>
              </span>
            </div>
          </div>
        </div>
        <div className={css(bodyStyle)}>
          <div className={css(bodyBlockStyle)}>
            <Button
              data-test-id={CLICK_BUTTON_TEST_ID}
              mode='inverse'
              styles={[btnStyle({ theme }) as Styles]}
              onPress={onClick}
            >
              {t('view_objectives', 'View')}
            </Button>
          </div>
        </div>
      </div>
    </TileWrapper>
  );
};

const wrapperStyle: Rule = ({ theme }) => ({
  padding: '16px',
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

const titleStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 'bold',
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
});

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

const btnStyle = ({ theme }) => ({
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  height: '30px',
  background: 'transparent',
  border: `2px solid ${theme.colors.tescoBlue}`,
});

export default BusinessObjectives;
