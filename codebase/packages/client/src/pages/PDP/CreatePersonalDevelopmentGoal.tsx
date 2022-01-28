import React, { useEffect, useState } from 'react';
import { Button, CreateRule, ModalWithHeader, Rule, Theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import { useNavigate } from 'react-router';
import { Icon } from 'components/Icon';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Textarea } from 'components/Form';
import { useForm } from 'react-hook-form';
import arrLeft from '../../assets/img/pdp/arrLeft.png';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import usePDPShema from 'features/PDP/hooks/usePDPShema';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector, schemaMetaPDPSelector, metaPDPSelector, PDPActions } from '@pma/store';
import { PDPType } from 'config/enum';
import { createYupSchema } from 'utils/yup';
import useDispatch from 'hooks/useDispatch';
import { v4 as uuidv4 } from 'uuid';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import { useParams } from 'react-router-dom';
import { ConfirmModal } from 'features/Modal';
import colors from 'theme/colors';
import { DATE_FORMAT, formatDate } from 'utils/date';

const CreatePersonalDevelopmentGoal = () => {
  const { css, theme } = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const pdpList = useSelector(schemaMetaPDPSelector)?.goals;
  const { loaded: schemaLoaded = false } = useSelector(metaPDPSelector);
  const [pdpGoals, setPDPGoals] = useState<any[]>([]);
  const [schema] = usePDPShema(PDPType.PDP);
  const { components = [] } = schema;
  const formElements = components.filter((component) => component.type != 'text');
  const formElementsFilledEmpty = formElements.reduce((acc, current) => {
    acc[current.key] = '';
    return acc;
  }, {});
  const maxGoalCount = 5;
  const { uuid } = useParams<{ uuid: string }>();
  const [currentGoal, setCurrentGoal] = useState<any>({});
  const [confirmSaveModal, setConfirSavemModal] = useState(false);
  const [confirmSaveNextModal, setConfirSaveNextmModal] = useState(false);
  const [currentUUID, setUUID] = useState(uuid);

  useEffect(() => {
    if (schema.meta.loaded) {
      setPDPGoals(formElements);
    }
  }, [schema.meta.loaded]);

  useEffect(() => {
    dispatch(PDPActions.getPDPGoal({}));
  }, []);

  useEffect(() => {
    setUUID(uuid);
  }, [uuid]);

  useEffect(() => {
    if (currentUUID) {
      const goal = pdpList?.filter((el) => el.uuid === currentUUID)[0] || {};
      setCurrentGoal(goal);
    } else {
      setCurrentGoal({});
    }
  }, [pdpList]);

  const yepSchema = formElements.reduce(createYupSchema, {});
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
  });
  const { getValues, formState, handleSubmit, reset } = methods;
  const formValues = getValues();

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

  useEffect(() => {
    if (Object.keys(currentGoal).length > 0) {
      reset(currentGoal?.properties?.mapJson);
    } else {
      reset(formElementsFilledEmpty);
    }
  }, [currentGoal]);

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

  const navGoals = (goalNum = pdpList?.length - 1) => {
    if (pdpList.length < 1 || !pdpList) {
      return <div className={`${css(goal({ theme }))} ${css(defaultGoalItem({ theme }))}`}>Goal 1</div>;
    } else if (goalNum <= maxGoalCount) {
      return pdpList.map((el, idx) => {
        return (
          <React.Fragment key={el.uuid + idx}>
            <div
              key={el?.uuid}
              onClick={() => setCurrentGoal(el)}
              className={`${css(goal({ theme }))} ${
                idx <= goalNum && currentGoal?.uuid !== el.uuid
                  ? css(activeGoalItem({ theme }))
                  : css(defaultGoalItem({ theme }))
              }`}
            >
              Goal {idx + 1}
            </div>
            {idx === goalNum && idx + 1 < maxGoalCount && (
              <div
                key={el.uuid + Math.random()}
                onClick={() => {
                  setCurrentGoal({});
                  if (currentUUID) {
                    navigate(buildPath(Page.CREATE_PERSONAL_DEVELOPMENT_PLAN));
                  }
                }}
                className={`${css(goal({ theme }))} ${
                  Object.keys(currentGoal).length > 0 ? css(activeGoalItem({ theme })) : css(defaultGoalItem({ theme }))
                }`}
              >
                Goal {idx + 2}
              </div>
            )}
          </React.Fragment>
        );
      });
    }
  };

  return (
    <ModalWithHeader
      containerRule={templatesModalWindowStyles({ mobileScreen })}
      title={`${currentUUID ? 'Update' : 'Create'} Personal Development Goal`}
      modalPosition='middle'
      closeOptions={{
        closeOptionContent: <Icon graphic='cancel' invertColors={true} />,
        onClose: () => navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN)),
      }}
    >
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
      <div className={css(mainContainer)}>
        <div className={css(goalListBlock({ theme }))}>{pdpList && navGoals()}</div>
        <form>
          {pdpGoals.map((component) => {
            const { key, label, description } = component;
            const updateGoalValue = pdpList
              ? pdpList?.filter((el) => el.uuid === currentGoal.uuid)[0]?.properties?.mapJson[key]
              : '';

            if (description === '{datepicker}') {
              const minDate = formatDate(new Date(), DATE_FORMAT);

              return (
                <GenericItemField
                  key={key}
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
                    fontSize: '16px',
                    fontStyle: 'normal',
                    lineHeight: '20px',
                    letterSpacing: '0px',
                    textAlign: 'left',
                  }}
                  placeholder={description}
                  value={Object.keys(currentGoal)?.length > 0 ? updateGoalValue : ''}
                />
              );
            }

            return (
              <GenericItemField
                key={key}
                name={key}
                methods={methods}
                label={label}
                Wrapper={Item}
                Element={Textarea}
                styles={{
                  fontFamily: 'TESCO Modern", Arial, sans-serif',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  lineHeight: '20px',
                  letterSpacing: '0px',
                  textAlign: 'left',
                }}
                placeholder={description}
                value={Object.keys(currentGoal)?.length > 0 ? updateGoalValue : ''}
              />
            );
          })}
        </form>
        <div className={css(applyBlock({ mobileScreen }))}>
          {
            <Button
              isDisabled={!formState.isValid}
              onPress={() => setConfirSavemModal(!confirmSaveModal)}
              styles={
                pdpList?.length + 1 === maxGoalCount || pdpList?.length + 1 > maxGoalCount
                  ? [customBtnFullWidth]
                  : [customBtn({ mobileScreen })]
              }
            >
              Save & Exit
            </Button>
          }
          {(pdpList?.length + 1 !== maxGoalCount || pdpList?.length + 1 > maxGoalCount) && (
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
      </div>
    </ModalWithHeader>
  );
};

