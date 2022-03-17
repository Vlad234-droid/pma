import React, { FC, useEffect, useState, useMemo } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { metaPDPSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CreateRule, Rule, theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Item, Textarea, Field, Attention } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { createYupSchema } from 'utils/yup';
import { v4 as uuidv4 } from 'uuid';
import colors from 'theme/colors';
import { ConfirmModal } from 'features/Modal';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import { Trans, useTranslation } from 'components/Translation';
import Datepicker from 'components/Datepicker';
import arrLeft from 'assets/img/pdp/arrLeft.png';

type Props = {
  pdpGoals: any;
  pdpList: any;
  currentTab: number;
  currentGoal: any;
  formElements: any;
  confirmSaveModal: boolean;
  maxGoals: number;
  goalNum: number;
  currentUUID: string | undefined;
  colleagueUuid: string;
  requestMethods: any;
  setConfirmModal: (isActive: boolean) => void;
  setCurrentTab: (id: number) => void;
  setCurrentGoal: (obj: any) => void;
  onSubmit: (schemaLoaded: boolean, requestData: any, method: string) => void;
};

export const TEST_ID = 'pdp-form';
export const SUBMIT_TEST_ID = 'pdp-form-submit';

const CreatePDPForm: FC<Props> = ({
  pdpGoals,
  pdpList,
  currentTab,
  currentGoal,
  formElements,
  confirmSaveModal,
  maxGoals,
  goalNum,
  currentUUID,
  colleagueUuid,
  requestMethods,
  setConfirmModal,
  setCurrentTab,
  setCurrentGoal,
  onSubmit,
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  const { loaded: schemaLoaded = false } = useSelector(metaPDPSelector) || false;
  const formElementsFilledEmpty = formElements.reduce((acc, current) => {
    acc[current.key] = '';
    return acc;
  }, {});
  const yepSchema = formElements.reduce(createYupSchema(t), {});
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
  });
  const { getValues, formState, reset } = methods;
  const formValues = getValues();

  const [isOpenConfirmNext, setConfirmNextOpen] = useState<boolean>(false);
  const isCurrentGoal = Object.keys(currentGoal)?.length > 0;

  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setMilliseconds(0);
    return now;
  }, []);

  useEffect(() => {
    pdpList &&
      pdpList.some((el, idx) => {
        if (el.uuid == currentGoal.uuid || '') {
          setCurrentTab(idx);
          return true;
        } else {
          setCurrentTab(pdpList?.length + 1);
        }
      });

    if (Object.keys(currentGoal).length > 0) {
      reset(currentGoal?.properties?.mapJson);
    } else {
      reset(formElementsFilledEmpty);
    }
  }, [currentGoal]);

  const requestData = [
    {
      uuid: currentUUID || Object.keys(currentGoal).length > 0 ? currentGoal?.uuid : uuidv4(),
      colleagueUuid: colleagueUuid,
      number:
        pdpList && (currentUUID || Object.keys(currentGoal).length > 0) ? currentGoal?.number : pdpList?.length + 1,
      properties: {
        mapJson: formValues,
      },
      achievementDate: formValues['expiration_date'],
      status: 'DRAFT',
    },
  ];

  const pdpGoal = useMemo(() => {
    if (currentUUID) return [pdpList?.find((item) => item?.uuid === currentUUID)] || [];
    return [];
  }, [currentUUID]);

  const isLessThanMaxGoals = pdpList?.length + 1 >= maxGoals;

  const displaySaveBtn = pdpList?.length + 1 !== maxGoals && pdpList?.length + 1 < maxGoals && !currentUUID;

  return (
    <React.Fragment>
      {pdpList && (
        <div className={css(goalListBlock)}>
          {pdpList.length < 1 || !pdpList ? (
            <div className={`${css(goal)} ${css(defaultGoalItem)}`}>
              <Trans i18nKey='goal'>Goal</Trans> 1
            </div>
          ) : !currentUUID ? (
            pdpList.map((el, idx) => {
              return (
                <React.Fragment key={el.uuid + idx}>
                  <div
                    key={el?.uuid}
                    onClick={() => setCurrentGoal(el)}
                    className={`${css(goal)} ${
                      idx <= goalNum && currentGoal?.uuid !== el.uuid ? css(activeGoalItem) : css(defaultGoalItem)
                    }`}
                  >
                    {`${t('goal', 'Goal')} ${idx + 1}`}
                  </div>
                  {idx === goalNum && idx + 1 < maxGoals && (
                    <div
                      onClick={() => {
                        setCurrentGoal({});
                        if (currentUUID) {
                          navigate(buildPath(Page.CREATE_PERSONAL_DEVELOPMENT_PLAN));
                        }
                      }}
                      className={`${css(goal)} ${isCurrentGoal ? css(activeGoalItem) : css(defaultGoalItem)}`}
                    >
                      {`${t('goal', 'Goal')} ${idx + 2}`}
                    </div>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            pdpGoal?.map((el, idx) => (
              <React.Fragment key={el.uuid + idx}>
                <div
                  key={el?.uuid}
                  onClick={() => setCurrentGoal(el)}
                  className={`${css(goal)} ${css(defaultGoalItem)}`}
                >
                  {`${t('goal', 'Goal')} ${el?.number}`}
                </div>
              </React.Fragment>
            ))
          )}
        </div>
      )}
      <Attention />
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
      <form data-test-id={TEST_ID}>
        {pdpGoals.map((component, idx) => {
          const { key, label, description } = component;
          const updateGoalValue = pdpList
            ? pdpList?.filter((el) => el.uuid === currentGoal.uuid)[0]?.properties?.mapJson[key]
            : '';

          if (description === '{datepicker}') {
            return (
              <React.Fragment key={`${currentTab}${idx}`}>
                <Field
                  name={key}
                  Element={(props) => <Datepicker {...props} isOnTop={true} />}
                  setValue={methods.setValue}
                  minDate={today}
                  value={updateGoalValue}
                />
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={`${currentTab}${idx}`}>
              <GenericItemField
                name={key}
                methods={methods}
                label={label}
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
                placeholder={description}
                value={Object.keys(currentGoal)?.length > 0 ? updateGoalValue : ''}
              />
            </React.Fragment>
          );
        })}
      </form>
      <div className={css(applyBlock({ mobileScreen, currentUUID }))}>
        <Button
          isDisabled={!formState.isValid}
          onPress={() => setConfirmModal(!confirmSaveModal)}
          styles={isLessThanMaxGoals ? [customBtnFullWidth] : [customBtn({ mobileScreen })]}
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
            <Trans i18nKey='save_and_create_new_goal'>Save & create a new goal</Trans>{' '}
            <img className={css(imgArrow)} alt='arrow' src={arrLeft} />
          </Button>
        )}
      </div>
    </React.Fragment>
  );
};

const goalListBlock = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row',
  paddingBottom: '32px',
} as Rule;

const goal = {
  fontFamily: 'TESCO Modern", Arial, sans-serif',
  fontSize: `${theme.font.fixed.f16}`,
  fontStyle: 'normal',
  fontWeight: `${theme.font.weight.bold}`,
  lineHeight: '20px',
  letterSpacing: '0px',
  paddingRight: '16px',
} as Rule;

const defaultGoalItem = {
  color: `${theme.colors.tescoBlue}`,
  cursor: 'pointer',
} as Rule;

const activeGoalItem = {
  color: `${colors.tescoLightBlue}`,
  cursor: 'pointer',
} as Rule;

const imgArrow = {
  marginLeft: '15px',
} as Rule;

const createBtn: Rule = {
  justifyContent: 'center',
};

const customBtn: CreateRule<{ mobileScreen: boolean }> = (props) => {
  const { mobileScreen } = props;
  return {
    padding: '10px 20px',
    width: mobileScreen ? '100%' : '49%',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    margin: mobileScreen ? '10px 0' : '0px',
  };
};

const applyBlock: CreateRule<{ mobileScreen: boolean; currentUUID: string | undefined }> = ({
  mobileScreen,
  currentUUID,
}) => {
  return {
    display: 'flex',
    justifyContent: currentUUID ? 'center' : 'space-between',
    alignItems: 'center',
    marginTop: '32px',
    flexDirection: mobileScreen ? 'column' : 'row',
  };
};

const customBtnFullWidth: Rule = {
  padding: '10px 20px',
  width: '100%',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
};

export default CreatePDPForm;
