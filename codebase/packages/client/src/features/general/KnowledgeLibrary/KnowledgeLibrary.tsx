import React, { FC } from 'react';
import { getKnowledgeMeta } from '@pma/store';
import { useStyle, Rule } from '@pma/dex-wrapper';

import { useSelector } from 'react-redux';

import { useTranslation } from 'components/Translation';
import { CanPerform, role } from 'features/general/Permission';
import Spinner from 'components/Spinner';
import List from './components/List';
import Info from './components/Info';
import useData from './hooks/useData';

export const TEST_ID = 'test-wrapper';

const KnowledgeLibrary: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const { loading, loaded } = useSelector(getKnowledgeMeta);

  const { colleaguesData, managersData } = useData({});

  if (loading && !loaded && (!colleaguesData.length || !managersData.length)) return <Spinner fullHeight />;

  return (
    <div data-test-id={TEST_ID} className={css(wrapperRule)}>
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

export default KnowledgeLibrary;
