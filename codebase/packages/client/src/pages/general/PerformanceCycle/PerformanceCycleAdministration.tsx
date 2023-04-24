import React, { FC } from 'react';
import { Button, useStyle, Rule } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';

import { PerformanceCycleTable } from 'features/general/PerformanceCycle';
import { buildPath } from 'features/general/Routes';
import { Trans } from 'components/Translation';
import { Icon } from 'components/Icon';

import { paramsReplacer } from 'utils';
import { Page } from 'pages/general/types';

const PerformanceCycleAdministration: FC = () => {
  const navigate = useNavigate();

  const { css } = useStyle();

  return (
    <>
      <div className={css(wrapperRule)}>
        <div className={css(wrapperRule, { gap: '20px' })}>
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
      </div>
      <PerformanceCycleTable />
    </>
  );
};

const textRule: Rule = {
  paddingLeft: '7px',
};

const wrapperRule: Rule = { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap-reverse' };

export default PerformanceCycleAdministration;
