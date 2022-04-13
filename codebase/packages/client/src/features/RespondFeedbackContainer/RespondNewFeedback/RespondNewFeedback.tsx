import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'components/Translation';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ColleaguesActions, colleagueUUIDSelector, FeedbackActions, feedbackByUuidSelector } from '@pma/store';
import { Page } from 'pages';
import GiveFeedbackForm from './components/GiveFeedbackForm';
import InfoMessage from './components/InfoMessage';
import SuccessMessage from './components/SuccessMessage';
import { WrapperModal } from 'features/Modal';

import { getFeedbackFields, getPayload, HandleSaveType, Statuses } from './config';

const RespondNewFeedback: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    <WrapperModal onClose={handleSuccess} title={t('give_feedback', 'Give feedback')}>
      <>
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
      </>
    </WrapperModal>
  );
};

export default RespondNewFeedback;
