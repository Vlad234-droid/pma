import React, { useEffect, useState } from 'react';
import { CreateRule, Modal, Rule, theme, useStyle } from '@pma/dex-wrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from 'components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { colleagueUUIDSelector, FormType, metaPDPSelector, PDPActions, schemaMetaPDPSelector } from '@pma/store';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';
import { CreateUpdatePDPForm, RequestMethods } from './components';
import usePDPSchema from './hooks/usePDPSchema';
import { ModalWrapper } from 'components/ModalWrapper';
import { Page } from 'pages/general/types';

export const TEST_ID = 'create-pdp';
export const TEST_SPINNER_ID = 'spinner-test-id';

const MAX_GOAL_COUNT = 5;

export const CreateUpdatePDP = () => {
  const { css, matchMedia } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [schema] = usePDPSchema();
  const { uuid } = useParams<{ uuid: string }>();

  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const pdpList = useSelector(schemaMetaPDPSelector)?.goals || [];
  const { loading } = useSelector(metaPDPSelector) || {};

  const [currentTab, setCurrentTab] = useState(0);

  const { components = [] } = schema;

  const formElements = components.filter((component) => component.type != 'text');

  const currentGoal = pdpList?.filter((el) => el.uuid === uuid)[0] || {};

  const title = `${uuid ? t('update', 'Update') : t('create', 'Create')} ${t(
    'personal_development_goal',
    'Personal Development Goal',
  )}`;

  const onFormSubmit = (schemaLoaded, requestData, method) => {
    switch (method) {
      case RequestMethods.SAVE:
        dispatch(PDPActions.createPDPGoal({ data: requestData }));
        if (schemaLoaded) navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN));
        break;
      case RequestMethods.UPDATE:
        dispatch(PDPActions.updatePDPGoal({ data: requestData }));
        if (schemaLoaded) navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN));
        break;
      case RequestMethods.CREATE:
        if (uuid && currentGoal.uuid === uuid) {
          dispatch(PDPActions.updatePDPGoal({ data: requestData }));
          if (schemaLoaded) navigate(buildPath(Page.CREATE_PERSONAL_DEVELOPMENT_PLAN));
        } else {
          dispatch(PDPActions.createPDPGoal({ data: requestData }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <ModalWrapper data-test-id={TEST_ID} isOpen={true}>
      <Modal
        modalPosition={'middle'}
        overlayColor={'tescoBlue'}
        modalContainerRule={[containerRule({ mobileScreen })]}
        closeOptions={{
          content: <Icon graphic='cancel' invertColors={true} />,
          onClose: () => navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN)),
          styles: [modalCloseOptionStyle({ mobileScreen })],
        }}
        title={{
          content: title,
          styles: [modalTitleOptionStyle({ mobileScreen })],
        }}
      >
        {loading || !schema?.meta?.loaded ? (
          <Spinner data-test-id={TEST_SPINNER_ID} fullHeight />
        ) : (
          <div className={css(mainContainer)}>
            <CreateUpdatePDPForm
              pdpGoals={components}
              pdpList={pdpList}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              currentGoal={currentGoal}
              formElements={formElements}
              maxGoals={MAX_GOAL_COUNT}
              currentUUID={uuid}
              colleagueUuid={colleagueUuid}
              onSubmit={onFormSubmit}
            />
          </div>
        )}
      </Modal>
    </ModalWrapper>
  );
};

// TODO: Extract duplicate 14
const modalTitleOptionStyle: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    fontWeight: theme.font.weight.bold,
    letterSpacing: '0px',
    ...(mobileScreen
      ? {
          fontSize: `${theme.font.fixed.f20.fontSize}`,
          lineHeight: `${theme.font.fluid.f24.lineHeight}`,
        }
      : {
          fontSize: `${theme.font.fixed.f24.fontSize}`,
          lineHeight: `${theme.font.fluid.f28.lineHeight}`,
        }),
  };
};

// TODO: Extract duplicate 13
const modalCloseOptionStyle: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    display: 'inline-block',
    height: '24px',
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'fixed',
    top: '22px',
    right: mobileScreen ? '20px' : '40px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

const containerRule: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...(mobileScreen
      ? { borderRadius: '24px 24px 0 0 ', padding: '16px 0 155px' }
      : { borderRadius: '32px', padding: `40px 0 112px` }),
    width: '640px',
    height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
    marginTop: '72px',
    overflow: 'hidden',
    marginBottom: mobileScreen ? 0 : '30px',
    background: theme.colors.white,
    cursor: 'default',
  };
};

const mainContainer = {
  padding: '0 20px',
  position: 'relative',
  height: '100%',
} as Rule;
