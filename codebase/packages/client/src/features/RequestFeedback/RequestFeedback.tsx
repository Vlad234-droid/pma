import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateRule, Modal, useStyle } from '@pma/dex-wrapper';
import RequestFeedbackForm from './components/RequestFeedbackForm';
import SuccessMessage from './components/SuccessMessage';
import { colleagueUUIDSelector, FeedbackActions, getLoadedStateSelector } from '@pma/store';
import { Icon } from 'components/Icon';
import { Page } from 'pages';
import { InfoModalContent } from './ModalParts';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';

const RequestFeedback: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { loading } = useSelector(getLoadedStateSelector);
  const { theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

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
    navigate(`/${Page.FEEDBACK}`);
  };

  return (
    <Modal
      modalPosition={'middle'}
      overlayColor={'tescoBlue'}
      modalContainerRule={[containerRule({ mobileScreen, colors: theme.colors })]}
      closeOptions={{
        content: <Icon graphic='cancel' invertColors={true} />,
        onClose: handleClose,
        styles: [modalCloseOptionStyle({ mobileScreen })],
      }}
      title={{
        content: t('request_feedback', 'Request feedback'),
        styles: [modalTitleOptionStyle({ mobileScreen })],
      }}
    >
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
    </Modal>
  );
};

const containerRule: CreateRule<{ mobileScreen: boolean; colors: any }> = ({ colors, mobileScreen }) => {
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

const modalCloseOptionStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
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
// TODO: Extract duplicate 14
const modalTitleOptionStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
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

export default RequestFeedback;
