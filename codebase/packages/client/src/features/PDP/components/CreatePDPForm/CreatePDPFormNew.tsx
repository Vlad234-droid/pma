import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import * as Yup from 'yup';
import { metaPDPSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CreateRule, Rule, theme, useStyle } from '@pma/dex-wrapper';
import { Attention, Field, Item, Textarea } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { createYupSchema } from 'utils/yup';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmModal } from 'features/Modal';
import { Trans, useTranslation } from 'components/Translation';
import Datepicker from 'components/Datepicker';
import { StepIndicatorBasic } from 'components/StepIndicator/StepIndicator';
import { Status } from 'config/enum';
import { Icon } from 'components/Icon';
import MarkdownRenderer from '../../../../components/MarkdownRenderer';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

type Props = {
  pdpGoals: any;
  pdpList: any;
  currentTab: number;
  currentGoal: any;
  components: any;
  confirmSaveModal: boolean;
  maxGoals: number;
  currentUUID: string | undefined;
  colleagueUuid: string;
  requestMethods: any;
  setConfirmModal: (isActive: boolean) => void;
  setCurrentTab: (id: number) => void;
  onSubmit: (schemaLoaded: boolean, requestData: any, method: string) => void;
};

export const TEST_ID = 'pdp-form';
export const SUBMIT_TEST_ID = 'pdp-form-submit';

