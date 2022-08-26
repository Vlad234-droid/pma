import React, { FC } from 'react';
import { useStyle, Button, Rule, CreateRule } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { useSelector } from 'react-redux';
import { getReviewSchema } from '@pma/store';
import { IconButton, Position } from 'components/IconButton';

type ButtonsProps = {
  currentNumber: number;
  timelineCode: string;
  readonly: boolean;
  isValid: boolean;
  onClose: () => void;
  onSaveExit: (T) => void;
  onSubmit: (T) => void;
  onNext: (T) => void;
};

const Buttons: FC<ButtonsProps> = ({
  readonly,
  isValid,
  onClose,
  onSaveExit,
  onSubmit,
  onNext,
  currentNumber,
  timelineCode,
}) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const schema = useSelector(getReviewSchema(timelineCode));
  const { markup = { max: 0, min: 0 } } = schema;

  const isDisabledSaveAndAdd = !isValid || markup.max <= currentNumber;

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle)}>
        <div className={css(buttonWrapperStyle({ mobileScreen }))}>
          {readonly ? (
            <Button styles={[buttonWhiteStyle({ mobileScreen })]} onPress={onClose}>
              <Trans i18nKey='close'>Close</Trans>
            </Button>
          ) : (
            <>
              <div className={css(buttonGroupStyle({ mobileScreen }))}>
                <Button onPress={onSaveExit} styles={[buttonWhiteStyle({ mobileScreen })]}>
                  <Trans i18nKey='save_and_exit'>Save & exit</Trans>
                </Button>
                {mobileScreen ? (
                  <IconButton
                    isDisabled={isDisabledSaveAndAdd}
                    customVariantRules={{
                      default: buttonWithArrowStyle({ disabled: false }),
                      disabled: buttonWithArrowStyle({ disabled: true }),
                    }}
                    graphic='arrowRight'
                    iconProps={{ invertColors: true }}
                    iconPosition={Position.RIGHT}
                    onPress={onNext}
                  >
                    <Trans i18nKey='save_add_priority'>Save & Create new priority</Trans>
                  </IconButton>
                ) : (
                  <Button
                    onPress={onNext}
                    styles={[buttonBlueStyle({ mobileScreen })]}
                    isDisabled={isDisabledSaveAndAdd}
                  >
                    <Trans i18nKey='save_add_priority'>Save & Create new priority</Trans>
                  </Button>
                )}
              </div>
              <div className={css({ padding: '8px 0 16px' })}>
                <Trans i18nKey='condition_submit_for_agreement' ns={'bank'}>
                  Or, finish your priorities and submit for agreement
                </Trans>
              </div>
              <div>
                <IconButton
                  isDisabled={!isValid}
                  customVariantRules={{
                    default: buttonWithArrowStyle({ disabled: false }),
                    disabled: buttonWithArrowStyle({ disabled: true }),
                  }}
                  graphic='arrowRight'
                  iconProps={{ invertColors: true }}
                  iconPosition={Position.RIGHT}
                  onPress={onSubmit}
                >
                  <Trans i18nKey='review_and_submit'>Review & Submit</Trans>
                </IconButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const containerStyle: Rule = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
};

const wrapperStyle: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  // @ts-ignore
  borderTop: `${theme.border.width.b2} solid ${theme.colors.lightGray}`,
});

const buttonWrapperStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
    justifyContent: 'center',
  });

const buttonGroupStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: mobileScreen ? 'inline-block' : 'flex',
  width: '100%',
  paddingBottom: mobileScreen ? '8px' : '0px',
});

const buttonWhiteStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen = false }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f16,
    fontWeight: theme.font.weight.bold,
    width: mobileScreen ? '100%' : '50%',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: theme.colors.white,
    border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
    color: `${theme.colors.tescoBlue}`,
    marginBottom: '8px',
  });

const buttonBlueStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen = false }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f16,
    fontWeight: theme.font.weight.bold,
    width: mobileScreen ? '100%' : '50%',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: `${theme.colors.tescoBlue}`,
    marginBottom: '8px',
  });

const buttonWithArrowStyle: CreateRule<{ disabled: boolean }> =
  ({ disabled = false }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f16,
    letterSpacing: '0px',
    fontWeight: theme.font.weight.bold,
    width: '100%',
    height: '40px',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: `${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
    justifyContent: 'space-between',
    padding: '0px 15px',
    opacity: disabled ? 0.4 : 1,
    borderRadius: '20px',
  });

export default Buttons;
