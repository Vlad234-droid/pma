import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rule, useStyle } from '@dex-ddl/core';

import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import { Employee } from 'config/types';

import PendingApprovals from '../PendingApprovals';
import Actions from '../Actions';
import { View } from '../../config/types';
import { getLastTimelineStatus } from '../../utils';
import TeamMateProfile from '../TeamMateProfile';

type Props = {
  loaded: boolean;
  colleagues: Employee[];
  employeeWithPendingApprovals: Employee[];
  employeePendingApprovals: Employee[];
  view: View;
  colleagueUuid?: string;
  loadManagers: () => void;
};

const TeamWidgets: FC<Props> = ({
  loaded,
  colleagues,
  employeeWithPendingApprovals,
  employeePendingApprovals,
  view,
  colleagueUuid,
  loadManagers,
}) => {
  const { css } = useStyle();
  const waitingCount = employeeWithPendingApprovals?.length;
  const draftCount = employeePendingApprovals?.length;
  const showActions = view === View.DIRECT_REPORTS;

  useEffect(() => {
    if (colleagueUuid) loadManagers();
  }, [colleagueUuid, view]);

  return (
    <div data-test-id='team-widgets' className={css(wrapperStyles)}>
      <div className={css(listWrapperStyles)}>
        <div>
          {showActions && (
            <Link to={buildPath(Page.MY_ACTIONS)}>
              <PendingApprovals count={waitingCount} />
            </Link>
          )}
          <div className={css(listStyles)}>
            {loaded &&
              colleagues.map((employee: Employee) => (
                <TeamMateProfile
                  fullTeamView={view === View.FULL_TEAM}
                  key={employee.uuid}
                  uuid={employee.uuid}
                  status={getLastTimelineStatus(employee)}
                  employee={employee}
                />
              ))}
          </div>
        </div>
      </div>
      <div data-test-id='more' className={css(actionsStyles)}>
        {showActions && <Actions draftCount={draftCount} waitingCount={waitingCount} />}
      </div>
    </div>
  );
};

const wrapperStyles: Rule = {
  display: 'flex',
  flexWrap: 'wrap-reverse',
  gridGap: '8px',
  marginTop: '8px',
  alignItems: 'stretch',
};

const listWrapperStyles: Rule = {
  flex: '3 1 375px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const actionsStyles: Rule = { flex: '1 0 216px' };

const listStyles: Rule = {
  paddingTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

export default TeamWidgets;
