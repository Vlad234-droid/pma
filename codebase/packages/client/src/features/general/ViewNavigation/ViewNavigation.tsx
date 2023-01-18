import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { role, usePermission } from 'features/general/Permission';
import { RouterSwitch } from 'components/RouterSwitch';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';

import { Page } from 'pages';

const ViewNavigation: FC = () => {
  const { t } = useTranslation();
  const { css } = useStyle();

  const isLineManager = usePermission([role.LINE_MANAGER]);

  const isTalentAdmin = usePermission([role.TALENT_ADMIN]);
  const isPeopleTeam = usePermission([role.PEOPLE_TEAM]);

  const links = [
    isLineManager || isTalentAdmin || isPeopleTeam
      ? { link: buildPath(Page.CONTRIBUTION), name: t('my_view', 'My View') }
      : null,
    isLineManager ? { link: buildPath(Page.MY_TEAM), name: t('my_team', 'My Team') } : null,
    isTalentAdmin || isPeopleTeam
      ? { link: buildPath(Page.PEOPLE_TEAM), name: t('title_people_team', 'People Team') }
      : null,
  ].filter(Boolean);

  return (
    <div className={css(wrapperStyles)}>
      <RouterSwitch links={links as any} />
    </div>
  );
};

export default ViewNavigation;

const wrapperStyles: Rule = ({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};
