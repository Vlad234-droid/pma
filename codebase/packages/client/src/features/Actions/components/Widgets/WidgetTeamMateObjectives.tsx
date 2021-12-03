import React, { FC, useEffect } from 'react';
import { colors, fontWeight, Rule, useStyle } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Avatar } from 'components/Avatar';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { ObjectiveType, ReviewType, Status } from 'config/enum';
import { Notification } from 'components/Notification';
import useDispatch from 'hooks/useDispatch';
import { ActionButtons } from './ActionButtons';
import { useSelector } from 'react-redux';

import { Tile as ObjectiveTile } from 'features/Objectives';

import {
  ReviewsActions,
  reviewsMetaSelector,
  getAllReviewSchemas,
  schemaMetaSelector,
  getAllColleagueReviews,
} from '@pma/store';

export type WidgetTeamMateObjectivesProps = {
  id: string;
  status: Status;
  colleague: any;
  colleagueReviews: any;
  setColleagueReviews: any;
};

export const WidgetTeamMateObjectives: FC<WidgetTeamMateObjectivesProps> = ({
  status,
  colleague,
  colleagueReviews,
  setColleagueReviews,
}) => {
  const dispatch = useDispatch();
  const { css } = useStyle();
  const allSchemas = useSelector(getAllReviewSchemas);
  const { loaded: schemaLoaded = false } = useSelector(schemaMetaSelector);
  const allColleagueReviews = useSelector(getAllColleagueReviews);
  const { loaded: reviewsLoaded } = useSelector(reviewsMetaSelector);
  const timeLine = colleague?.timeline?.filter((timeline) => timeline.status === status);

  useEffect(() => {
    if (reviewsLoaded && schemaLoaded) {
      const mappedReviews = {};
      for (const key of Object.keys(allColleagueReviews)) {
        mappedReviews[key] = allColleagueReviews[key]?.map((reviewItem) => {
          const { components = [] } = allSchemas[reviewItem.type];
          const formElements = components.filter((component) => component.type != 'text');

          const status = reviewItem.status;
          const type = reviewItem.type;
          const review = reviewItem?.properties?.mapJson;
          const subTitle = review['title'] || '';
          const description = review['description'] || '';
          const explanations = formElements
            .filter(({ key }) => !['title', 'description'].includes(key))
            .map(({ key, label }) => ({ title: label, steps: review[key] ? [review[key]] : [] }));

          return {
            id: reviewItem.uuid,
            number: Number(reviewItem.number),
            title: `${ObjectiveType[type]} ${reviewItem.number}`,
            subTitle: subTitle,
            description: description,
            explanations,
            status,
            type,
          };
        });
      }
      setColleagueReviews(mappedReviews);
    }
  }, [reviewsLoaded, schemaLoaded, allColleagueReviews.length, colleague.uuid]);

  const fetchData = (colleagueUuid) => {
    dispatch(
      ReviewsActions.getColleagueReviews({ pathParams: { colleagueUuid: colleagueUuid, cycleUuid: 'CURRENT' } }),
    );
  };

  const updateReviewStatus =
    (status: Status) =>
    (reviewType: ReviewType) =>
    ({ reason }: { reason?: string }) => {
      const update = {
        pathParams: { colleagueUuid: colleague.uuid, type: reviewType, cycleUuid: 'CURRENT', status },
        data: {
          ...(reason ? { reason } : {}),
          status,
          colleagueUuid: colleague.uuid,
          reviews: colleague.reviews.filter(
            ({ status, type }) => status === Status.WAITING_FOR_APPROVAL && type === reviewType,
          ),
        },
      };
      dispatch(ReviewsActions.updateReviewStatus(update));
    };
  const approveColleagues = updateReviewStatus(Status.APPROVED);
  const declineColleagues = updateReviewStatus(Status.DECLINED);

  return (
    <>
      <TileWrapper>
        <Accordion
          id={`team-mate-accordion-${colleague.uuid}`}
          customStyle={{
            borderBottom: 'none',
            marginTop: 0,
          }}
        >
          <BaseAccordion id={`team-mate-base-accordion-${colleague.uuid}`}>
            {() => {
              return (
                <>
                  <Section defaultExpanded={false}>
                    <div className={css(wrapperStyle)}>
                      <div className={css({ display: 'flex', alignItems: 'center' })}>
                        <Avatar size={40} />
                      </div>
                      <div className={css(headerBlockStyle)}>
                        <span className={css(titleStyle)}>{`${colleague.firstName} ${colleague.lastName}`}</span>
                        <span
                          className={css(descriptionStyle)}
                        >{`${colleague.jobName}, ${colleague.businessType}`}</span>
                      </div>
                      <div className={css({ marginLeft: 'auto', display: 'flex', alignItems: 'center' })}>
                        <div className={css({ paddingLeft: '12px' })}>
                          <ExpandButton onClick={(expanded) => expanded && fetchData(colleague.uuid)} />
                        </div>
                      </div>
                    </div>
                    <Panel>
                      <div className={css({ padding: '24px 35px 24px 24px' })}>
                        <Notification
                          graphic='information'
                          iconColor='pending'
                          text='It’s time to approve or decline your colleagues objectives'
                          customStyle={{
                            background: '#FFDBC2',
                            marginBottom: '20px',
                          }}
                        />
                        {timeLine.map((timeline) => {
                          return (
                            <div key={`element-${timeline.reviewType}-${colleague.uuid}`}>
                              {(colleagueReviews[colleague.uuid] || [])
                                .filter((review) => review.type === timeline.reviewType)
                                .map(({ id, title, subTitle, description, explanations }) => (
                                  <ObjectiveTile
                                    key={`${timeline.reviewType}-${id}`}
                                    {...{ id, title, subTitle, description, explanations }}
                                  />
                                ))}
                              {status === Status.WAITING_FOR_APPROVAL && (
                                <ActionButtons
                                  approveColleagues={approveColleagues(timeline.reviewType)}
                                  declineColleagues={declineColleagues(timeline.reviewType)}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </Panel>
                  </Section>
                </>
              );
            }}
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
