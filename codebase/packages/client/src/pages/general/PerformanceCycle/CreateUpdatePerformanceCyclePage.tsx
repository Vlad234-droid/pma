import React, { FC, useEffect } from 'react';
import { CreateUpdatePerformanceCycle } from 'features/general/PerformanceCycle';
import { useTranslation } from 'components/Translation';
import { useHeaderContainer } from 'contexts/headerContext';
import useLocation from 'hooks/useLocation';
import { Page } from '../types';
import { useParams } from 'react-router-dom';

const CreateUpdatePerformanceCyclePage: FC = () => {
  const { t } = useTranslation();
  const { performanceCycleUuid: uuid } = useParams<{ performanceCycleUuid: string }>();
  const { state } = useLocation<{ isViewing?: boolean }>();
  const { setLinkTitle } = useHeaderContainer();
  const { isViewing } = state || {};

  useEffect(
    () =>
      setLinkTitle({
        [Page.CREATE_PERFORMANCE_CYCLE]:
          uuid === 'new'
            ? t('create_performance_cycle', 'Create performance cycle')
            : isViewing
            ? t('performance_cycle', 'Performance cycle')
            : t('edit_performance_cycle', 'Edit Performance cycle'),
      }),
    [],
  );

  return <CreateUpdatePerformanceCycle />;
};

export default CreateUpdatePerformanceCyclePage;
