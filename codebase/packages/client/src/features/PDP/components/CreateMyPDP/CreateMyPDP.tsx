import React, { useEffect, useState } from 'react';
import { CreateRule, ModalWithHeader, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { useNavigate , useParams } from 'react-router-dom';
import { Icon } from '../../../../components/Icon';
import usePDPShema from '../../hooks/usePDPShema';
import { useDispatch, useSelector } from 'react-redux';
import { colleagueUUIDSelector, PDPActions, schemaMetaPDPSelector } from '@pma/store';
import { buildPath } from '../../../Routes';
import { Page } from '../../../../pages';

import Form from '../Form';
import { PDPType } from '../../../../config/enum';

export const TEST_ID = 'create-pdp';

const CreateMyPDP = () => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const pdpList = useSelector(schemaMetaPDPSelector)?.goals || [];
  const [pdpGoals, setPDPGoals] = useState<any[]>([]);
  const [schema] = usePDPShema(PDPType.PDP);
  const { components = [] } = schema;
  const formElements = components.filter((component) => component.type != 'text');
  const maxGoalCount = 5;
  const { uuid } = useParams<{ uuid: string }>();
  const [currentGoal, setCurrentGoal] = useState<any>({});
  const [confirmSaveModal, setConfirmModal] = useState<boolean>(false);

  const [currentUUID, setUUID] = useState<string | undefined>(uuid);
  const [currentTab, setCurrentTab] = useState<number>(0);

  enum METHODS {
    SAVE = 'save',
    UPDATE = 'update',
    CREATE = 'create',
  }

  useEffect(() => {
    if (schema?.meta?.loaded) {
      setPDPGoals(formElements);
    }
  }, [schema?.meta?.loaded]);

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
  }, [pdpList.length]);

  // TODO: simplify nested conditions
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
      <div data-test-id={TEST_ID} className={css(mainContainer)}>
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
          setConfirmModal={setConfirmModal}
          currentUUID={currentUUID}
          colleagueUuid={colleagueUuid}
          setCurrentGoal={setCurrentGoal}
          onSubmit={onFormSubmit}
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

export default CreateMyPDP;
