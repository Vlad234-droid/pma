import React, { FC, CSSProperties, ReactNode } from 'react';
import { Button, colors, CreateRule, Rule, useStyle } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import { Colors } from 'config/types';

export type Props = {
  disabled: boolean;
  graphic;
  iconColor: Colors;
  background: Colors;
  shadow: boolean;
  content: string;
  buttonText: string;
  title: string;
  subTitle?: string;
  description?: string;
  customStyle?: CSSProperties | {};
  renderHeader?: ({ title, titleColor }: { title: string; titleColor: string }) => ReactNode;
  onClick: () => void;
};

export const TEST_ID = 'review-widget';

// TODO: move to src/components
const ReviewWidget: FC<Props> = ({
  customStyle,
  disabled,
  graphic,
  iconColor,
  background,
  shadow,
  content,
  buttonText,
  title,
  subTitle,
  renderHeader,
  description,
  onClick,
}) => {
  const { css } = useStyle();

  const descriptionColor = background === 'tescoBlue' ? colors.white : colors.base;
  const titleColor = background === 'tescoBlue' ? colors.white : colors.tescoBlue;
  const buttonVariant = background === 'tescoBlue' ? 'default' : 'inverse';

  const handleOpen = () => {
    !disabled && onClick();
  };

  return (
    <TileWrapper customStyle={{ ...customStyle }} hover={shadow} boarder={shadow} background={background}>
      <div className={css(wrapperStyle)} onMouseDown={handleOpen} data-test-id={TEST_ID}>
        <div className={css(headerBlockStyle)}>
          {renderHeader ? (
            renderHeader({ title, titleColor })
          ) : (
            <h2 className={css(titleStyle({ color: titleColor }))}>{title}</h2>
          )}
          {subTitle && <p className={css(descriptionStyle({ color: descriptionColor }))}>{subTitle}</p>}
          {description && <p className={css(descriptionStyle({ color: descriptionColor }))}>{description}</p>}
          <div className={css(descriptionStyle({ color: descriptionColor }), iconWrapper)}>
            <Icon
              graphic={graphic}
              iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }}
              backgroundRadius={12}
              fill={colors[iconColor]}
            />
            {content}
          </div>
        </div>
        {!disabled && (
          <div className={css(bodyStyle)}>
            <div className={css(bodyBlockStyle)}>
              <Button
                mode={buttonVariant}
                styles={[buttonStyle({ inverse: buttonVariant === 'default' })]}
                onPress={handleOpen}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        )}
      </div>
    </TileWrapper>
  );
};

const wrapperStyle: Rule = {
  padding: '24px 30px',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  flexDirection: 'column',
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};

const bodyBlockStyle: Rule = {
  display: 'grid',
};

const titleStyle: CreateRule<{ color: string }> =
  ({ color }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f18,
    letterSpacing: '0px',
    fontStyle: 'normal',
    fontWeight: theme.font.weight.bold,
    marginBottom: '12px',
    color,
  });

const descriptionStyle: CreateRule<{ color: string }> =
  ({ color }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f16,
    letterSpacing: '0px',
    position: 'relative',
    fontStyle: 'normal',
    fontWeight: 'normal',
    margin: '0 0 12px',
    color,
  });

const iconWrapper: Rule = ({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  lineHeight: theme.font.fixed.f18.lineHeight,
});

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

const buttonStyle: CreateRule<{ inverse: boolean }> =
  ({ inverse }) =>
  ({ theme }) => ({
    border: `2px solid ${inverse ? theme.colors.white : theme.colors.tescoBlue}`,
    ...theme.font.fixed.f14,
    letterSpacing: '0px',
  });

export default ReviewWidget;
