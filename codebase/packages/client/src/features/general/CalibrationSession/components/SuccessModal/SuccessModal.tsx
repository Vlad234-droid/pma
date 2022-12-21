import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import SuccessModal from 'components/SuccessModal';

import { SuccessMark } from 'components/Icon';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';

const ReviewSuccessModal: FC<{ title: string; loading?: boolean }> = ({ title, loading = false }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(buildPath(Page.CALIBRATION_SESSION_LIST));
  };

  return (
    <SuccessModal
      title={title}
      onClose={handleClose}
      mark={<SuccessMark />}
      additionalText={
        'All changes made during the session have been captured. To make further changes, you can revisit this session at any time during the calibration period. The session will close automatically when the calibration period ends, and all ratings will be locked from that point.'
      }
      loading={loading}
    />
  );
};

export default ReviewSuccessModal;
