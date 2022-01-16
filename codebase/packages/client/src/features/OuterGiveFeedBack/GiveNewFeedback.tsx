import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBreakpoints, Rule, Modal } from '@dex-ddl/core';
import { Icon } from 'components/Icon';
import { Page } from 'pages';
import { GiveFeedbackForm, ConfirmMassage, SuccessMassage } from './components';

enum Statuses {
  PENDING = 'pending',
  CONFIRMING = 'confirming',
  SENDING = 'sending',
}
const GiveNewFeedback: FC = () => {
  const [status, setStatus] = useState(Statuses.PENDING);
  const [formData, setFormData] = useState({
    targetColleagueUuid: '',
    feedbackItems: [{ content: '' }, { content: '' }, { content: '' }],
  });
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <Modal
      modalPosition={'middle'}
      overlayColor={'tescoBlue'}
      modalContainerRule={[containerRule]}
      closeOptions={{
        content: <Icon graphic='cancel' invertColors={true} />,
        onClose: () => {
          navigate(`/${Page.GIVE_FEEDBACK}`);
          // TODO: clean store here
        },
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
          onSubmit={(data) => {
            setFormData(data);
            setStatus(Statuses.CONFIRMING);
          }}
        />
      )}
      {status === Statuses.CONFIRMING && (
        <ConfirmMassage onConfirm={() => setStatus(Statuses.SENDING)} goBack={() => setStatus(Statuses.PENDING)} />
      )}
      {status === Statuses.SENDING && (
        <SuccessMassage onSuccess={handleSubmit} selectedColleagueUuid={formData.targetColleagueUuid} />
      )}
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

export default GiveNewFeedback;
