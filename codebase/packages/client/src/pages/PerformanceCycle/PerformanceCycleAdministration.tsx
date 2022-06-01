import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PerformanceCycleTable from 'features/PerformanceCycle/PerformanceCycleTable';
import { Button, useStyle, Rule } from '@pma/dex-wrapper';
import { buildPath } from 'features/Routes';
import { Page } from 'pages/types';
import { Icon } from 'components/Icon';
import { Trans, useTranslation } from 'components/Translation';
import { paramsReplacer } from 'utils';
import Select from 'components/Form/Select';

import { Status } from 'features/PerformanceCycle/type';

const PerformanceCycleAdministration: FC = () => {
  const [active, setActive] = useState(Status.STARTED);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { css } = useStyle();
  const { t } = useTranslation();

  useEffect(() => {
    const status: Status = (new URLSearchParams(search).get('status') as Status) || Status.STARTED;
    setActive(status);
  }, [search]);

  const handleSelectFilter = (status: Status) => {
    navigate({
      pathname,
      search: new URLSearchParams({
        status,
      }).toString(),
    });
  };

  const selectOptions = useMemo(() => {
    return [
      {
        label: t('drafts'),
        value: Status.DRAFT,
      },
      {
        label: t('registered_cycles'),
        value: Status.REGISTERED,
      },
      {
        label: t('started_cycles'),
        value: Status.STARTED,
      },
      {
        label: t('active_cycles'),
        value: Status.ACTIVE,
      },
      {
        label: t('inactive_cycles'),
        value: Status.INACTIVE,
      },
    ];
  }, []);

  return (
    <div>
      <div className={css(wrapperRule)}>
        <div className={css(wrapperRule, { gap: '20px' })}>
          <Button
            mode='inverse'
            onPress={() => navigate(buildPath(Page.PERFORMANCE_CYCLE_POPULATION_MATRIX))}
            isDisabled={true}
          >
            <Icon graphic={'link'} />
            <span className={css(textRule)}>
              <Trans i18nKey={'population_matrix '}>Population matrix</Trans>
            </span>
          </Button>
          <Button
            onPress={() =>
              navigate(buildPath(paramsReplacer(Page.CREATE_PERFORMANCE_CYCLE, { ':performanceCycleUuid': 'new' })))
            }
          >
            <Icon graphic={'add'} invertColors={true} />
            <span className={css(textRule)}>
              <Trans i18nKey={'create_performance_cycle'}>Create performance cycle</Trans>
            </span>
          </Button>
        </div>
        <div className={css({ padding: '0px 10px' })}>
          <Select
            name={'cycles'}
            placeholder={'Select Performance Cycle'}
            options={selectOptions}
            onChange={(e) => handleSelectFilter(e.target.value)}
            value={active}
          />
        </div>
      </div>
      <PerformanceCycleTable cycleType={active} />
    </div>
  );
};

const textRule: Rule = {
  paddingLeft: '7px',
};

const wrapperRule: Rule = { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap-reverse' };

export default PerformanceCycleAdministration;
