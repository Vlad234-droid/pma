import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Rule, CreateRule, useStyle } from '@pma/dex-wrapper';
import { PerformanceCycleActions, getPerformanceCycleSelector, performanceCycleMetaSelector } from '@pma/store';

import { paramsReplacer } from 'utils';
import useDispatch from 'hooks/useDispatch';
import { buildPath } from 'features/Routes';
import { TileWrapper } from 'components/Tile';
import { Radio } from 'components/Form';
import { Trans } from 'components/Translation';
import Spinner from 'components/Spinner';
import Action from 'components/Action';
import LinkButton from 'components/LinkButton';
import { Graphics } from 'components/Icon';
import { Page } from 'pages/types';
import { Status } from './type';

const PerformanceCycleAdministration: FC = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [active, setActive] = useState(Status.STARTED);

  const data = useSelector(getPerformanceCycleSelector) || {};
  const { loading, loaded } = useSelector(performanceCycleMetaSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(PerformanceCycleActions.getGetAllPerformanceCycles());
  }, []);

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

  const handleChangePerformanceCycleStatus = (uuid: string, status: string) => {
    dispatch(PerformanceCycleActions.updatePerformanceCycleStatus({ uuid, status }));
  };

  const handleStartPerformanceCycle = (uuid: string) => {
    dispatch(PerformanceCycleActions.startPerformanceCycle(uuid));
  };

  const handleDeployPerformanceCycle = (uuid: string) => {
    dispatch(PerformanceCycleActions.deployPerformanceCycle(uuid));
  };

  return (
    <div>
      <div className={css({ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap-reverse' })}>
        <div className={css({ display: 'flex' })}>
          <div className={css({ padding: '0px 10px' })}>
            <label
              className={css({
                display: 'flex',
                alignItems: 'center',
              })}
            >
              <Radio
                name='status'
                checked={active === Status.DRAFT}
                onChange={() => handleSelectFilter(Status.DRAFT)}
              />
              <span
                className={css({
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '0px 5px',
                })}
              >
                <Trans i18nKey='drafts'>Drafts</Trans>
              </span>
            </label>
          </div>
          <div className={css({ padding: '0px 10px' })}>
            <label
              className={css({
                display: 'flex',
                alignItems: 'center',
              })}
            >
              <Radio
                name='status'
                checked={active === Status.REGISTERED}
                onChange={() => handleSelectFilter(Status.REGISTERED)}
              />
              <span
                className={css({
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '0px 5px',
                })}
              >
                <Trans i18nKey='registered_cycles'>Registered</Trans>
              </span>
            </label>
          </div>
          <div className={css({ padding: '0px 10px' })}>
            <label
              className={css({
                display: 'flex',
                alignItems: 'center',
              })}
            >
              <Radio
                name='status'
                checked={active === Status.STARTED}
                onChange={() => handleSelectFilter(Status.STARTED)}
              />
              <span
                className={css({
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '0px 5px',
                })}
              >
                <Trans i18nKey='started_cycles'>Started</Trans>
              </span>
            </label>
          </div>
          <div className={css({ padding: '0px 10px' })}>
            <label
              className={css({
                display: 'flex',
                alignItems: 'center',
              })}
            >
              <Radio
                name='status'
                checked={active === Status.ACTIVE}
                onChange={() => handleSelectFilter(Status.ACTIVE)}
              />
              <span
                className={css({
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '0px 5px',
                })}
              >
                <Trans i18nKey='active_cycles'>Active</Trans>
              </span>
            </label>
          </div>
          <div className={css({ padding: '0px 10px' })}>
            <label
              className={css({
                display: 'flex',
                alignItems: 'center',
              })}
            >
              <Radio
                name='status'
                checked={active === Status.INACTIVE}
                onChange={() => handleSelectFilter(Status.INACTIVE)}
              />
              <span
                className={css({
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '0px 5px',
                })}
              >
                <Trans i18nKey='inactive_cycles'>Inactive</Trans>
              </span>
            </label>
          </div>
        </div>
        <Button
          onPress={() =>
            navigate(buildPath(paramsReplacer(Page.CREATE_PERFORMANCE_CYCLE, { ':performanceCycleUuid': 'new' })))
          }
        >
          <Trans i18nKey={'create_performance_cycle'}>Create performance cycle</Trans>
        </Button>
      </div>
      <div className={css(headWrapperStyles({ mobileScreen }))}>
        <TileWrapper customStyle={{ padding: '24px' }}>
          <div
            className={css({
              fontWeight: 'bold',
              fontSize: '20px',
              paddingBottom: '24px',
            })}
          >
            {`${active.charAt(0).toUpperCase() + active.slice(1).toLowerCase()} Performance cycles (${
              data.filter((item) => item.status === active).length
            })`}
          </div>
          {loading || !loaded ? (
            <Spinner />
          ) : (
            <table
              className={css({
                borderCollapse: 'collapse',
                width: '100%',
              })}
            >
              <thead>
                <tr className={css({ background: '#F3F9FC', fontSize: '14px', lineHeight: '18px' })}>
                  <th className={css(item)}>
                    <Trans i18nKey={'name'}>Name</Trans>
                  </th>
                  <th className={css(item)}>
                    <Trans i18nKey={'template_name'}>Template name</Trans>
                  </th>
                  <th className={css(item)}>
                    <Trans i18nKey={'cycle_group'}>Cycle group</Trans>
                  </th>
                  <th className={css(item)}>
                    <Trans i18nKey={'start_date_end_date'}>Start Date - End date</Trans>
                  </th>
                  <th className={css(item)}>
                    <Trans i18nKey={'created_by'}>Created by</Trans>
                  </th>
                  <th className={css(item)}>
                    <Trans i18nKey={'action'}>Action</Trans>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) => item.status === active)
                  .map(({ name, template, entryConfigKey, date, createdBy, uuid, status }) => {
                    const items: Array<{ text: string; action: () => void; icon: Graphics }> = [
                      {
                        text: 'View',
                        action: () => {
                          navigate(`/${Page.PERFORMANCE_CYCLE}/${uuid}`);
                        },
                        icon: 'edit',
                      },
                    ];

                    if (status === Status.ACTIVE) {
                      items.push({
                        text: 'Start',
                        action: () => handleStartPerformanceCycle(uuid),
                        icon: 'calender',
                      });
                    }
                    if (status === Status.REGISTERED) {
                      items.push(
                        {
                          text: 'Deploy',
                          action: () => handleDeployPerformanceCycle(uuid),
                          icon: 'calender',
                        },
                        {
                          text: 'Inactivate',
                          action: () => handleChangePerformanceCycleStatus(uuid, Status.INACTIVE),
                          icon: 'roundStop',
                        },
                      );
                    }

                    return (
                      <tr key={uuid}>
                        <td className={css(item)}>{name}</td>
                        <td className={css(item)}>{template?.fileName}</td>
                        <td className={css(item)}>{entryConfigKey}</td>
                        <td className={css(item)}>{date}</td>
                        <td className={css(item)}>{createdBy}</td>
                        <td className={css(lastItem)}>
                          <LinkButton onClick={() => undefined}>
                            <Action items={items} />
                          </LinkButton>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </TileWrapper>
      </div>
    </div>
  );
};

const headWrapperStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  gap: '10px',
  margin: '15px 0',
  flexDirection: mobileScreen ? 'column' : 'row',
});

const item: Rule = { padding: '14px', textAlign: 'start' };

const lastItem: Rule = { padding: '14px', textAlign: 'end' };

export default PerformanceCycleAdministration;
