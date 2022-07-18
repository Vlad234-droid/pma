import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  colleagueUUIDSelector,
  getAllReviews,
  getAllReviewSchemas,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
} from '@pma/store';

import useDispatch from 'hooks/useDispatch';
import ColleagueInfo from 'components/ColleagueInfo';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { TileWrapper } from 'components/Tile';
import { ReviewType, Status } from 'config/enum';
import { ColleagueGroupReviews } from '../ColleagueGroupReviews';
import { Timeline, Review } from 'config/types';

type Props = {
  status: Status;
  colleague: any;
};

const ColleagueAction: FC<Props> = ({ status, colleague }) => {
  const [colleagueExpanded, setColleagueExpanded] = useState<string>();
  const [colleagueReviews, updateColleagueReviews] = useState<any>([]);

  const dispatch = useDispatch();
  const { css } = useStyle();

  const { loaded: reviewLoaded = false } = useSelector(reviewsMetaSelector);
  const approverUuid = useSelector(colleagueUUIDSelector);
  const allColleagueReviews = useSelector(getAllReviews) || [];
  const allColleagueReviewsSchema = useSelector(getAllReviewSchemas) || [];
  const groupColleagueReviews: { [key: string]: { timeline: Timeline; reviews: Review[] } } = {};
  for (const timeline of colleague.timeline) {
    groupColleagueReviews[timeline.code] = {
      timeline,
      reviews: colleagueReviews.filter((review) => review.tlPointUuid === timeline.uuid),
    };
  }

  const handleUpdateReviewStatus = useCallback(
    (status: Status) => (reviewType: ReviewType) => (reason: string) => {
      const { timeline = [] } = colleague;
      const reviews = colleague?.reviews?.filter(
        ({ status, type }) => status === Status.WAITING_FOR_APPROVAL && type === reviewType,
      );

      const timelineId = reviews[0]?.tlPointUuid;
      const code = timeline.find((tl) => tl.uuid == timelineId)?.code;

      const update = {
        pathParams: {
          colleagueUuid: colleague.uuid,
          approverUuid,
          code,
          cycleUuid: 'CURRENT',
          status,
        },
        data: {
          ...(reason ? { reason } : {}),
          status,
          colleagueUuid: colleague.uuid,
          reviews: reviews.map(({ number, properties }) => {
            if (reviewType !== ReviewType.MYR) {
              return { number, properties };
            }
            return { number };
          }),
        },
      };

      dispatch(ReviewsActions.updateReviewStatus(update));
    },
    [colleague, reviewLoaded],
  );
  const fetchColleagueReviews = (colleagueUuid: string) => {
    setColleagueExpanded(colleagueUuid);
    dispatch(SchemaActions.clearSchemaData());
    dispatch(
      ReviewsActions.getColleagueReviews({ pathParams: { colleagueUuid: colleagueUuid, cycleUuid: 'CURRENT' } }),
    );
    dispatch(SchemaActions.getSchema({ colleagueUuid }));
  };

  useEffect(() => {
    const reviewsUuid = colleague?.reviews?.map(({ uuid }) => uuid) || [];
    const colleaguesReviews = allColleagueReviews.filter(
      (review) => reviewsUuid.includes(review.uuid) && review.status === status,
    );
    updateColleagueReviews(colleaguesReviews);
  }, [reviewLoaded, status]);

  return (
    <div data-test-id={`colleague-${colleague.uuid}`}>
      <TileWrapper>
        <Accordion id={`team-mate-accordion-${colleague.uuid}`} customStyle={accordionStyle}>
          <BaseAccordion id={`team-mate-base-accordion-${colleague.uuid}`}>
            {({ collapseAllSections }) => {
              if (colleague.uuid !== colleagueExpanded) {
                collapseAllSections();
              }
              return (
                <Section defaultExpanded={false}>
                  <div className={css(sectionBodyStyle)}>
                    <ColleagueInfo
                      firstName={colleague.firstName}
                      lastName={colleague.lastName}
                      jobName={colleague?.jobName}
                      businessType={colleague?.businessType}
                    />
                    <div className={css(expandButtonStyle)}>
                      <div data-test-id={`expand-button-${colleague.uuid}`} className={css({ paddingLeft: '12px' })}>
                        <ExpandButton onClick={(expanded) => expanded && fetchColleagueReviews(colleague.uuid)} />
                      </div>
                    </div>
                  </div>
                  <Panel>
                    {Object.keys(groupColleagueReviews).map((code) => (
                      <ColleagueGroupReviews
                        key={code}
                        status={status}
                        reviewType={groupColleagueReviews[code].timeline.reviewType as ReviewType}
                        reviews={groupColleagueReviews[code].reviews}
                        schema={allColleagueReviewsSchema[code] || []}
                        updateReviewStatus={handleUpdateReviewStatus}
                        updateColleagueReviews={updateColleagueReviews}
                      />
                    ))}
                  </Panel>
                </Section>
              );
            }}
          </BaseAccordion>
        </Accordion>
      </TileWrapper>
    </div>
  );
};

export default ColleagueAction;

const accordionStyle: Rule = {
  borderBottom: 'none',
  marginTop: 0,
};

const sectionBodyStyle: Rule = {
  padding: '24px',
  display: 'flex',
};

const expandButtonStyle: Rule = { marginLeft: 'auto', display: 'flex', alignItems: 'center' };
