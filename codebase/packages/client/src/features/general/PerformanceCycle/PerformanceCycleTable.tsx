import React, { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Rule, CreateRule, useStyle } from '@pma/dex-wrapper';
import { PerformanceCycleActions, getPerformanceCycleSelector, performanceCycleMetaSelector } from '@pma/store';

import { BaseAccordion, BaseSection, Panel, ExpandButton } from 'components/Accordion';
import useDispatch from 'hooks/useDispatch';
import { TileWrapper } from 'components/Tile';
import { Trans } from 'components/Translation';
import Spinner from 'components/Spinner';
import Action from 'components/Action';
import LinkButton from 'components/LinkButton';
import { Graphics } from 'components/Icon';
import { Page } from 'pages/general/types';
import { Status } from './constants/type';

type Props = {
  cycleType: string;
};

const PerformanceCycleTable: FC<Props> = ({ cycleType }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const navigate = useNavigate();

  const data = useSelector(getPerformanceCycleSelector) || {};
  const { loading, loaded } = useSelector(performanceCycleMetaSelector);

  const dispatch = useDispatch();

  const cycles = useMemo(() => {
    return data.filter((item) => item.status === cycleType);
  }, [cycleType, data]);

  useEffect(() => {
    dispatch(PerformanceCycleActions.getGetAllPerformanceCycles());
  }, []);

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
      <div className={css(headWrapperStyles({ mobileScreen }))}>
        <TileWrapper customStyle={{ padding: '24px' }}>
          <div className={css(headerRule)}>
            {`${cycleType.charAt(0).toUpperCase() + cycleType.slice(1).toLowerCase()} Performance cycles (${
              data.filter((item) => item.status === cycleType).length
            })`}
          </div>
          {loading || !loaded ? (
            <Spinner />
          ) : (
            <table className={css(tableRule)}>
              <thead className={css(tableHeaderRule)}>
                <tr>
                  <th className={css(item)}>
                    <Trans i18nKey={'cycle_name'}>Cycle name</Trans>
                  </th>
                  <th className={css(item)}>
                    <Trans i18nKey={'cycle_group'}>Cycle group</Trans>
                  </th>
                  <th className={css(item)}>
                    <Trans i18nKey={'template_name'}>Template</Trans>
                  </th>
                  <th className={css(item)}>
                    <Trans i18nKey={'cycle_period'}>Cycle period</Trans>
                  </th>
                  <th className={css(item)}>
                    <Trans i18nKey={'created_by'}>Created by</Trans>
                  </th>
                  <th className={css(lastItem)}>
                    <Trans i18nKey={'actions'}>Actions</Trans>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cycles.map(({ name, template, entryConfigKey, date, createdBy, uuid, status }) => {
                  const items: Array<{ text: string; action: () => void; icon: Graphics }> = [
                    {
                      text: 'View',
                      action: () => {
                        navigate(`/${Page.PERFORMANCE_CYCLE}/${uuid}`);
                      },
                      icon: 'view',
                    },
                  ];

                  if (status === Status.ACTIVE) {
                    items.push({
                      text: 'Start',
                      action: () => handleStartPerformanceCycle(uuid),
                      icon: 'play',
                    });
                  }
                  if (status === Status.REGISTERED) {
                    items.push(
                      {
                        text: 'Deploy',
                        action: () => handleDeployPerformanceCycle(uuid),
                        icon: 'play',
                      },
                      {
                        text: 'Inactivate',
                        action: () => handleChangePerformanceCycleStatus(uuid, Status.INACTIVE),
                        icon: 'cancel',
                      },
                    );
                  }

                  return (
                    <BaseAccordion id={uuid} key={uuid}>
                      {() => (
                        <BaseSection>
                          {({ expanded }) => (
                            <>
                              <tr className={css(tableRowRule({ expanded }))}>
                                <td className={css(item)}>{name}</td>
                                <td className={css(item)}>{entryConfigKey}</td>
                                <td className={css(item)}>{template?.fileName}</td>
                                <td className={css(item)}>{date}</td>
                                <td className={css(item)}>{createdBy}</td>
                                <td className={css(lastItem)}>
                                  <div className={css(buttonsRule)}>
                                    <ExpandButton />
                                    <LinkButton onClick={() => undefined}>
                                      <Action items={items} />
                                    </LinkButton>
                                  </div>
                                </td>
                              </tr>
                              <Panel>
                                {({ getPanelProps, content }) => (
                                  <tr className={css(tableRowRule({ expanded }))}>
                                    <td colSpan={6}>
                                      <div className={css(accordionPanelStyles)} {...getPanelProps()} ref={content}>
                                        <table className={css(matrixTableRule)}>
                                          <thead className={css(matrixHeadRule)}>
                                            <tr>
                                              <td className={css(tableCell)}>Application Identifiers</td>
                                              <td className={css(tableCell)}>primary_entity</td>
                                              <td className={css(tableCell)}>legal_employer_name</td>
                                              <td className={css(tableCell)}>business_type</td>
                                              <td className={css(tableCell)}>work_level</td>
                                              <td className={css(tableCell)}>salary_frequency</td>
                                              <td className={css(tableCell)}>job_name</td>
                                              <td className={css(tableCell)}>iam_source</td>
                                              <td className={css(tableCell)}>country_code</td>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td className={css(tableCell)}>-</td>
                                              <td className={css(tableCell)}>-</td>
                                              <td className={css(tableCell)}>-</td>
                                              <td className={css(tableCell)}>-</td>
                                              <td className={css(tableCell)}>-</td>
                                              <td className={css(tableCell)}>-</td>
                                              <td className={css(tableCell)}>-</td>
                                              <td className={css(tableCell)}>-</td>
                                              <td className={css(tableCell)}>-</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </Panel>
                            </>
                          )}
                        </BaseSection>
                      )}
                    </BaseAccordion>
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

const tableCell: Rule = ({ theme }) => ({ border: `1px solid ${theme.colors.alto}`, padding: '8px 10px' });

const accordionPanelStyles: Rule = {
  overflow: 'hidden',
  transition: 'max-height 0.6s ease',
};

const headerRule: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  paddingBottom: '24px',
};

const tableRule: Rule = {
  borderCollapse: 'collapse',
  width: '100%',
};

const tableRowRule: CreateRule<{ expanded: boolean }> =
  ({ expanded }) =>
  ({ theme }) => ({
    // @ts-ignore
    backgroundColor: expanded ? theme.colors.lightBlue : 'transparent',
    transition: 'background-color 1s',
  });

const tableHeaderRule: Rule = { fontSize: '14px', lineHeight: '18px' };

const matrixTableRule: Rule = ({ theme }) => ({
  width: '100%',
  borderColor: theme.colors.alto,
  borderCollapse: 'collapse',
  border: `1px solid ${theme.colors.alto}`,
});

const matrixHeadRule: Rule = ({ theme }) => ({ backgroundColor: theme.colors.tescoBlue, color: 'white' });

const buttonsRule: Rule = { display: 'flex', flexDirection: 'row-reverse' };

export default PerformanceCycleTable;
