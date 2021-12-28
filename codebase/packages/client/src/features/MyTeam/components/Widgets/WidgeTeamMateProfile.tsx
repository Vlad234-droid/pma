import React, { FC } from 'react';
import { colors, Colors, fontWeight, Rule, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Graphics, Icon } from 'components/Icon';
import { Avatar } from 'components/Avatar';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { Status, TimelineType } from 'config/enum';
import { Page } from 'pages/types';
import { useHistory } from 'react-router-dom';
import { paramsReplacer } from 'utils';
import { buildPath } from 'features/Routes';

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
  id: string;
  status?: Status;
  employee: Employee;
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

export const WidgetTeamMateProfile: FC<WidgetTeamMateProfileProps> = ({ id, status, employee }) => {
  const { css } = useStyle();
  const history = useHistory();

  const [graphics, color] = getIcon(status);

  const viewUserObjectives = (uuid) => {
    history.push(buildPath(paramsReplacer(`${Page.USER_OBJECTIVES}`, {':uuid': uuid})));
  } 

  return (
    <>
      <TileWrapper>
        <Accordion
          id={`team-mate-accordion-${id}`}
          customStyle={{
            borderBottom: 'none',
            marginTop: 0,
          }}
        >
          <BaseAccordion id={`team-mate-base-accordion-${id}`}>
            {() => (
              <>
                <Section defaultExpanded={false}>
                  <div className={css(wrapperStyle)}>
                    <div className={css({ display: 'flex', alignItems: 'center' })}>
                      <Avatar size={40} />
                    </div>
                    <div className={css(headerBlockStyle)}>
                      <span className={css(titleStyle)}>{`${employee.firstName} ${employee.lastName}`}</span>
                      <span className={css(descriptionStyle)}>{`${employee.jobName}, ${employee.businessType}`}</span>
                    </div>
                    <div className={css({ marginLeft: 'auto', display: 'flex', alignItems: 'center' })}>
                      <div className={css({ padding: '12px 12px' })}>
                        <button onClick={() => viewUserObjectives(employee.uuid)} className={css({ fontSize: '16px', lineHeight: '20px', color: colors.tescoBlue, cursor: 'pointer', border: 'none', backgroundColor: 'transparent' })}>
                          View profile
                        </button>
                      </div>
                      <div className={css({ padding: '0px 12px' })}>
                        <Icon graphic={graphics} fill={color} />
                      </div>
                      <div className={css({ paddingLeft: '12px' })}>
                        <ExpandButton />
                      </div>
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

const headerBlockStyle: Rule = {
  display: 'grid',
  padding: '0 20px',
  alignSelf: 'center',
};

const titleStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: fontWeight.bold,
  fontSize: '18px',
  lineHeight: '22px',
  color: colors.tescoBlue,
};

const descriptionStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16x',
  lineHeight: '20px',
  color: colors.base,
};

const reviewItem: Rule = {
  display: 'inline-block',
  paddingRight: '30px',
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '18px',
};
