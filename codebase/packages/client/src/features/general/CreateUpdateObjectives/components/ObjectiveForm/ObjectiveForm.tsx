import React, { FC, useEffect, useRef, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, useStyle, Rule, CreateRule } from '@pma/dex-wrapper';

import { createYupSchema } from 'utils/yup';
import { checkIsExistValue } from 'utils';
import { Status } from 'config/enum';
import { TriggerModal } from 'features/general/Modal/components/TriggerModal';
import { ButtonWithConfirmation } from 'features/general/Modal';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { Trans, useTranslation } from 'components/Translation';
import { Icon as IconComponent } from 'components/Icon';
import StepIndicator from 'components/StepIndicator/StepIndicator';
import { Attention } from 'components/Form';
import DynamicForm from 'components/DynamicForm';
import { IconButton, Position } from 'components/IconButton';
import ObjectiveHelpModal from '../Modal/ObjectiveHelpModal';
import { InfoBlock } from 'components/InfoBlock';

export type Props = {
  formElements: Array<any>;
  multiply?: boolean;
  editMode?: boolean;
  currentId: number;
  isLastStep?: boolean;
  schemaComponents: any; // todo add schema type
  setPrevObjectiveNumber?: () => void;
  onSaveDraft: (data: Array<any>) => void;
  onSubmit: (data: any) => void;
  onPrev?: () => void;
  onNext?: () => void;
  titles?: Array<string>;
  onCancel?: () => void;
  defaultValues?: any;
  skipFooter?: boolean;
  skipHelp?: boolean;
};

export const TEST_ID = 'objective-modal-test';
export const STEP_TEST_ID = 'steps-test-id';
export const HELP_TEST_ID = 'help-test-id';
export const FOOTER_TEST_ID = 'footer-test-id';

const ObjectiveForm: FC<Props> = ({
  multiply = false,
  isLastStep = false,
  currentId,
  titles,
  editMode,
  schemaComponents,
  formElements,
  onPrev,
  onNext,
  onSaveDraft,
  onSubmit,
  defaultValues,
  skipFooter,
  skipHelp,
  onCancel,
}) => {
  const { t } = useTranslation();

  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const { schema, propertiesSchema } = useMemo(() => {
    const propertiesSchema = Yup.object().shape(formElements.reduce(createYupSchema(t), {}));
    const schema = Yup.object().shape({
      data: Yup.array(
        Yup.object().shape({
          properties: propertiesSchema,
        }),
      ),
    });
    return { schema, propertiesSchema };
  }, []);

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    //@ts-ignore
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    getValues,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = methods;
  const formValues = getValues();
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

  const currentValues = formValues.data[currentId - 1];

  const isCurrentValid = propertiesSchema.isValidSync(currentValues?.properties);

  return (
    <div data-test-id={TEST_ID} className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        {multiply && currentId > 1 && (
          <span className={css(iconLeftPositionStyle({ mobileScreen }))} onClick={onPrev}>
            <IconComponent graphic='arrowLeft' invertColors={true} />
          </span>
        )}
        <form ref={formRef} data-test-id={'OBJECTIVE_FORM_MODAL'}>
          {multiply && (
            <div data-test-id={STEP_TEST_ID} className={css(stepIndicatorWrapperStyle)}>
              <StepIndicator
                currentStatus={Status.DRAFT}
                currentStep={currentId - 1}
                titles={titles}
                isValid={isValid}
              />
            </div>
          )}
          {!skipHelp && (
            <div data-test-id={HELP_TEST_ID} className={css(helpModalWrapperStyle)}>
              <TriggerModal
                triggerComponent={
                  <InfoBlock text={t('need_help_writing_your_objectives', 'Need help writing your objectives?')} />
                }
                title={'Writing your objectives'}
              >
                <ObjectiveHelpModal />
              </TriggerModal>
            </div>
          )}
          <Attention customStyle={{ marginBottom: '20px' }} />
          <DynamicForm
            components={schemaComponents}
            errors={errors}
            formValues={formValues}
            setValue={setValue}
            prefixKey={`data.${currentId - 1}.properties.`}
          />
          {!skipFooter && (
            <div data-test-id={FOOTER_TEST_ID} className={css(footerContainerStyle)}>
              <div className={css(footerWrapperStyle)}>
                <div className={css(buttonWrapperStyle({ mobileScreen }))}>
                  {!editMode ? (
                    <Button
                      isDisabled={!isCurrentValid}
                      styles={[buttonWhiteStyle]}
                      onPress={() =>
                        onSaveDraft(formValues.data.filter(({ properties }) => checkIsExistValue(properties)))
                      }
                    >
                      <Trans i18nKey='save_as_draft'>Save as draft</Trans>
                    </Button>
                  ) : (
                    <Button styles={[buttonWhiteStyle]} onPress={onCancel}>
                      <Trans i18nKey='cancel'>Cancel</Trans>
                    </Button>
                  )}
                  {!multiply || isLastStep ? (
                    <ButtonWithConfirmation
                      isDisabled={!isValid || !isCurrentValid}
                      onSave={handleSubmit(onSubmit)}
                      disabledBtnTooltip={t('action_enabled', 'Action enabled when mandatory fields are completed')}
                      styles={[buttonBlueStyle({ disabled: !isValid })]}
                      confirmationTitle={multiply ? undefined : 'Submit Objective'}
                      confirmationDescription={
                        multiply ? undefined : 'Are you sure you want to submit objective to your manager?'
                      }
                    />
                  ) : (
                    <IconButton
                      isDisabled={!isCurrentValid}
                      customVariantRules={{
                        default: buttonBlueStyle({ disabled: false }),
                        disabled: buttonBlueStyle({ disabled: true }),
                      }}
                      graphic='arrowRight'
                      iconProps={{ invertColors: true }}
                      iconPosition={Position.RIGHT}
                      onPress={onNext}
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
  background: theme.colors.white,
  borderRadius: '0px 0 32px 32px',
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

export default ObjectiveForm;
