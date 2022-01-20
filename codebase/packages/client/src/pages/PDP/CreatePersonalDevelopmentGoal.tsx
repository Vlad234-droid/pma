import React, { useEffect, useState } from 'react';
import { Button, CreateRule, ModalWithHeader, Rule, theme, Theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import { useNavigate } from 'react-router';
import infoIcon from '../../assets/img/pdp/infoIcon.png';
import { Icon } from 'components/Icon';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Textarea } from 'components/Form';
import { useForm } from 'react-hook-form';
import arrLeft from '../../assets/img/pdp/arrLeft.png';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import usePDPShema from 'features/PDP/hooks/usePDPShema';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector, schemaMetaPDPSelector, PDPActions } from '@pma/store';
import { PDPType } from 'config/enum';
import { createYupSchema } from 'utils/yup';
import useDispatch from 'hooks/useDispatch';
import { v4 as uuidv4 } from 'uuid';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import { useParams } from 'react-router-dom';

const CreatePersonalDevelopmentGoal = (props) => {
  const { css, theme } = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const pdpList = useSelector(schemaMetaPDPSelector)?.goals;
  const [pdpGoals, setPDPGoals] = useState<any[]>([]);
  const [schema] = usePDPShema(PDPType.PDP);
  const { components = [] } = schema;
  const formElements = components.filter((component) => component.type != 'text');
  const maxGoalCount = 5;
  const { uuid } = useParams<{ uuid: string }>();
  const [currentGoal, setCurrentGoal] = useState<any>({});

  useEffect(() => {
    if (schema.meta.loaded) {
      setPDPGoals(formElements);
    }
  }, [schema.meta.loaded]);

  useEffect(() => {
    if (uuid) {
      dispatch(PDPActions.getPDPByUUIDGoal({ uuid }));
    } else {
      dispatch(PDPActions.getPDPGoal({}));
    }
  }, []);

  useEffect(() => {
    if (uuid) {
      const goal = pdpList?.filter((el) => el.uuid === uuid)[0] || {};
      setCurrentGoal(goal);
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
      uuid: uuid || Object.keys(currentGoal).length > 0 ? currentGoal?.uuid : uuidv4(),
      colleagueUuid: colleagueUuid,
      number: pdpList && (uuid || Object.keys(currentGoal).length > 0) ? currentGoal?.number : pdpList?.length + 1,
      properties: {
        mapJson: formValues,
      },
      achievementDate: formValues['expiration_date'],
      status: 'DRAFT',
    },
  ];

  const save = () => {
    dispatch(PDPActions.createPDPGoal({ data: requestData }));
    navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN));
  };

  const update = () => {
    dispatch(PDPActions.updatePDPGoal({ data: requestData }));
    navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN));
  };

  const saveAndCreate = () => {
    setCurrentGoal({});
    dispatch(PDPActions.createPDPGoal({ data: requestData }));
  };

  const navGoals = (goalNum = pdpList?.length - 1) => {
    if (pdpList.length < 1 || !pdpList) {
      return <div className={`${css(goal({ theme }))} ${css(defaultGoalItem({ theme }))}`}>Goal 1</div>;
    } else if (goalNum <= maxGoalCount) {
      return pdpList.map((el, idx) => {
        return (
          <>
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
                key={Math.random()}
                onClick={() => setCurrentGoal({})}
                className={`${css(goal({ theme }))} ${css(defaultGoalItem({ theme }))}`}
              >
                Goal {idx + 2}
              </div>
            )}
          </>
        );
      });
    }
  };

  return (
    <ModalWithHeader
      containerRule={templatesModalWindowStyles({ mobileScreen })}
      title={`${uuid ? 'Update' : 'Create'} Personal Development Goal`}
      modalPosition='middle'
      closeOptions={{
        closeOptionContent: <Icon graphic='cancel' invertColors={true} />,
        onClose: () => navigate(-1),
      }}
    >
      <div className={css(mainContainer)}>
        <div className={css(goalListBlock({ theme }))}>{!uuid && pdpList && navGoals()}</div>
        <form>
          {pdpGoals.map((component) => {
            const { id, key, label, description } = component;
            const updateGoalValue = pdpList
              ? pdpList?.filter((el) => el.uuid === currentGoal.uuid)[0]?.properties?.mapJson[key]
              : '';

            if (description === '{datepicker}') {
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
                  Element={(props) => <Input type='date' {...props} />}
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
        <div className={css(applyBlock)}>
          {
            <Button
              isDisabled={!formState.isValid}
              onPress={() => (uuid || Object.keys(currentGoal).length > 0 ? update() : save())}
              styles={
                uuid ||
                Object.keys(currentGoal).length > 0 ||
                pdpList?.length + 1 === maxGoalCount ||
                pdpList?.length + 1 > maxGoalCount
                  ? [customBtnFullWidth]
                  : [customBtn]
              }
            >
              Save & Exit
            </Button>
          }
          {!uuid &&
            Object.keys(currentGoal).length === 0 &&
            (pdpList?.length + 1 !== maxGoalCount || pdpList?.length + 1 > maxGoalCount) && (
              <Button isDisabled={!formState.isValid} onPress={() => saveAndCreate()} styles={[customBtn, createBtn]}>
                Save & create a new goal <img className={css(imgArrow)} alt='arrow' src={arrLeft} />
              </Button>
            )}
        </div>
      </div>
    </ModalWithHeader>
  );
};

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

const customBtn = {
  padding: '10px 20px',
  width: '47%',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
} as Rule;

const customBtnFullWidth = {
  padding: '10px 20px',
  width: '100%',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
} as Rule;

const applyBlock = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '32px',
} as Rule;

const dataBlock = {
  borderBottom: `1px solid ${theme.colors.backgroundDarkest}`,
  fontFamily: 'TESCO Modern", Arial, sans-serif',
} as Rule;

const infoIconEl = {
  marginRight: '8px',
} as Rule;

const infoBlock = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingBottom: '32px',
  color: '#00539F',
  fontSize: '14px',
  fontStyle: 'normal',
  lineHeight: '18px',
  letterSpacing: '0px',
  textAlign: 'left',
  fontFamily: 'TESCO Modern", Arial, sans-serif',
} as Rule;

const activeGoalItem: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    color: `${theme.colors.tescoBlue}`,
    cursor: 'pointer',
  };
};

const defaultGoalItem: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    color: '#b3cde5',
    cursor: 'pointer',
  };
};

const close = {
  cursor: 'pointer',
} as Rule;

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
    // color: `${theme.colors.disabledTescoBlue}`,
  };
};

const decsriptionHeader: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f24}`,
    lineHeight: '28px',
    fontWeight: 'bold',
    paddingBottom: '8px',
  };
};

const arrow = {
  marginLeft: '13.75px',
  border: 'solid',
  borderWidth: '0 1px 1px 0',
  display: 'inline-block',
  padding: '6px',
  transform: 'rotate(137deg)',
  webkitTransform: 'rotate(137deg)',
  cursor: 'pointer',
} as Rule;

const header: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: `${theme.font.fixed.f24}`,
    lineHeight: '28px',
    fontWeight: 'bold',
    color: `${theme.colors.white}`,
    width: '100%',
    padding: '22px 42px 22px 40px',
  };
};

const popup: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '0 20px',
    paddingBottom: '60px',
    backgroundColor: `${theme.colors.tescoBlue}`,
    fontFamily: 'TESCO Modern", Arial, sans-serif',
  };
};

export default CreatePersonalDevelopmentGoal;
