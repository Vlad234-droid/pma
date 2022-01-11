import React, { FC } from 'react';
import { colors, Colors, Rule, useStyle } from '@dex-ddl/core';

import { TileWrapper } from 'components/Tile';
import { Graphics, Icon } from 'components/Icon';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { Status, TimelineType } from 'config/enum';
import { Page } from 'pages/types';
import { useHistory } from 'react-router-dom';
import { paramsReplacer } from 'utils';
import { buildPath } from 'features/Routes';

import ColleagueInfo from '../ColleagueInfo';

export type Review = {
  uuid: string;
  status: string;
  type: string;
  code: string;
  description: string;
  reviewType: string;
  number: number;
};

export type Employee = {
  firstName: string;
  lastName: string;
  jobName: string;
  businessType: string;
  uuid: string;
  timeline: Review[];
};

export type WidgetTeamMateProfileProps = {
  uuid: string;
  status?: Status;
  employee: Employee;
  simpleView?: boolean;
};

export const getIcon = (status): [Graphics, Colors] => {
  const contents: { [key: string]: [Graphics, Colors] } = {
    [Status.NOT_AVAILABLE]: ['calender', 'tescoBlue'],
    [Status.AVAILABLE]: ['roundAlert', 'pending'],
    [Status.OVERDUE]: ['roundAlert', 'error'],
    [Status.DRAFT]: ['roundPencil', 'base'],
    [Status.APPROVED]: ['roundTick', 'green'],
    [Status.PENDING]: ['roundClock', 'pending'],
    [Status.WAITING_FOR_APPROVAL]: ['roundClock', 'pending'],
    [Status.DECLINED]: ['roundAlert', 'pending'],
  };

  return contents[status] || ['roundCircle', 'pending'];
};

export const WidgetTeamMateProfile: FC<WidgetTeamMateProfileProps> = ({ uuid, status, employee, simpleView = false }) => {
  const { css } = useStyle();
  const history = useHistory();

  const [graphics, color] = getIcon(status);

  const viewUserObjectives = (uuid) => {
    history.push(buildPath(paramsReplacer(`${Page.USER_OBJECTIVES}`, { ':uuid': uuid })));
  };

  return (
    <>
      <TileWrapper>
        <Accordion
          id={`team-mate-accordion-${uuid}`}
          customStyle={{
            borderBottom: 'none',
            marginTop: 0,
          }}
        >
          <BaseAccordion id={`team-mate-base-accordion-${uuid}`}>
            {() => (
              <>
                <Section defaultExpanded={false}>
                  <div className={css(wrapperStyle)}>
                    <ColleagueInfo
                      firstName={employee.firstName}
                      lastName={employee.lastName}
                      jobName={employee.jobName}
                      businessType={employee.businessType}
                    />
                    <div className={css({ marginLeft: 'auto', display: 'flex', alignItems: 'center' })}>
                      <div className={css({ padding: '12px 12px' })}>
                        <button
                          onClick={() => viewUserObjectives(employee.uuid)}
                          className={css({
                            fontSize: '16px',
                            lineHeight: '20px',
                            color: colors.tescoBlue,
                            cursor: 'pointer',
                            border: 'none',
                            backgroundColor: 'transparent',
                          })}
                        >
                          View profile
                        </button>
                      </div>
                      {!simpleView && (
                        <>
                          <div className={css({ padding: '0px 12px' })}>
                            <Icon graphic={graphics} fill={color} />
                          </div>
                          <div className={css({ paddingLeft: '12px' })}>
                            <ExpandButton />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <Panel>
                    <div className={css({ padding: '24px 35px 24px 24px' })}>
                      <div className={css({ background: '#F6F6F6', padding: '24px', borderRadius: '10px' })}>
                        <div className={css({ justifyContent: 'flex-start' })}>
                          {employee?.timeline
                            ?.filter((review) => review.type !== TimelineType.TIMELINE_POINT)
                            ?.map((review) => {
                              const [graphics, color] = getIcon(review.status);
                              return (
                                <div key={review.uuid} className={css(reviewItem)}>
                                  <div className={css({ paddingBottom: '6px' })}>{review.description}</div>
                                  <Icon graphic={graphics} fill={color} />
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </Panel>
                </Section>
              </>
            )}
          </BaseAccordion>
        </Accordion>
      </TileWrapper>
    </>
  );
};

const wrapperStyle: Rule = {
  padding: '24px',
  display: 'flex',
};

const reviewItem: Rule = {
  display: 'inline-block',
  paddingRight: '30px',
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '18px',
};
