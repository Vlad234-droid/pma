import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useStyle, useBreakpoints , Icon as IconCore } from '@dex-ddl/core';
import { Header } from 'components/Header';
import { RouterSwitch } from 'components/RouterSwitch';
import { Status } from 'config/enum';
import { WidgetPending, WidgetTeamMateProfile, YourActions } from 'features/MyTeam';
import { FilterOption } from 'features/Shared';

export const TEST_ID = 'my-team';

const MyTeam: FC = () => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const desktopScreen = !(isBreakpoint.small || isBreakpoint.xSmall);

  return (
    <div className={css({ margin: '8px' })}>
      <Header title='My Team' />
      <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
        {desktopScreen && (
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
            })}
          />
        )}
        <RouterSwitch
          links={[
            { link: 'career-performance', name: 'My  View' },
            { link: 'my-team', name: 'My Team' },
          ]}
        />
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <IconCore graphic='information' />
          <FilterOption />
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap-reverse',
          gridGap: '8px',
          marginTop: '8px',
          alignItems: 'stretch',
        })}
      >
        <div className={css({ flex: '3 1 375px', display: 'flex', flexDirection: 'column', gap: '8px' })}>
          <div>
            <Link to={'/actions'}>
              <WidgetPending count={2} />
            </Link>
            <div className={css({ paddingTop: '8px' })}>
              <WidgetTeamMateProfile id='1' status={Status.PENDING} />
            </div>
          </div>
        </div>
        <div
          data-test-id='more'
          className={css({
            flex: '1 0 216px',
          })}
        >
          <YourActions />
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