const CreatePDPForm: FC<Props> = ({
  pdpGoals,
  pdpList,
  currentTab,
  currentGoal,
  components,
  confirmSaveModal,
  maxGoals,
  currentUUID,
  colleagueUuid,
  requestMethods,
  setConfirmModal,
  setCurrentTab,
  onSubmit,
}) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const { t } = useTranslation();
  const { loaded: schemaLoaded = false } = useSelector(metaPDPSelector) || false;
  const formElements = components
    .flatMap((e) => e?.components || e)
    .filter((e) => e?.type === 'textarea' || e?.type === 'textfield' || e?.type === 'select' || e?.type === 'datetime');
  const formElementsFilledEmpty = formElements.reduce((acc, current) => {
    acc[current.key] = '';
    return acc;
  }, {});
  const yepSchema = formElements.reduce(createYupSchema(t), {});
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
  });
  const { getValues, formState, reset, setError } = methods;
  const formValues = getValues();

  const [isOpenConfirmNext, setConfirmNextOpen] = useState<boolean>(false);

  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setMilliseconds(0);
    return now;
  }, []);

  const formRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    formRef.current?.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentTab(pdpList?.length - 1);

    if (pdpList.length) {
      pdpList.some((el, idx) => {
        if (el.uuid == currentGoal.uuid || '') {
          setCurrentTab(idx);
          return true;
        }
      });
    }

    if (Object.keys(currentGoal).length > 0) {
      reset(currentGoal?.properties);
    } else {
      reset(formElementsFilledEmpty);
    }
  }, [pdpList.length, currentGoal, currentTab]);

  const modifiedNumber = (Math.max(...pdpList.map((el) => el.number)) + 1) | 0;

  const requestData = [
    {
      uuid: currentUUID || Object.keys(currentGoal).length > 0 ? currentGoal?.uuid : uuidv4(),
      colleagueUuid: colleagueUuid,
      number: pdpList && (currentUUID || Object.keys(currentGoal).length > 0) ? currentGoal?.number : modifiedNumber,
      properties: { ...formValues },
      achievementDate: formValues['expiration_date'],
      status: 'DRAFT',
    },
  ];

  const displaySaveBtn = pdpList?.length + 1 !== maxGoals && pdpList?.length + 1 < maxGoals && !currentUUID;

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen, currentUUID }))}>
        {!currentUUID && (
          <div className={css(stepIndicatorWrapperStyle)}>
            <StepIndicatorBasic
              currentStatus={Status.DRAFT}
              currentStep={currentTab + 1}
              titles={['Goal 1', 'Goal 2', 'Goal 3', 'Goal 4', 'Goal 5']}
              isValid={formState.isValid}
            />
          </div>
        )}

        <Attention customStyle={{ paddingBottom: '14px' }} />
        {confirmSaveModal && (
          <ConfirmModal
            title={t('are_you_sure_you_want_to_save_this_goal', 'Are you sure you want to save this goal?')}
            description={' '}
            submitBtnTitle={<Trans i18nKey='confirm'>Confirm</Trans>}
            onSave={() => {
              currentUUID || Object.keys(currentGoal)?.length > 0
                ? onSubmit(schemaLoaded, requestData, requestMethods.UPDATE)
                : onSubmit(schemaLoaded, requestData, requestMethods.SAVE);
              setConfirmModal(false);
            }}
            onCancel={() => setConfirmModal(false)}
            onOverlayClick={() => setConfirmModal(false)}
          />
        )}

        {isOpenConfirmNext && (
          <ConfirmModal
            title={t('are_you_sure_you_want_to_save_this_goal', 'Are you sure you want to save this goal?')}
            description={' '}
            submitBtnTitle={<Trans i18nKey='confirm'>Confirm</Trans>}
            onSave={() => {
              onSubmit(schemaLoaded, requestData, requestMethods.CREATE);
              setConfirmNextOpen(false);
            }}
            onCancel={() => setConfirmNextOpen(false)}
            onOverlayClick={() => setConfirmNextOpen(false)}
          />
        )}
        <form ref={formRef} data-test-id={TEST_ID}>
          {pdpGoals.map((component, idx) => {
            const { type, key } = component;

            const updateGoalValue = pdpList ? pdpList[currentUUID ? currentTab : currentTab + 2]?.properties[key] : '';

            if (type === 'htmlelement') {
              const { tag: CustomTag = 'p' } = component;
              const Tag = ({ children }) => {
                return <CustomTag className={css({ margin: '16px 0px 8px' })}>{children}</CustomTag>;
              };

              return <MarkdownRenderer key={component.id} components={{ p: Tag }} source={component?.content} />;
            }

            if (type === 'datetime') {
              return (
                <React.Fragment key={`${currentTab - 1}${idx}`}>
                  <Field
                    name={key}
                    isOnTop={true}
                    Element={Datepicker}
                    Wrapper={Item}
                    setValue={methods.setValue}
                    setError={setError}
                    minDate={today}
                    value={updateGoalValue}
                    error={formState.errors[key]?.message}
                  />
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={`${currentTab}${idx}`}>
                <GenericItemField
                  name={key}
                  methods={methods}
                  label={component?.label}
                  Wrapper={Item}
                  Element={Textarea}
                  styles={{
                    fontFamily: 'TESCO Modern", Arial, sans-serif',
                    fontSize: `${theme.font.fixed.f16}`,
                    fontStyle: 'normal',
                    lineHeight: '20px',
                    letterSpacing: '0px',
                    textAlign: 'left',
                  }}
                  placeholder={component?.placeholder}
                  value={updateGoalValue || ''}
                />
              </React.Fragment>
            );
          })}
        </form>
      </div>

      <div className={css(footerContainerStyle)}>
        <div className={css(footerWrapperStyle)}>
          <div className={css(buttonWrapperStyle({ mobileScreen }))}>
            <Button
              isDisabled={!formState.isValid}
              onPress={() => setConfirmModal(!confirmSaveModal)}
              styles={[buttonWhiteStyle({ theme, mobileScreen, formState, displaySaveBtn })]}
            >
              <Trans i18nKey='save_and_exit'>Save & Exit</Trans>
            </Button>

            {displaySaveBtn && (
              <Button
                data-test-id={SUBMIT_TEST_ID}
                isDisabled={!formState.isValid}
                onPress={() => {
                  onSubmit(schemaLoaded, requestData, requestMethods.CREATE);
                  reset(formElementsFilledEmpty);
                }}
                styles={[customBtn({ mobileScreen }), createBtn]}
              >
                <div className={css(spacedText)}>
                  <Trans i18nKey='save_and_create_new_goal'>Save & create a new goal</Trans>{' '}
                  <Icon fill={`${theme.colors.white}`} graphic='arrowRight' iconStyles={{ height: '17.3px' }} />
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const stepIndicatorWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}` });

const containerStyle: Rule = { height: '100%', bottom: '80px' };

const wrapperStyle: CreateRule<{ mobileScreen: boolean; currentUUID: string | undefined }> =
  ({ mobileScreen, currentUUID }) =>
  ({ theme }) => ({
    height: '100%',
    overflow: 'auto',
    padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
    marginTop: currentUUID ? '20px' : '0px',
  });

const spacedText: Rule = {
  height: '18px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'space-between',
  width: '100%',
};

const customBtn: CreateRule<{ mobileScreen: boolean }> = (props) => {
  const { mobileScreen } = props;
  return {
    fontWeight: theme.font.weight.bold,
    padding: '10px 20px',
    width: mobileScreen ? '100%' : '49%',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    margin: mobileScreen ? '10px 0' : '0px',
  };
};

const buttonWhiteStyle: CreateRule<{ theme; mobileScreen; formState; displaySaveBtn }> = ({
  theme,
  mobileScreen,
  formState,
  displaySaveBtn,
}) => ({
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: !displaySaveBtn ? theme.colors.tescoBlue : theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: !displaySaveBtn ? `${theme.colors.white}` : `${theme.colors.tescoBlue}`,
  width: mobileScreen || !displaySaveBtn ? '100%' : '50%',
  whiteSpace: 'nowrap',
  opacity: !formState.isValid ? '0.5' : '1',
});

const buttonWrapperStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    padding: theme.spacing.s7,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: mobileScreen ? 'column' : 'row',
    gap: '10px',
  });

const footerWrapperStyle: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  // @ts-ignore
  borderTop: `${theme.border.width.b2} solid ${theme.colors.lightGray}`,
});

const footerContainerStyle: Rule = ({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: '0px',
  width: '100%',
  background: `${theme.colors.white}`,
});

const createBtn: Rule = {
  justifyContent: 'center',
};

export default CreatePDPForm;
