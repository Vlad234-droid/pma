import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoModal } from 'features/general/Feedback/Modals';
import { WrapperModal } from 'features/general/Modal';
import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages/general/types';

const Feedback360Info: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClose = () => navigate(buildPath(Page.FEEDBACKS));

  return (
    <WrapperModal title={t('everyday_feedback', 'Everyday Feedback')} onClose={handleClose}>
      <InfoModal onClose={handleClose} />
    </WrapperModal>
  );
};

export default Feedback360Info;
