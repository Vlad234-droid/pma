import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreateRule, Modal, useBreakpoints, useStyle } from '@pma/dex-wrapper';
import RequestFeedbackForm from './components/RequestFeedbackForm';
import SuccessMassage from './components/SuccessMassage';
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
  const [, isBreakpoint] = useBreakpoints();
  const isMobile = isBreakpoint.small || isBreakpoint.xSmall;
  const { theme } = useStyle();

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
      modalContainerRule={[containerRule({ isMobile, colors: theme.colors })]}
      closeOptions={{
        content: <Icon graphic='cancel' invertColors={true} />,
        onClose: handleClose,
        styles: [modalCloseOptionStyle({ isMobile })],
      }}
      title={{
        content: t('request_feedback', 'Request feedback'),
        styles: [modalTitleOptionStyle({ isMobile })],
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {isInfoModalOpen ? (
            <InfoModalContent onClose={() => setIsInfoModalOpen(false)} />
          ) : sent ? (
            <SuccessMassage />
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

const containerRule: CreateRule<{ isMobile: boolean; colors: any }> = ({ colors, isMobile }) => {
  return {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...(isMobile
      ? { borderRadius: '24px 24px 0 0 ', padding: '16px 0 84px' }
      : { borderRadius: '32px', padding: `40px 0 102px` }),
    width: '640px',
    height: isMobile ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
    marginTop: '72px',
    marginBottom: isMobile ? 0 : '30px',
    background: colors.white,
    cursor: 'default',
    overflow: 'auto',
  };
};

const modalCloseOptionStyle: CreateRule<{ isMobile: boolean }> = ({ isMobile }) => {
  return {
    display: 'inline-block',
    height: '24px',
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'fixed',
    top: '22px',
    right: isMobile ? '20px' : '40px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};
// TODO: Extract duplicate 14
const modalTitleOptionStyle: CreateRule<{ isMobile: boolean }> = ({ isMobile }) => {
  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    ...(isMobile
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
