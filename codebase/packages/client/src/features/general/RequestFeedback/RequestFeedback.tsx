import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RequestFeedbackForm from './components/RequestFeedbackForm';
import { SuccessMessage } from './components/SuccessMessage';
import { colleagueUUIDSelector, FeedbackActions, getLoadedStateSelector } from '@pma/store';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';
import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { Page } from 'pages/general/types';
import { InfoModalContent } from './components/ModalParts';

const RequestFeedback: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { loading } = useSelector(getLoadedStateSelector);

  const handleSubmit = (data: any) => {
    const { colleagues, targetType, targetId, ...feedbackItems } = data;

    const formData = colleagues.map(({ value }) => ({
      targetColleagueUuid: colleagueUuid,
      targetType,
      targetId,
      status: 'PENDING',
      colleagueUuid: value,
      feedbackItems: Object.entries(feedbackItems)
        .filter((item) => item[1])
        .map(([key, value]) => ({ code: key, content: value })),
    }));
    dispatch(FeedbackActions.createNewFeedback(formData));
    setSent(true);
  };

  const handleClose = () => {
    if (isInfoModalOpen) return setIsInfoModalOpen(false);
    navigate(`/${Page.FEEDBACKS}`);
  };

  return (
    <WrapperModal onClose={handleClose} title={t('request_feedback', 'Request feedback')}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {isInfoModalOpen ? (
            <InfoModalContent onClose={() => setIsInfoModalOpen(false)} />
          ) : sent ? (
            <SuccessMessage />
          ) : (
            <RequestFeedbackForm
              onSubmit={handleSubmit}
              onCancel={handleClose}
              setIsInfoModalOpen={() => {
                setIsInfoModalOpen(true);
              }}
            />
          )}
        </>
      )}
    </WrapperModal>
  );
};

export default RequestFeedback;
