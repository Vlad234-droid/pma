import React, { FC } from 'react';
import { Button, CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { IconButton, Position } from '../IconButton';

export const LEFT_SIDE_BUTTON = 'left-side-button';
export const ARROW_RIGHT = 'arrow-right';

type ButtonsProps = {
  isValid?: boolean;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightIcon?: boolean;
  leftText?: string;
  rightTextWithIcon?: string;
  rightTextNotIcon?: string;
  single?: boolean;
  customButtons?: JSX.Element;
};

const ButtonsWrapper: FC<ButtonsProps> = ({
  isValid,
  onLeftPress,
  onRightPress,
  rightIcon = true,
  leftText = 'cancel',
  rightTextWithIcon = 'save',
  rightTextNotIcon = 'download',
  single = false,
  customButtons,
}) => {
  const { css, theme } = useStyle();
  return (
    <div className={css(blockStyle)}>
      <div className={css(wrapperStyle)}>
        <div className={css(buttonsWrapper({ customButtons }))}>
          {customButtons ? (
            customButtons
          ) : (
            <>
              {!single && (
                <Button
                  styles={[theme.font.fixed.f16, buttonCancelStyle]}
                  onPress={onLeftPress}
                  data-test-id={LEFT_SIDE_BUTTON}
                >
                  <Trans i18nKey={leftText} />
                </Button>
              )}
              {rightIcon ? (
                <IconButton
                  data-test-id={ARROW_RIGHT}
                  onPress={onRightPress}
                  graphic='arrowRight'
                  customVariantRules={{
                    default: submitButtonStyle({ isValid, rightIcon }),
                    disabled: submitButtonStyle({ isValid, rightIcon }),
                  }}
                  iconStyles={iconStyledRule}
                  iconPosition={Position.RIGHT}
                  isDisabled={!isValid}
                >
                  <Trans i18nKey={rightTextWithIcon} />
                </IconButton>
              ) : (
                <Button
                  onPress={onRightPress}
                  styles={[submitButtonStyle({ isValid, rightIcon })]}
                  data-test-id={'right-not-icon'}
                >
                  <Trans i18nKey={rightTextNotIcon} />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const blockStyle: Rule = () => {
  return {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  };
};

const buttonsWrapper: CreateRule<{ customButtons: JSX.Element | undefined }> =
  ({ customButtons }) =>
  ({ theme }) => {
    const { matchMedia } = useStyle();
    const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
    return {
      padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
      display: 'flex',
      justifyContent: customButtons ? 'space-between' : 'center',
    };
  };

const wrapperStyle: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  // @ts-ignore
  borderTop: `${theme.border.width.b2} solid ${theme.colors.lightGray}`,
});

const buttonCancelStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const submitButtonStyle: CreateRule<{ isValid: any; rightIcon: boolean }> =
  ({ isValid, rightIcon }) =>
  ({ theme }) => ({
    height: '40px',
    ...theme.font.fixed.f16,
    fontWeight: theme.font.weight.bold,
    width: '50%',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: `${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
    ...(rightIcon && {
      display: 'flex',
      justifyContent: 'space-between',
    }),
    padding: '0px 20px',
    borderRadius: `${theme.spacing.s20}`,
    opacity: isValid ? '1' : '0.4',
    pointerEvents: isValid ? 'all' : 'none',
  });

const iconStyledRule: Rule = ({ theme }) =>
  ({
    '& > path': {
      fill: theme.colors.white,
    },
  } as Styles);

export default ButtonsWrapper;