const dateInputDefault = {
  color: `${colors.tescoGray}`,
} as Rule;

const genericLabel = {
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 'bolder',
  paddingBottom: '8px',
} as Rule;

const mainContainer = {
  padding: '20px',
  position: 'relative',
  overflowY: 'scroll',
  height: '100%',
} as Rule;

const templatesModalWindowStyles: CreateRule<{ mobileScreen: boolean }> = (props) => {
  const { mobileScreen } = props;
  return {
    width: mobileScreen ? '100%' : '60%',
    padding: '0',
    marginTop: mobileScreen ? '50px' : 0,
    overflow: 'hidden',
  };
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

const customBtnFullWidth = {
  padding: '10px 20px',
  width: '100%',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
} as Rule;

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

const activeGoalItem: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    color: `${colors.tescoLightBlue}`,
    cursor: 'pointer',
  };
};

const defaultGoalItem: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    color: `${theme.colors.tescoBlue}`,
    cursor: 'pointer',
  };
};

const goalListBlock: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '32px',
  };
};

const goal: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontFamily: 'TESCO Modern", Arial, sans-serif',
    fontSize: `${theme.font.fixed.f16}`,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '20px',
    letterSpacing: '0px',
    paddingRight: '16px',
  };
};

export default CreatePersonalDevelopmentGoal;
