import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';

import { useTranslation } from 'components/Translation';
import { CanPerform, role } from 'features/Permission';
import List from '../List';
import Info from '../Info';
import { DataType } from '../../types';
import useData from '../../hooks/useData';

const Wrapper: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const [colleaguesData] = useData({ dataType: DataType.COLLEAGUES });
  const [managersData] = useData({ dataType: DataType.MANAGERS });

  return (
    <div className={css(wrapperRule)}>
      <CanPerform
        perform={[role.LINE_MANAGER]}
        yes={() => (
          <Info
            description={t(
              'this_page_will_take_you_to_links_on_our_tesco_sites_to_help_you',
              'This page will take you to links on our Tesco sites to help you answer questions and build knowledge and capability around Your Contribution.',
            )}
          />
        )}
      />
      <List title={t('for_colleagues', 'For colleagues')} data={colleaguesData} />
      <hr />
      <List title={t('for_managers', 'For managers')} data={managersData} customRule={managersWrapperRule} />
    </div>
  );
};

const wrapperRule: Rule = {
  padding: '0 40px',
};

const managersWrapperRule: Rule = {
  paddingTop: '40px',
};

export default Wrapper;
