import React, { FC, HTMLProps, useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormType } from '@pma/store';
import { Button, Icon, useBreakpoints, useStyle } from '@dex-ddl/core';

import { Status } from 'config/enum';
import { Trans } from 'components/Translation';
import { Icon as IconComponent } from 'components/Icon';
import { StepIndicatorBasic } from 'components/StepIndicator/StepIndicator';
import { Input, Item, Select, Textarea } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import MarkdownRenderer from 'components/MarkdownRenderer';

import { ButtonWithConfirmation as SubmitButton } from '../Buttons';
import { TriggerModal } from 'features/Modal/components/TriggerModal';
import ObjectiveHelpModal from '../Modal/ObjectiveHelpModal';

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
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    formRef.current?.scrollIntoView();
  });

  const {
    formState: { isValid },
  } = methods;

  return (
    <div className={css({ height: '100%', bottom: '80px' })}>
      <div
        className={css({
          height: '100%',
          overflow: 'auto',
          padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
        })}
      >
        {currentObjectiveNumber > 1 && setPrevObjectiveNumber && (
          <span
            className={css({
              position: 'fixed',
              top: theme.spacing.s5,
              left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
            })}
            onClick={setPrevObjectiveNumber}
          >
            <IconComponent graphic='arrowLeft' invertColors={true} />
          </span>
        )}
        <form ref={formRef} data-test-id={'OBJECTIVE_FORM_MODAL'}>
          {!useSingleStep && (
            <div className={css({ padding: `0 0 ${theme.spacing.s5}` })}>
              <StepIndicatorBasic
                currentStatus={Status.DRAFT}
                currentStep={currentObjectiveNumber - 1}
                titles={titles}
                isValid={isValid}
              />
            </div>
          )}
          {!skipHelp && (
            <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
              <TriggerModal
                triggerComponent={
                  <div className={css({ display: 'flex', alignItems: 'center' })}>
                    <Icon graphic='information' />
                    <span
                      className={css(theme.font.fixed.f14, {
                        color: theme.colors.tescoBlue,
                        padding: `${theme.spacing.s0} ${theme.spacing.s2}`,
                      })}
                    >
                      Need help writing your objectives?
                    </span>
                  </div>
                }
                title={'Writing your objectives'}
              >
                <ObjectiveHelpModal />
              </TriggerModal>
            </div>
          )}
          {schemaComponents.map((component) => {
            const { id, key, label, text, description, type, validate, values = [] } = component;
            const value = formValues[key] ? formValues[key] : '';

            if (type === FormType.TEXT) {
              return (
                <div style={{ padding: '10px 0' }} key={id}>
                  <div
                    className={css({
                      fontSize: '16px',
                      lineHeight: '20px',
                    })}
                  >
                    <MarkdownRenderer source={text} />
                  </div>
                </div>
              );
            }
            if (type === 'textfield' && validate?.maxLength <= 100) {
              return (
                <GenericItemField
                  key={id}
                  name={key}
                  methods={methods}
                  label={label}
                  Wrapper={Item}
                  Element={Input}
                  placeholder={description}
                  value={value}
                />
              );
            }
            if (type === 'textfield' && validate?.maxLength > 100) {
              return (
                <GenericItemField
                  key={id}
                  name={key}
                  methods={methods}
                  label={label}
                  Wrapper={Item}
                  Element={Textarea}
                  placeholder={description}
                  value={value}
                />
              );
            }
            if (type === 'select') {
              return (
                <GenericItemField
                  key={id}
                  name={key}
                  methods={methods}
                  label={label}
                  Wrapper={({ children, label }) => (
                    <Item withIcon={false} label={label}>
                      {children}
                    </Item>
                  )}
                  Element={Select}
                  options={values}
                  placeholder={description}
                  value={value}
                />
              );
            }
          })}
          {!skipFooter && (
            <div
              className={css({
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
              })}
            >
              <div
                className={css({
                  position: 'relative',
                  bottom: theme.spacing.s0,
                  left: theme.spacing.s0,
                  right: theme.spacing.s0,
                  borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
                })}
              >
                <div
                  className={css({
                    padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
                    display: 'flex',
                    justifyContent: 'center',
                  })}
                >
                  <Button
                    styles={[
                      theme.font.fixed.f16,
                      {
                        fontWeight: theme.font.weight.bold,
                        width: '50%',
                        margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                        background: theme.colors.white,
                        border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                        color: `${theme.colors.tescoBlue}`,
                      },
                    ]}
                    onPress={onSaveDraft}
                  >
                    <Trans i18nKey='save_as_draft'>Save as draft</Trans>
                  </Button>
                  {submitForm ? (
                    <SubmitButton
                      isDisabled={!isValid}
                      onSave={onSubmit}
                      styles={[
                        theme.font.fixed.f16,
                        {
                          fontWeight: theme.font.weight.bold,
                          width: '50%',
                          margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                          background: `${theme.colors.tescoBlue}`,
                        },
                      ]}
                    />
                  ) : (
                    <Button
                      styles={[
                        theme.font.fixed.f16,
                        {
                          fontWeight: theme.font.weight.bold,
                          width: '50%',
                          margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                          background: `${theme.colors.tescoBlue}`,
                        },
                        isValid ? {} : { opacity: 0.4 },
                      ]}
                      onPress={setNextObjectiveNumber}
                      isDisabled={!isValid}
                    >
                      <Trans i18nKey='next'>Next</Trans>
                    </Button>
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
