import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Icon, IconProps } from 'components/Icon';
import { Button, Rule, Styles, useStyle, Colors, CreateRule } from '@pma/dex-wrapper';

export type Props = {
  iconGraphic: IconProps['graphic'];
  title: string;
  data?: string;
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
  description,
  customStyle,
  onClick,
  date,
  withButton = true,
  background = 'white',
  hover = true,
}) => {
  const { css } = useStyle();

  return (
    <TileWrapper customStyle={customStyle} hover={hover} background={background}>
      <div className={css(wrapperStyle({ background }))} onClick={onClick} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <Icon graphic={iconGraphic} invertColors={background === 'tescoBlue'} />
          <span className={css(titleStyle)}>{title}</span>
          {data && <span className={css(descriptionStyle({ background }))}>{data}</span>}
          {date && <span className={css(descriptionStyle({ background }))}>{date}</span>}
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
  const mobileScreen = theme.breakpoints.small || theme.breakpoints.xSmall;
  return {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: mobileScreen ? theme.font.fixed.f18.fontSize : theme.font.fixed.f20.fontSize,
    lineHeight: mobileScreen ? theme.font.fixed.f16.lineHeight : '22px',
    letterSpacing: '0px',
    marginBottom: '4px',
    textAlign: 'center',
  };
};

const descriptionStyle: CreateRule<{ background: Colors }> =
  ({ background }) =>
  ({ theme }) => {
    const mobileScreen = theme.breakpoints.small || theme.breakpoints.xSmall;
    return {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: mobileScreen ? '12px' : theme.font.fixed.f14.fontSize,
      // lineHeight: mobileScreen ? '16px' : '20px',
      lineHeight: mobileScreen ? '16px' : theme.font.fixed.f16.lineHeight,
      letterSpacing: '0px',
      color: background === 'tescoBlue' ? theme.colors.white : theme.colors.base,
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
