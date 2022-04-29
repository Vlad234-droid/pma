import React, { FC, HTMLProps, useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button, Icon, useStyle, Rule, CreateRule } from '@pma/dex-wrapper';

import { Status } from 'config/enum';
import { Trans, useTranslation } from 'components/Translation';
import { Icon as IconComponent } from 'components/Icon';
import { StepIndicatorBasic } from 'components/StepIndicator/StepIndicator';
import { Attention } from 'components/Form';
import { TriggerModal } from 'features/Modal/components/TriggerModal';

import { ButtonWithConfirmation } from '../Buttons';
import ObjectiveHelpModal from '../Modal/ObjectiveHelpModal';
import { IconButton, Position } from 'components/IconButton';
import ObjectiveComponents from './ObjectiveComponents';

export type ObjectiveModalProps = {
  useSingleStep?: boolean;
  onClose?: () => void;
  methods: UseFormReturn;
  submitForm: boolean;
  currentObjectiveNumber: number;
  schemaComponents: any; // todo add schema type
  formValues: {};
  titles?: string[];
  setPrevObjectiveNumber?: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  setNextObjectiveNumber?: () => void;
  skipFooter?: boolean;
  skipHelp?: boolean;
};

export const TEST_ID = 'objective-modal-test';
export const STEP_TEST_ID = 'steps-test-id';
export const HELP_TEST_ID = 'help-test-id';
export const FOOTER_TEST_ID = 'footer-test-id';

type Props = HTMLProps<HTMLInputElement> & ObjectiveModalProps;

export const ObjectiveModal: FC<Props> = ({
  useSingleStep = false,
  methods,
  submitForm,
  currentObjectiveNumber,
  schemaComponents,
  titles,
  formValues,
  setPrevObjectiveNumber,
  onSaveDraft,
  onSubmit,
  setNextObjectiveNumber,
  skipFooter,
  skipHelp,
}) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { watch } = methods;

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (!name) {
        formRef.current?.scrollIntoView();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const { t } = useTranslation();

  const {
    formState: { isValid },
  } = methods;

  return (
    <div data-test-id={TEST_ID} className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        {currentObjectiveNumber > 1 && setPrevObjectiveNumber && (
          <span className={css(iconLeftPositionStyle({ mobileScreen }))} onClick={setPrevObjectiveNumber}>
            <IconComponent graphic='arrowLeft' invertColors={true} />
          </span>
        )}
        <form ref={formRef} data-test-id={'OBJECTIVE_FORM_MODAL'}>
          {!useSingleStep && (
            <div data-test-id={STEP_TEST_ID} className={css(stepIndicatorWrapperStyle)}>
              <StepIndicatorBasic
                currentStatus={Status.DRAFT}
                currentStep={currentObjectiveNumber - 1}
                titles={titles}
                isValid={isValid}
              />
            </div>
          )}
          {!skipHelp && (
            <div data-test-id={HELP_TEST_ID} className={css(helpModalWrapperStyle)}>
              <TriggerModal
                triggerComponent={
                  <div className={css({ display: 'flex', alignItems: 'center' })}>
                    <Icon graphic='information' />
                    <span className={css(helpTitleStyle)}>Need help writing your objectives?</span>
                  </div>
                }
                title={'Writing your objectives'}
              >
                <ObjectiveHelpModal />
              </TriggerModal>
            </div>
          )}
          <Attention customStyle={{ marginBottom: '20px' }} />
          <ObjectiveComponents components={schemaComponents} review={formValues} methods={methods} />
          {!skipFooter && (
            <div data-test-id={FOOTER_TEST_ID} className={css(footerContainerStyle)}>
              <div className={css(footerWrapperStyle)}>
                <div className={css(buttonWrapperStyle({ mobileScreen }))}>
                  <Button styles={[buttonWhiteStyle]} onPress={onSaveDraft}>
                    <Trans i18nKey='save_as_draft'>Save as draft</Trans>
                  </Button>
                  {submitForm ? (
                    <ButtonWithConfirmation
                      isDisabled={!isValid}
                      onSave={onSubmit}
                      disabledBtnTooltip={t('action_enabled', 'Action enabled when mandatory fields are completed')}
                      styles={[buttonBlueStyle({ disabled: !isValid })]}
                    />
                  ) : (
                    <IconButton
                      isDisabled={!isValid}
                      customVariantRules={{
                        default: buttonBlueStyle({ disabled: false }),
                        disabled: buttonBlueStyle({ disabled: true }),
                      }}
                      graphic='arrowRight'
                      iconProps={{ invertColors: true }}
                      iconPosition={Position.RIGHT}
                      onPress={setNextObjectiveNumber}
                    >
                      <Trans i18nKey='next'>Next</Trans>
                    </IconButton>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const containerStyle: Rule = { height: '100%', bottom: '80px' };

const wrapperStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    height: '100%',
    overflow: 'auto',
    padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
  });

const iconLeftPositionStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  });

const footerContainerStyle: Rule = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
};

const footerWrapperStyle: Rule = ({ theme }) => ({
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
    display: 'flex',
    justifyContent: 'center',
  });

const buttonWhiteStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
  width: '50%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const buttonBlueStyle: CreateRule<{ disabled: boolean }> =
  ({ disabled = false }) =>
  ({ theme }) => ({
    ...theme.font.fixed.f16,
    letterSpacing: '0px',
    fontWeight: theme.font.weight.bold,
    width: '50%',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: `${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
    justifyContent: 'space-between',
    padding: '0px 15px',
    opacity: disabled ? 0.4 : 1,
    borderRadius: '20px',
  });

const stepIndicatorWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}` });

const helpModalWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' });

const helpTitleStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  padding: `${theme.spacing.s0} ${theme.spacing.s2}`,
});
