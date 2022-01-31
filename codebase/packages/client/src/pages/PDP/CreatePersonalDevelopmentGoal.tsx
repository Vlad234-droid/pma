import React, { FC, useEffect, useState } from 'react';
import { CreateRule, ModalWithHeader, Rule, theme, Theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import { useNavigate } from 'react-router';
import { Icon } from 'components/Icon';
import usePDPShema from 'features/PDP/hooks/usePDPShema';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector, schemaMetaPDPSelector, PDPActions } from '@pma/store';
import { PDPType } from 'config/enum';
import useDispatch from 'hooks/useDispatch';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import { useParams } from 'react-router-dom';
import Form from 'features/PDP/components/Form';

const CreatePersonalDevelopmentGoal: FC = () => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const pdpList = useSelector(schemaMetaPDPSelector)?.goals;
  const [pdpGoals, setPDPGoals] = useState<any[]>([]);
  const [schema] = usePDPShema(PDPType.PDP);
  const { components = [] } = schema;
  const formElements = components.filter((component) => component.type != 'text');
  const maxGoalCount = 5;
  const { uuid } = useParams<{ uuid: string }>();
  const [currentGoal, setCurrentGoal] = useState<any>({});
  const [confirmSaveModal, setConfirSavemModal] = useState<boolean>(false);

  const [currentUUID, setUUID] = useState<string | undefined>(uuid);
  const [currentTab, setCurrentTab] = useState<number>(0);

  enum METHODS {
    SAVE = 'save',
    UPDATE = 'update',
    CREATE = 'create',
  }

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

  const onFormSubmit = (schemaLoaded, requestData, method) => {
    if (method === METHODS.SAVE) {
      dispatch(PDPActions.createPDPGoal({ data: requestData }));
      if (schemaLoaded) navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN));
    }

    if (method === METHODS.UPDATE) {
      dispatch(PDPActions.updatePDPGoal({ data: requestData }));
      if (schemaLoaded) navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN));
    }

    if (method === METHODS.CREATE) {
      if (currentUUID && currentGoal.uuid === currentUUID) {
        dispatch(PDPActions.updatePDPGoal({ data: requestData }));
        if (schemaLoaded) navigate(buildPath(Page.CREATE_PERSONAL_DEVELOPMENT_PLAN));
      } else {
        dispatch(PDPActions.createPDPGoal({ data: requestData }));
      }

      setCurrentGoal({});
    }

    return;
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
      <div className={css(mainContainer)}>
        <Form
          pdpGoals={pdpGoals}
          pdpList={pdpList}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          currentGoal={currentGoal}
          formElements={formElements}
          confirmSaveModal={confirmSaveModal}
          maxGoals={maxGoalCount}
          goalNum={pdpList?.length - 1}
          setConfirSavemModal={setConfirSavemModal}
          currentUUID={currentUUID}
          colleagueUuid={colleagueUuid}
          setCurrentGoal={setCurrentGoal}
          onChange={onFormSubmit}
          requestMethods={METHODS}
        />
      </div>
    </ModalWithHeader>
  );
};

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

export default CreatePersonalDevelopmentGoal;
