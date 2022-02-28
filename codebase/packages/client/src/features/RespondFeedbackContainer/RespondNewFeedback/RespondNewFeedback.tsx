import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'components/Translation';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakpoints, Rule, Modal } from '@dex-ddl/core';
import { useNavigate, useParams } from 'react-router-dom';
import { colleagueUUIDSelector, ColleaguesActions, FeedbackActions, feedbackByUuidSelector } from '@pma/store';
import { Icon } from 'components/Icon';
import { Page } from 'pages';
import { buildPath } from 'features/Routes/utils';
import GiveFeedbackForm from './components/GiveFeedbackForm';
import InfoMassage from './components/InfoMassage';
import SuccessMassage from './components/SuccessMassage';
import { getFeedbackFields, Statuses, HandleSaveType, getPayload } from './config';

const RespondNewFeedback: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [status, setStatus] = useState(Statuses.PENDING);
  const { uuid } = useParams<{ uuid: string }>();

  const { feedbackItems, targetColleagueUuid, targetColleagueProfile, targetId, targetType } = useSelector(
    feedbackByUuidSelector(uuid),
  ) || {
    targetColleagueUuid: '',
  };

  useEffect(() => {
    if (!targetColleagueUuid) navigate(buildPath(Page.RESPOND_FEEDBACK));
  }, [targetColleagueUuid]);

  const [formData, setFormData] = useState({
    feedbackItems: feedbackItems
      ? getFeedbackFields(t).map(({ code }) => feedbackItems.find((item) => item.code === code))
      : [{ content: '' }, { content: '' }, { content: '' }],
    targetColleagueUuid,
  });
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const handleSave = (data: HandleSaveType) => {
    dispatch(
      FeedbackActions.updatedFeedback(getPayload(data, feedbackItems, colleagueUuid, uuid, targetId, targetType)),
    );
  };

  const handleSubmit = (data) => {
    if (data.status === 'PENDING') {
      handleSave(data);
      handleSuccess();
      return;
    }
    handleSave(data);
    setStatus(Statuses.SENDING);
  };

  const handleSuccess = () => {
    navigate(`/${Page.RESPOND_FEEDBACK}`);
    dispatch(ColleaguesActions.clearColleagueList());
  };

  return (
    <Modal
      modalPosition={'middle'}
      overlayColor={'tescoBlue'}
      modalContainerRule={[containerRule]}
      closeOptions={{
        content: <Icon graphic='cancel' invertColors={true} />,
        onClose: handleSuccess,
        styles: [modalCloseOptionStyle],
      }}
      title={{
        content: 'Give feedback',
        styles: [modalTitleOptionStyle],
      }}
    >
      {status === Statuses.PENDING && (
        <GiveFeedbackForm
          defaultValues={formData}
          onSubmit={handleSubmit}
          currentColleague={targetColleagueProfile}
          goToInfo={(data) => {
            setStatus(Statuses.INFO);
            setFormData(data);
          }}
          feedbackFields={getFeedbackFields(t)}
        />
      )}

      {status === Statuses.SENDING && (
        <SuccessMassage onSuccess={handleSuccess} targetColleagueProfile={targetColleagueProfile} />
      )}
      {status === Statuses.INFO && <InfoMassage goBack={() => setStatus(Statuses.PENDING)} />}
    </Modal>
  );
};

const containerRule: Rule = ({ colors }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...(mobileScreen
      ? { borderRadius: '24px 24px 0 0 ', padding: '16px 0 84px' }
      : { borderRadius: '32px', padding: `40px 0 102px` }),
    width: '640px',
    height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
    marginTop: '72px',
    marginBottom: mobileScreen ? 0 : '30px',
    background: colors.white,
    cursor: 'default',
    overflow: 'auto',
  };
};

const modalCloseOptionStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
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

const modalTitleOptionStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

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
          fontSize: '20px',
          lineHeight: '24px',
        }
      : {
          fontSize: '24px',
          lineHeight: '28px',
        }),
  };
};

export default RespondNewFeedback;