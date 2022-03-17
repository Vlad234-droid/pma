import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHeaderContainer } from 'contexts/headerContext';
import { Page } from 'pages/types';
import { useTranslation } from 'components/Translation';
import ObjectivesReportStatistics from 'features/ObjectivesReportStatistics';

const ObjectivesReport = () => {
  const location = useLocation();
  const { setLinkTitle } = useHeaderContainer();
  const { t } = useTranslation();

  useEffect(() => {
    if (location?.pathname?.includes('submitted') && location?.pathname?.includes('objectives'))
      setLinkTitle({ [Page.OBJECTIVES_SUBMITTED_REPORT]: t('objectives_submitted', 'Objectives submitted') });
    if (location?.pathname?.includes('approved') && location?.pathname?.includes('objectives'))
      setLinkTitle({ [Page.OBJECTIVES_APPROVED_REPORT]: t('objectives_approved', 'Objectives approved') });
  }, [location]);

  return <ObjectivesReportStatistics />;
};

export default ObjectivesReport;
