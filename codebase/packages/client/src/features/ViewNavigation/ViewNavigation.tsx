import React, { FC } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';

import { PermissionProvider, role } from 'features/Permission';
import { RouterSwitch } from 'components/RouterSwitch';
import { buildPath } from 'features/Routes';
import { useTranslation } from 'components/Translation';

import { Page } from 'pages';

const ViewNavigation: FC = () => {
  const { t } = useTranslation();
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyles)}>
      <PermissionProvider roles={[role.LINE_MANAGER]}>
        <RouterSwitch
          links={[
            { link: buildPath(Page.CONTRIBUTION), name: t('my_view', 'My View') },
            { link: buildPath(Page.MY_TEAM), name: t('my_team', 'My Team') },
          ]}
        />
      </PermissionProvider>
    </div>
  );
};

export default ViewNavigation;

const wrapperStyles: Rule = {
  display: 'flex',
  justifyContent: 'center',
};