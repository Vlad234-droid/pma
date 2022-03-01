import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Icon, IconProps } from 'components/Icon';
import { Button, Rule, Styles, useStyle } from '@dex-ddl/core';

export type Props = {
  iconGraphic: IconProps['graphic'];
  title: string;
  data?: string;
  type?: string;
  date?: string;
  description?: string;
  customStyle?: React.CSSProperties | {};
  onClick: () => void;
  withButton?: boolean;
};

export const TEST_ID = 'secondary-widget';

const SecondaryWidget: FC<Props> = ({
  iconGraphic,
  title,
  data,
  description,
  customStyle,
  onClick,
  date,
  withButton = true,
}) => {
  const { css, theme } = useStyle();

  return (
    <TileWrapper customStyle={customStyle} hover={true} background={'white'}>
      <div className={css(wrapperStyle)} onClick={onClick} data-test-id={TEST_ID}>
        <div className={css(headStyle)}>
          <Icon graphic={iconGraphic} />
          <span className={css(titleStyle)}>{title}</span>
          {data && <span className={css(descriptionStyle)}>{data}</span>}
          {date && <span className={css(descriptionStyle)}>{date}</span>}
          <span className={css(descriptionStyle)}>{description}</span>
        </div>
        {withButton && (
          <div className={css(bodyStyle)}>
            <div>
              <Button mode='inverse' styles={[btnStyle({ theme }) as Styles]} onPress={onClick}>
                <Trans i18nKey='view'>View</Trans>
              </Button>
            </div>
          </div>
        )}
      </div>
    </TileWrapper>
  );
};

const wrapperStyle: Rule = ({ theme }) => {
  const mobileScreen = theme.breakpoints.small || theme.breakpoints.xSmall;
  return {
    padding: mobileScreen ? '16px 8px' : '24px 27px',
    height: '100%',
    color: theme.colors.tescoBlue,
    width: '100%',
    cursor: 'pointer',
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
    fontSize: mobileScreen ? '16px' : '18px',
    lineHeight: mobileScreen ? '20px' : '22px',
    marginBottom: '4px',
    textAlign: 'center',
  };
};

const descriptionStyle: Rule = ({ theme }) => {
  const mobileScreen = theme.breakpoints.small || theme.breakpoints.xSmall;
  return {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: mobileScreen ? '12px' : '14px',
    lineHeight: mobileScreen ? '16px' : '20px',
    color: theme.colors.base,
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

const btnStyle = ({ theme }) => ({
  fontSize: '14px',
  color: theme.colors.tescoBlue,
  fontWeight: 'bold',
  height: '30px',
  background: 'transparent',
});

export default SecondaryWidget;
