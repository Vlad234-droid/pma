import React, { FC, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Item, Textarea } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { useForm } from 'react-hook-form';
import { DATE_FORMAT, formatDate } from 'utils/date';
import { createYupSchema } from 'utils/yup';
import { v4 as uuidv4 } from 'uuid';
import useDispatch from 'hooks/useDispatch';
import { Button, CreateRule, Rule, theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import arrLeft from '../../../../../assets/img/pdp/arrLeft.png';
import colors from 'theme/colors';
import { ConfirmModal } from 'features/Modal';
import { useNavigate } from 'react-router-dom';
import { metaPDPSelector, PDPActions } from '@pma/store';
import { useSelector } from 'react-redux';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';

type Props = {
  pdpGoals: any;
  pdpList: any;
  currentTab: number;
  currentGoal: any;
  formElements: any;
  confirmSaveModal: boolean;
  maxGoals: number;
  currentUUID: string | undefined;
  colleagueUuid: string;
  setConfirSavemModal: (isActive: boolean) => void;
  setCurrentTab: (id: number) => void;
  setCurrentGoal: (obj: any) => void;
};

const Form: FC<Props> = ({
  pdpGoals,
  pdpList,
  currentTab,
  currentGoal,
  formElements,
  confirmSaveModal,
  maxGoals,
  currentUUID,
  colleagueUuid,
  setConfirSavemModal,
  setCurrentTab,
  setCurrentGoal,
}) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  const { loaded: schemaLoaded = false } = useSelector(metaPDPSelector);
  const formElementsFilledEmpty = formElements.reduce((acc, current) => {
    acc[current.key] = '';
    return acc;
  }, {});
  const yepSchema = formElements.reduce(createYupSchema, {});
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
  });
  const { getValues, formState, handleSubmit, reset } = methods;
  const formValues = getValues();

  const [confirmSaveNextModal, setConfirSaveNextmModal] = useState<boolean>(false);

  useEffect(() => {
    pdpList &&
      pdpList.some((el, idx) => {
        if (el.uuid == currentGoal.uuid || '') {
          setCurrentTab(idx);
          return true;
        } else {
          setCurrentTab(pdpList.length + 1);
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

  const save = () => {
    dispatch(PDPActions.createPDPGoal({ data: requestData }));
    if (schemaLoaded) navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN));
  };

  const update = () => {
    dispatch(PDPActions.updatePDPGoal({ data: requestData }));
    if (schemaLoaded) navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN));
  };

  const saveAndCreate = () => {
    if (currentUUID && currentGoal.uuid === currentUUID) {
      dispatch(PDPActions.updatePDPGoal({ data: requestData }));
      if (schemaLoaded) navigate(buildPath(Page.CREATE_PERSONAL_DEVELOPMENT_PLAN));
    } else {
      dispatch(PDPActions.createPDPGoal({ data: requestData }));
    }

    setCurrentGoal({});
  };

  return (
    <React.Fragment>
      {confirmSaveModal && (
        <ConfirmModal
          title={'Are you sure you want to save this goal?'}
          description={' '}
          submitBtnTitle={'Confirm'}
          onSave={() => {
            currentUUID || Object.keys(currentGoal).length > 0 ? update() : save();
            setConfirSavemModal(false);
          }}
          onCancel={() => setConfirSavemModal(false)}
          onOverlayClick={() => setConfirSavemModal(false)}
        />
      )}

      {confirmSaveNextModal && (
        <ConfirmModal
          title={'Are you sure you want to save this goal?'}
          description={' '}
          submitBtnTitle={'Confirm'}
          onSave={() => {
            saveAndCreate();
            setConfirSaveNextmModal(false);
          }}
          onCancel={() => setConfirSaveNextmModal(false)}
          onOverlayClick={() => setConfirSaveNextmModal(false)}
        />
      )}
      <form>
        {pdpGoals.map((component, idx) => {
          const { key, label, description } = component;
          const updateGoalValue = pdpList
            ? pdpList?.filter((el) => el.uuid === currentGoal.uuid)[0]?.properties?.mapJson[key]
            : '';

          if (description === '{datepicker}') {
            const minDate = formatDate(new Date(), DATE_FORMAT);

            return (
              <React.Fragment key={`${currentTab}${idx}`}>
                <GenericItemField
                  name={key}
                  methods={methods}
                  label={label}
                  Wrapper={({ children }) => {
                    return (
                      <Item withIcon={false}>
                        <div className={css(genericLabel)}>{label.replace(/\*/g, '')}</div>
                        {children}
                      </Item>
                    );
                  }}
                  Element={(props) => (
                    <Input
                      customStyles={!formValues?.expiration_date && dateInputDefault}
                      min={minDate}
                      type={'date'}
                      {...props}
                    />
                  )}
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
      <div className={css(applyBlock({ mobileScreen }))}>
        {
          <Button
            isDisabled={!formState.isValid}
            onPress={() => setConfirSavemModal(!confirmSaveModal)}
            styles={
              pdpList?.length + 1 === maxGoals || pdpList?.length + 1 > maxGoals
                ? [customBtnFullWidth]
                : [customBtn({ mobileScreen })]
            }
          >
            Save & Exit
          </Button>
        }
        {(pdpList?.length + 1 !== maxGoals || pdpList?.length + 1 > maxGoals) && (
          <Button
            isDisabled={!formState.isValid}
            onPress={() => {
              saveAndCreate();
              reset(formElementsFilledEmpty);
            }}
            styles={[customBtn({ mobileScreen }), createBtn]}
          >
            Save & create a new goal <img className={css(imgArrow)} alt='arrow' src={arrLeft} />
          </Button>
        )}
      </div>
    </React.Fragment>
  );
};

const imgArrow = {
  marginLeft: '15px',
} as Rule;

const createBtn = {
  justifyContent: 'center',
} as Rule;

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

const applyBlock: CreateRule<{ mobileScreen: boolean }> = (props) => {
  const { mobileScreen } = props;
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '32px',
    flexDirection: mobileScreen ? 'column' : 'row',
  };
};

const dateInputDefault = {
  color: `${colors.tescoGray}`,
} as Rule;

const genericLabel = {
  fontSize: `${theme.font.fixed.f16}`,
  lineHeight: '20px',
  fontWeight: `${theme.font.weight.bold}`,
  paddingBottom: '8px',
} as Rule;

const customBtnFullWidth = {
  padding: '10px 20px',
  width: '100%',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
} as Rule;

export default Form;
