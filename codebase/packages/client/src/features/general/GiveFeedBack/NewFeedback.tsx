import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ColleaguesActions,
  colleagueUUIDSelector,
  FeedbackActions,
  feedbackByUuidSelector,
  getLoadedStateSelector,
} from '@pma/store';
import { Page } from 'pages';
import Spinner from 'components/Spinner';
import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { ConfirmMessage, GiveFeedbackForm, InfoMessage, SuccessMessage } from './components';
import { useTranslation } from 'components/Translation';

import { GiveFeedbackType } from './type';

const feedbackFields: GiveFeedbackType[] = [
  {
    id: '0',
    code: 'Question 1',
    title:
      "Looking back at what you've seen recently, what would you like to say to this colleague about what they`ve delivered or how they've gone about it?",
    description: "Share specific examples of what you've seen.",
    field: {
      id: '1',
      type: 'textarea',
    },
  },
  {
    id: '1',
    code: 'Question 2',
    title: 'Looking forward, what should this colleague do more (or less) of in order to be at their best?',
    description: 'Share your suggestions',
    field: {
      id: '2',
      type: 'textarea',
    },
  },
  {
    id: '2',
    code: 'Anything else?',
    title: 'Add any other comments you would like to share with your colleague.',
    field: {
      id: '3',
      type: 'textarea',
    },
  },
];

enum Statuses {
  PENDING = 'pending',
  CONFIRMING = 'confirming',
  SENDING = 'sending',
  INFO = 'info',
}

const NewFeedback: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(Statuses.PENDING);
  const { uuid } = useParams<{ uuid: string }>();

  const { feedbackItems, targetColleagueUuid, targetColleagueProfile } = useSelector(feedbackByUuidSelector(uuid)) || {
    targetColleagueUuid: '',
  };
  const { loading } = useSelector(getLoadedStateSelector);
  const [formData, setFormData] = useState({
    feedbackItems: feedbackItems
      ? feedbackFields.map(({ code }) => feedbackItems.find((item) => item.code === code))
      : [{ content: '' }, { content: '' }, { content: '' }],
    targetColleagueUuid,
  });

  const defaultValues = useMemo(() => {
    return { ...formData, feedbackItems: formData.feedbackItems.map(({ content }) => content) };
  }, [formData]);

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const navigate = useNavigate();

  const handleSave = (data) => {
    if (uuid === 'new') {
      dispatch(FeedbackActions.createNewFeedback([{ ...data, colleagueUuid }]));
    } else {
      dispatch(
        FeedbackActions.updateFeedback({
          ...data,
          feedbackItems: data.feedbackItems.map((item) => ({
            ...item,
            uuid: feedbackItems?.find((feedback) => feedback.code === item.code)?.uuid,
          })),
          colleagueUuid,
          uuid,
        }),
      );
    }
  };

  const handleSubmit = (data) => {
    if (data.status === 'DRAFT') {
      handleSave(data);
      handleSuccess();
      return;
    }
    setFormData(data);
    setStatus(Statuses.CONFIRMING);
  };

  const handleSuccess = () => {
    navigate(`/${Page.GIVE_FEEDBACK}`);
    dispatch(ColleaguesActions.clearColleagueList());
  };

  useEffect(() => {
    return () => {
      dispatch(ColleaguesActions.clearColleagueList());
    };
  }, []);

  return (
    <WrapperModal onClose={handleSuccess} title={t('give_feedback', 'Give feedback')}>
      {loading ? (
        <Spinner />
      ) : (
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
              feedbackFields={feedbackFields}
            />
          )}
          {status === Statuses.CONFIRMING && (
            <ConfirmMessage
              onConfirm={() => {
                setStatus(Statuses.SENDING);
                handleSave(formData);
              }}
              goBack={() => setStatus(Statuses.PENDING)}
            />
          )}
          {status === Statuses.SENDING && (
            <SuccessMessage
              onSuccess={handleSuccess}
              selectedColleagueUuid={formData.targetColleagueUuid}
              targetColleagueProfile={targetColleagueProfile}
            />
          )}
          {status === Statuses.INFO && <InfoMessage goBack={() => setStatus(Statuses.PENDING)} />}
        </>
      )}
    </WrapperModal>
  );
};

export default NewFeedback;
