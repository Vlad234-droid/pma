import React, { FC, HTMLProps, useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Status } from 'config/enum';

import { Trans } from 'components/Translation';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { ObjectiveActions, SchemaActions, objectivesSelector, objectivesMetaSelector } from '@pma/store';

import { Icon, Button, useStyle, useBreakpoints } from '@dex-ddl/core';

// todo use Generic form in future. For now just not use it because of more flexibility
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Icon as IconComponent } from 'components/Icon';
import { StepIndicatorBasic } from 'components/StepIndicator/StepIndicator';
import { Input, Textarea, Item, Select } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { createYupSchema } from 'utils/yup';

import { SubmitButton } from './index';
import SuccessModal from './SuccessModal';

export type CreateModalProps = {
  onClose?: () => void;
};

type Props = HTMLProps<HTMLInputElement> & CreateModalProps;

export const CreateModal: FC<Props> = ({ onClose }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const dispatch = useDispatch();

  const stateSchema = useStore('schema');
  const { loaded, status } = useSelector(objectivesMetaSelector);
  const { currentObjectives: stateObjectives } = useSelector(objectivesSelector);

  const addObjective = useCallback((payload) => dispatch(ObjectiveActions.addObjective(payload)), []);
  // @ts-ignore
  const { components = [], markup = { max: 0, min: 0 } } = stateSchema;

  const objectiveTitles = [...Array(markup.max).keys()].map((key) => `Objective ${key + 1}`);
  const [currentObjectiveNumber, setObjectiveNumber] = useState(1);

  const formElements = components.filter((component) => component.type != 'text');
  const formElementsFilledEmpty = formElements.reduce((acc, current) => {
    acc[current.key] = '';
    return acc;
  }, {});

  const yepSchema = formElements.reduce(createYupSchema, {});
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
    // defaultValues: stateObjectives[currentObjectiveNumber],
  });
  const {
    trigger,
    getValues,
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;
  const formValues = getValues();

  const onSubmit = async (data) => {
    addObjective({ [currentObjectiveNumber]: data });
    dispatch(
      ObjectiveActions.updateObjective({
        performanceCycleUuid: '',
        colleagueUuid: '',
        status: Status.WAITING_FOR_APPROVAL,
      }),
    );
  };

  const onSaveDraft = () => {
    const values = getValues();
    addObjective({ [currentObjectiveNumber]: values });
    dispatch(
      ObjectiveActions.updateObjective({
        performanceCycleUuid: '',
        colleagueUuid: '',
        status: Status.DRAFT,
      }),
    );
  };

  const setNextObjectiveNumber = async (data) => {
    addObjective({ [currentObjectiveNumber]: data });
    setObjectiveNumber(currentObjectiveNumber + 1);
  };
  const setPrevObjectiveNumber = async () => {
    setObjectiveNumber(currentObjectiveNumber - 1);
  };

  useEffect(() => {
    if (stateObjectives[currentObjectiveNumber]) {
      reset(stateObjectives[currentObjectiveNumber]);
      trigger();
    } else {
      reset(formElementsFilledEmpty);
    }
  }, [currentObjectiveNumber]);
  useEffect(() => {
    if (loaded && stateObjectives[currentObjectiveNumber]) {
      reset(stateObjectives[currentObjectiveNumber]);
    }
  }, [loaded]);
  useEffect(() => {
    if (stateObjectives[currentObjectiveNumber]) {
      reset(stateObjectives[currentObjectiveNumber]);
    }
    dispatch(SchemaActions.getSchema({ formId: 'colleague_objectives_form' }));
    dispatch(ObjectiveActions.getObjective({ performanceCycleUuid: '', colleagueUuid: 'colleagueUuid' }));
  }, []);

  console.log(stateObjectives);

  //  todo return is success page. pass onClose. use it in SuccessModal when click on OK
  if (loaded && status === 'WAITING_FOR_APPROVAL') {
    return <SuccessModal onClose={() => onClose && onClose()} />;
  }

  return (
    <div className={css({ height: '100%', bottom: '80px' })}>
      <div
        className={css({
          height: '100%',
          overflow: 'auto',
          padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
        })}
      >
        {currentObjectiveNumber > 1 && (
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
        <form>
          <div className={css({ padding: `0 0 ${theme.spacing.s5}` })}>
            <StepIndicatorBasic
              currentStatus={'draft'}
              currentStep={currentObjectiveNumber - 1}
              titles={objectiveTitles}
            />
          </div>
          <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
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
          {components.map((component) => {
            const { id, key, label, description, type, validate, values = [] } = component;
            const value = formValues[key] ? formValues[key] : '';
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
                  Wrapper={({ children }) => <Item withIcon={false}>{children}</Item>}
                  Element={Select}
                  options={values}
                  placeholder={description}
                  value={value}
                />
              );
            }
          })}
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
                  // onPress={() => handleSubmit(onSaveDraft)()}
                >
                  <Trans i18nKey='save_as_draft'>Save as draft</Trans>
                </Button>
                {markup.min === currentObjectiveNumber ? (
                  <SubmitButton
                    isDisabled={!isValid}
                    onSave={handleSubmit(onSubmit)}
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
                    onPress={() => handleSubmit(setNextObjectiveNumber)()}
                    isDisabled={!isValid}
                  >
                    <Trans i18nKey='next'>Next</Trans>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
