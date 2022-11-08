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
      description={'You have saved your changes to calibration.'}
      additionalText={
        'These changes will now be reflected on the colleagues profile as a record. This will remain confidential from the colleague'
      }
      loading={loading}
    />
  );
};

export default ReviewSuccessModal;
