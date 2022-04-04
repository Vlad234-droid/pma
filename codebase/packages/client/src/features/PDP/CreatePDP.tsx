import React, { useEffect, useState } from 'react';
import { CreateRule, Modal, Rule, theme, useBreakpoints, useStyle } from '@pma/dex-wrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from 'components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { colleagueUUIDSelector, metaPDPSelector, PDPActions, schemaMetaPDPSelector } from '@pma/store';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import { PDPType } from 'config/enum';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';
import CreatePDPForm from './components/CreatePDPForm';
import usePDPSchema from './hooks/usePDPSchema';
import { ModalWrapper } from 'components/ModalWrapper';

export const TEST_ID = 'create-pdp';

const CreateMyPDP = () => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const pdpList = useSelector(schemaMetaPDPSelector)?.goals || [];
  const { loaded, loading } = useSelector(metaPDPSelector);
  const [pdpGoals, setPDPGoals] = useState<any[]>([]);
  const [schema] = usePDPSchema(PDPType.PDP);
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

  const title = `${currentUUID ? t('update', 'Update') : t('create', 'Create')} ${t(
    'personal_development_goal',
    'Personal Development Goal',
  )}`;
  if (loading || !loaded || !schema?.meta?.loaded) {
    return <Spinner fullHeight />;
  }

  return (
    <ModalWrapper isOpen={true}>
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
        <div data-test-id={TEST_ID} className={css(mainContainer)}>
          <CreatePDPForm
            pdpGoals={pdpGoals}
            pdpList={pdpList}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            currentGoal={currentGoal}
            formElements={formElements}
            confirmSaveModal={confirmSaveModal}
            maxGoals={maxGoalCount}
            setConfirmModal={setConfirmModal}
            currentUUID={currentUUID}
            colleagueUuid={colleagueUuid}
            onSubmit={onFormSubmit}
            requestMethods={METHODS}
          />
        </div>
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

export default CreateMyPDP;
