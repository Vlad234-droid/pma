import React, { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakpoints, Rule, Modal } from '@dex-ddl/core';
import { colleagueUUIDSelector, ColleaguesActions, FeedbackActions, feedbackByUuidSelector } from '@pma/store';
import { Icon } from 'components/Icon';
import { Page } from 'pages';
import { GiveFeedbackForm, ConfirmMassage, SuccessMassage, InfoMassage } from './components';
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
  const dispatch = useDispatch();
  const [status, setStatus] = useState(Statuses.PENDING);
  const { uuid } = useParams<{ uuid: string }>();
  const { feedbackItems, targetColleagueUuid, targetColleagueProfile } = useSelector(feedbackByUuidSelector(uuid)) || {
    targetColleagueUuid: '',
  };
  const [formData, setFormData] = useState({
    feedbackItems: feedbackItems
      ? feedbackFields.map(({ code }) => feedbackItems.find((item) => item.code === code))
      : [{ content: '' }, { content: '' }, { content: '' }],
    targetColleagueUuid,
  });
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const navigate = useNavigate();

  const handleSave = (data) => {
    if (uuid === 'new') {
      dispatch(FeedbackActions.createNewFeedback([{ ...data, colleagueUuid }]));
    } else {
      dispatch(
        FeedbackActions.updatedFeedback({
          ...data,
          feedbackItems: data.feedbackItems.map((item) => ({
            ...item,
            uuid: feedbackItems.find((feedback) => feedback.code === item.code)?.uuid,
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
      {status === Statuses.CONFIRMING && (
        <ConfirmMassage
          onConfirm={() => {
            setStatus(Statuses.SENDING);
            handleSave(formData);
          }}
          goBack={() => setStatus(Statuses.PENDING)}
        />
      )}
      {status === Statuses.SENDING && (
        <SuccessMassage
          onSuccess={handleSuccess}
          selectedColleagueUuid={formData.targetColleagueUuid}
          targetColleagueProfile={targetColleagueProfile}
        />
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

export default NewFeedback;
