import React, { FC } from 'react';
import { Button, Rule, Styles, useStyle, CreateRule } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Icon, IconProps } from 'components/Icon';
import { Colors } from 'config/types';

export type Props = {
  iconGraphic?: IconProps['graphic'];
  title: string;
  data?: string;
  number?: string;
  type?: string;
  date?: string;
  onClick?: () => void;
  description?: string;
  customStyle?: React.CSSProperties | {};
  withButton?: boolean;
  background?: Colors;
  hover?: boolean;
};

export const TEST_ID = 'secondary-widget';

const BaseWidget: FC<Props> = ({
  iconGraphic,
  title,
  data,
  date,
  description,
  customStyle,
  onClick,
  number,
  withButton = true,
  background = 'white',
  hover = true,
}) => {
  const { css } = useStyle();

  return (
    <TileWrapper customStyle={customStyle} hover={hover} background={background}>
      <div className={css(wrapperStyle({ background }))} onClick={onClick} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          {iconGraphic && <Icon graphic={iconGraphic} invertColors={background === 'tescoBlue'} />}
          <h2 className={css(titleStyle)}>{title}</h2>
          {number && <span className={css(numberStyle({ background }))}>{number}</span>}
          {date && <span className={css(descriptionStyle({ background }))}>{date}</span>}
          {data && <span className={css(descriptionStyle({ background }))}>{data}</span>}
          <span className={css(descriptionStyle({ background }))}>{description}</span>
        </div>
        {withButton && (
          <div className={css(bodyStyle)}>
            <div>
              <Button mode='inverse' styles={[btnStyle({ background })]} onPress={onClick}>
                <Trans i18nKey='view'>View</Trans>
              </Button>
            </div>
          </div>
        )}
      </div>
    </TileWrapper>
  );
};

const wrapperStyle: CreateRule<{ background: Colors }> =
  ({ background }) =>
  ({ theme }) => {
    const mobileScreen = theme.breakpoints.small || theme.breakpoints.xSmall;
    return {
      padding: mobileScreen ? '16px 8px' : '24px 27px',
      height: '100%',
      color: `${background === 'tescoBlue' ? theme.colors.white : theme.colors.tescoBlue}`,
      width: '100%',
      // cursor: 'pointer',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      display: 'flex',
    };
  };

const headStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto 0',
  '& svg': {
    marginBottom: '10px',
  },
} as Styles;

const titleStyle: Rule = ({ theme }) => {
  return {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: theme.font.fixed.f20.fontSize,
    lineHeight: theme.font.fixed.f20.lineHeight,
    letterSpacing: '0px',
    marginBottom: '4px',
    textAlign: 'center',
  };
};

const descriptionStyle: CreateRule<{ background: Colors }> =
  ({ background }) =>
  ({ theme }) => {
    return {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: theme.font.fixed.f14.fontSize,
      lineHeight: theme.font.fixed.f16.lineHeight,
      letterSpacing: '0px',
      color: background === 'tescoBlue' ? theme.colors.white : theme.colors.base,
      textAlign: 'center',
    };
  };
const numberStyle: CreateRule<{ background: Colors }> =
  ({ background }) =>
  ({ theme }) => {
    return {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: theme.font.fixed.f24.fontSize,
      lineHeight: theme.font.fixed.f24.lineHeight,
      letterSpacing: '0px',
      color: background === 'tescoBlue' ? theme.colors.white : theme.colors.tescoBlue,
      textAlign: 'center',
    };
  };

const bodyStyle = {
  flexWrap: 'wrap',
  gap: '16px 8px,',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
} as Styles;

const btnStyle: CreateRule<{ background: Colors }> =
  ({ background }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f14,
    letterSpacing: '0px',
    color: background === 'tescoBlue' ? theme.colors.white : theme.colors.tescoBlue,
    fontWeight: 'bold',
    height: '30px',
    background: 'transparent',
  });

export default BaseWidget;
