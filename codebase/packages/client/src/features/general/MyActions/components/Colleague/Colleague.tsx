import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import useDispatch from 'hooks/useDispatch';

import { groupArrayOfObjects } from '../../utils';
import { ColleagueInfo } from 'features/general/MyTeam';

import {
  colleagueUUIDSelector,
  getAllReviews,
  getAllReviewSchemas,
  ReviewsActions,
  reviewsMetaSelector,
  SchemaActions,
} from '@pma/store';

import { ReviewType, Status } from 'config/enum';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { TileWrapper } from 'components/Tile';
import { ColleagueGroupReviews } from '../ColleagueGroupReviews';

type Props = {
  status: Status;
  colleague: any;
  colleagueExpanded?: string;
  setColleagueExpanded: (T) => void;
};

export const Colleague: FC<Props> = ({ status, colleague, colleagueExpanded, setColleagueExpanded }) => {
  const dispatch = useDispatch();
  const { css } = useStyle();
  const { loaded: reviewLoaded = false } = useSelector(reviewsMetaSelector);
  const approverUuid = useSelector(colleagueUUIDSelector);
  const allColleagueReviews = useSelector(getAllReviews) || [];
  const allColleagueReviewsSchema = useSelector(getAllReviewSchemas) || [];

  const [colleagueReviews, updateColleagueReviews] = useState<any>([]);

  const groupColleagueReviews: { [key in ReviewType]: any[] } = groupArrayOfObjects(colleagueReviews, 'type');

  const updateReviewStatus = useCallback(
    (status: Status) => (reviewType: ReviewType) => (reason: string) => {
      const update = {
        pathParams: {
          colleagueUuid: colleague.uuid,
          approverUuid,
          type: reviewType,
          cycleUuid: 'CURRENT',
          status,
        },
        data: {
          ...(reason ? { reason } : {}),
          status,
          colleagueUuid: colleague.uuid,
          reviews: colleagueReviews
            .filter(({ status, type }) => status === Status.WAITING_FOR_APPROVAL && type === reviewType)
            .map(({ number, properties }) => {
              if (reviewType !== ReviewType.MYR) {
                return { number, properties };
              }
              return { number };
            }),
        },
      };

      dispatch(ReviewsActions.updateReviewStatus(update));
    },
    [colleague, colleagueReviews],
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
                    {Object.keys(groupColleagueReviews).map((reviewType) => (
                      <ColleagueGroupReviews
                        key={reviewType}
                        status={status}
                        reviewType={reviewType as ReviewType}
                        reviews={groupColleagueReviews[reviewType]}
                        schema={allColleagueReviewsSchema[reviewType] || []}
                        updateReviewStatus={updateReviewStatus}
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

const accordionStyle: Rule = {
  borderBottom: 'none',
  marginTop: 0,
};

const sectionBodyStyle: Rule = {
  padding: '24px',
  display: 'flex',
};

const expandButtonStyle: Rule = { marginLeft: 'auto', display: 'flex', alignItems: 'center' };