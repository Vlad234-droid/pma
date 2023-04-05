import React, { FC } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { BasicTile } from 'components/Tile';

export type Props = {
  user?: any;
};

const PersonalInformation: FC<Props> = ({ user = {} }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();

  const { fullName } = user;
  return (
    <BasicTile title={t('Personal', 'Personal information')} description={''} customStyle={tileStyle({ mobileScreen })}>
      <div className={css(bodyStyle)}>
        <div className={css(bodyBlockStyle({ mobileScreen }))}>
          <span className={css(titleStyle)}>
            <Trans>Full name</Trans>
          </span>
          <span className={css(descriptionStyle)}>{fullName}</span>
        </div>
      </div>
    </BasicTile>
  );
};

// const wrapperStyle: Styles = {
//   padding: '0',
// };

const bodyBlockStyle: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => ({
  minWidth: '200px',
  display: 'grid',
  paddingRight: '20px',
  ...(mobileScreen
    ? {
        paddingTop: '5px',
      }
    : {
        paddingTop: '14px',
      }),
});

// TODO: Extract duplicate 8
const titleStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: `${theme.font.weight.bold}`,
  fontSize: '16px',
  lineHeight: '20px',
});

// TODO: Extract duplicate 9
const descriptionStyle: Styles = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};

// TODO: Extract duplicate 10
const bodyStyle: Styles = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'inline-flex',
};

// TODO: Extract duplicate 11
const tileStyle: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => ({
  ...(mobileScreen
    ? {
        padding: '6px 0 0',
      }
    : {
        padding: '14px 10px 10px',
      }),
});

export default PersonalInformation;
