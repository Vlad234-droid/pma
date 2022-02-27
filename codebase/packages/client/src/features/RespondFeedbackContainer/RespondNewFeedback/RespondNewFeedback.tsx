import React, { FC, useState } from 'react';
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

enum Statuses {
  PENDING = 'pending',
  SENDING = 'sending',
  INFO = 'info',
}

const RespondNewFeedback: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const feedbackFields = [
    {
      id: '0',
      code: 'Question 1',
      title: t(
        'looking_back_at_what_you_seen_recently',
        "Looking back at what you've seen recently, in relation to the area I've asked for feedback on, what can you tell me about what I've delivered or how I've gone about it?",
      ),
      description: t('share_specific_examples', "Share specific examples of what you've seen."),
      field: {
        id: '1',
        type: 'textarea',
      },
    },
    {
      id: '1',
      code: 'Question 2',
      title: t(
        'looking_forward_in_relation',
        "Looking forward, in relation to the area I've asked for feedback on, what should I do more (or less) of in order to be at my best?",
      ),
      description: t('share_your_suggestions', 'Share your suggestions'),
      field: {
        id: '2',
        type: 'textarea',
      },
    },
    {
      id: '2',
      code: 'Anything else?',
      title: t('add_any_other_comments', 'Add any other comments you would like to share with your colleague.'),
      field: {
        id: '3',
        type: 'textarea',
      },
    },
  ];
  const dispatch = useDispatch();
  const [status, setStatus] = useState(Statuses.PENDING);
  const { uuid } = useParams<{ uuid: string }>();

  const { feedbackItems, targetColleagueUuid, targetColleagueProfile, targetId, targetType } = useSelector(
    feedbackByUuidSelector(uuid),
  ) || {
    targetColleagueUuid: '',
  };

  if (!targetColleagueUuid) navigate(buildPath(Page.RESPOND_FEEDBACK));

  const [formData, setFormData] = useState({
    feedbackItems: feedbackItems
      ? feedbackFields.map(({ code }) => feedbackItems.find((item) => item.code === code))
      : [{ content: '' }, { content: '' }, { content: '' }],
    targetColleagueUuid,
  });
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const handleSave = (data) => {
    dispatch(
      FeedbackActions.updatedFeedback({
        ...data,
        feedbackItems: [
          ...data.feedbackItems.map((item) => ({
            ...item,
            uuid: feedbackItems.find((feedback) => feedback.code === item.code)?.uuid,
          })),
          ...feedbackItems.filter(
            (item) =>
              item.code === 'comment_to_day_job' ||
              item.code === 'comment_to_your_self' ||
              item.code === 'comment_to_your_impact' ||
              item.code === 'comment_to_objective',
          ),
          ...feedbackItems.filter((item) => item.code === 'comment_to_request'),
        ],
        colleagueUuid,
        uuid,
        targetId,
        targetType,
      }),
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
          feedbackFields={feedbackFields}
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

const modalTitleOptionStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    fontWeight: 'bold',
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
