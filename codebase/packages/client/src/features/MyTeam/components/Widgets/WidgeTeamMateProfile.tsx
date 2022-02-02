import React, { FC } from 'react';
import { colors, Colors, Rule, useStyle } from '@dex-ddl/core';

import { TileWrapper } from 'components/Tile';
import { Graphics, Icon } from 'components/Icon';
import LinkButton from 'components/LinkButton';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { Status, TimelineType, Rating } from 'config/enum';
import { Page } from 'pages/types';
import { useNavigate } from 'react-router-dom';
import { paramsReplacer } from 'utils';
import { buildPath } from 'features/Routes';
import { Employee } from 'config/types';

import ColleagueInfo from '../ColleagueInfo';

export type WidgetTeamMateProfileProps = {
  uuid: string;
  status?: Status;
  employee: Employee;
  fullTeamView?: boolean;
  rating?: Rating;
  onClick?: () => void;
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

export const WidgetTeamMateProfile: FC<WidgetTeamMateProfileProps> = ({
  uuid,
  status,
  employee,
  fullTeamView = false,
  rating,
  onClick,
}) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const [graphics, color] = getIcon(status);

  const viewUserObjectives = (uuid) => {
    navigate(buildPath(paramsReplacer(`${Page.USER_OBJECTIVES}`, { ':uuid': uuid })));
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
                  <div className={css(wrapperStyle)} onClick={onClick}>
                    <ColleagueInfo
                      firstName={employee.firstName}
                      lastName={employee.lastName}
                      jobName={employee.jobName}
                      businessType={employee.businessType}
                      manager={fullTeamView ? employee.lineManager : undefined}
                    />
                    <div className={css({ marginLeft: 'auto', display: 'flex', alignItems: 'center' })}>
                      <div className={css({ padding: '12px 12px' })}>
                        {rating ? (
                          <span className={css(ratingStyle)}>{rating}</span>
                        ) : (
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
                        )}
                      </div>
                      <>
                        {!fullTeamView && !rating && (
                          <div className={css({ padding: '0px 12px' })}>
                            <Icon graphic={graphics} fill={color} />
                          </div>
                        )}
                        {!rating && (
                          <div className={css({ paddingLeft: '12px' })}>
                            <ExpandButton />
                          </div>
                        )}
                      </>
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

const ratingStyle: Rule = ({ theme }) => ({
  fontSize: theme.spacing.s4,
  lineHeight: '20px',
  color: theme.colors.tescoBlue,
});

const reviewItem: Rule = {
  display: 'inline-block',
  paddingRight: '30px',
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '18px',
};
