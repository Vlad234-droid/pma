import React, { FC, useEffect, useState } from 'react';
import { Button, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { useNavigate } from 'react-router-dom';

import { TileWrapper } from 'components/Tile';
import { PerformanceCycleActions, getPerformanceCycleSelector } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';

import { Radio } from 'components/Form';
import { Trans } from 'components/Translation';
import { paramsReplacer } from 'utils';
import { buildPath } from 'features/Routes';
import { Page } from '../types';

const ACTIVE = 'ACTIVE';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT',
}

const PerformanceCycleAdministration: FC = () => {
  const { css } = useStyle();
  const navigate = useNavigate();

  const data = useSelector(getPerformanceCycleSelector) || {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(PerformanceCycleActions.getGetAllPerformanceCycles());
  }, []);

  const [active, setActive] = useState('ACTIVE');

  const item: Rule = { padding: '14px', textAlign: 'start' };
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
              <Radio name='status' checked={active === Status.ACTIVE} onChange={() => setActive(Status.ACTIVE)} />
              <span
                className={css({
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '0px 5px',
                })}
              >
                <Trans i18nKey='active_cycles'>Active cycles</Trans>
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
              <Radio name='status' checked={active === Status.INACTIVE} onChange={() => setActive(Status.INACTIVE)} />
              <span
                className={css({
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '0px 5px',
                })}
              >
                <Trans i18nKey='inactive_cycles'>Inactive cycles</Trans>
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
              <Radio name='status' checked={active === Status.DRAFT} onChange={() => setActive(Status.DRAFT)} />
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
        </div>
        <Button
          onPress={() =>
            navigate(buildPath(paramsReplacer(Page.CREATE_PERFORMANCE_CYCLE, { ':performanceCycleUuid': 'new' })))
          }
        >
          <Trans i18nKey={'create_performance_cycle'}>Create performance cycle</Trans>
        </Button>
      </div>
      <div className={css(headWrapperStyles)}>
        <TileWrapper customStyle={{ padding: '24px' }}>
          <div
            className={css({
              fontWeight: 'bold',
              fontSize: '20px',
              paddingBottom: '24px',
            })}
          >
            {`${active.charAt(0).toUpperCase() + active.slice(1).toLowerCase()} Performance cycles (${
              data.filter((item) => {
                return item.status === active;
              }).length
            })`}
          </div>
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
                  <Trans i18nKey={'organization'}>Organization</Trans>
                </th>
                <th className={css(item)}>
                  <Trans i18nKey={'start_date_end_date'}>Start Date-End date</Trans>
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
                .filter((item) => {
                  return item.status === active;
                })
                .map(({ name, entryConfigKey, date, createdBy, uuid, status }) => {
                  return (
                    <tr key={uuid}>
                      <td className={css(item)}>{name}</td>
                      <td className={css(item)}>{entryConfigKey}</td>
                      <td className={css(item)}>{date}</td>
                      <td className={css(item)}>{createdBy}</td>
                      <td>
                        {status !== ACTIVE && (
                          <Button
                            mode={'inverse'}
                            onPress={() => navigate(`/${Page.PERFORMANCE_CYCLE}/${uuid}`)}
                            styles={[btnStyle]}
                          >
                            <Trans i18nKey={'edit'}>Edit</Trans>
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </TileWrapper>
      </div>
    </div>
  );
};

const headWrapperStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    gap: '10px',
    margin: '15px 0',
    flexDirection: mobileScreen ? 'column' : 'row',
  };
};

const btnStyle = {
  fontSize: '14px',
  border: '1px solid rgb(0, 83, 159)',
  minWidth: '20px',
};

export default PerformanceCycleAdministration;
