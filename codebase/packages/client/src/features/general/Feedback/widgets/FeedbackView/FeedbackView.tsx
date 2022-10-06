import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from 'pages';
import { buildPath } from 'features/general/Routes';
import BaseWidget from 'components/BaseWidget';
import { useTranslation } from 'components/Translation';

const FeedbackView: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <BaseWidget
      iconGraphic={'chat'}
      title={t('feedback', 'Feedback')}
      customStyle={{ flex: '2 1 110px', cursor: 'pointer' }}
      onClick={() => navigate(buildPath(Page.FEEDBACKS))}
    />
  );
};

export default FeedbackView;
