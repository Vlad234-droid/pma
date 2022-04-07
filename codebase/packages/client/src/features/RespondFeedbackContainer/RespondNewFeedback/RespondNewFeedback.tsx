import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'components/Translation';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, CreateRule, useStyle } from '@pma/dex-wrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { ColleaguesActions, colleagueUUIDSelector, FeedbackActions, feedbackByUuidSelector } from '@pma/store';
import { Icon } from 'components/Icon';
import { Page } from 'pages';
import GiveFeedbackForm from './components/GiveFeedbackForm';
import InfoMessage from './components/InfoMessage';
import SuccessMessage from './components/SuccessMessage';
import { getFeedbackFields, getPayload, HandleSaveType, Statuses } from './config';

const RespondNewFeedback: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const dispatch = useDispatch();
  const [status, setStatus] = useState(Statuses.PENDING);
  const { uuid } = useParams<{ uuid: string }>();

  const { feedbackItems, targetColleagueUuid, targetColleagueProfile, targetId, targetType } = useSelector(
    feedbackByUuidSelector(uuid),
  );

  const [formData, setFormData] = useState({
    feedbackItems: feedbackItems
      ? getFeedbackFields(t).map(({ code }) => ({ content: '', ...feedbackItems.find((item) => item.code === code) }))
      : [{ content: '' }, { content: '' }, { content: '' }],
    targetColleagueUuid,
  });

  const defaultValues = useMemo(() => {
    return { ...formData, feedbackItems: formData.feedbackItems.map(({ content }) => content) };
  }, [formData]);

  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const handleSave = (data: HandleSaveType) => {
    const payload = getPayload(data, feedbackItems, colleagueUuid, uuid, targetId, targetType);
    dispatch(FeedbackActions.updateFeedback(payload));
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
      modalContainerRule={[containerRule({ mobileScreen })]}
      closeOptions={{
        content: <Icon graphic='cancel' invertColors={true} />,
        onClose: handleSuccess,
        styles: [modalCloseOptionStyle({ mobileScreen })],
      }}
      title={{
        content: 'Give feedback',
        styles: [modalTitleOptionStyle({ mobileScreen })],
      }}
    >
      {status === Statuses.PENDING && (
        <GiveFeedbackForm
          defaultValues={defaultValues}
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
        <SuccessMessage onSuccess={handleSuccess} targetColleagueProfile={targetColleagueProfile} />
      )}
      {status === Statuses.INFO && <InfoMessage goBack={() => setStatus(Statuses.PENDING)} />}
    </Modal>
  );
};

// TODO: Extract duplicate 21
const containerRule: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
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
    background: theme.colors.white,
    cursor: 'default',
    overflow: 'auto',
  });

// TODO: Extract duplicate 13
const modalCloseOptionStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
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
});

// TODO: Extract duplicate 14
const modalTitleOptionStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
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
  });

export default RespondNewFeedback;
