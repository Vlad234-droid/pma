import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getAllReviews, getAllReviewSchemas, ReviewsActions, reviewsMetaSelector, SchemaActions } from '@pma/store';

import { useTenant } from 'features/general/Permission';
import useDispatch from 'hooks/useDispatch';
import ColleagueInfo from 'components/ColleagueInfo';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { TileWrapper } from 'components/Tile';
import { Notification } from 'components/Notification';
import { useTranslation } from 'components/Translation';
import { ActionStatus, ReviewType, Status } from 'config/enum';
import { Review, Timeline } from 'config/types';
import { Buttons } from '../Buttons';
import { ColleagueReview } from '../ColleagueReviews';
import { Tenant } from 'utils';
import { useSuccessModalContext } from '../../context/successModalContext';

type Props = {
  status: ActionStatus;
  onUpdate: (code: string, data: any) => void;
  colleague: any;
};

const ColleagueAction: FC<Props> = ({ status, colleague, onUpdate }) => {
  const { setOpened: setIsOpenSuccessModal, setStatusHistory } = useSuccessModalContext();
  const [colleagueExpanded, setColleagueExpanded] = useState<string>();
  const [colleagueReviews, updateColleagueReviews] = useState<any>([]);
  const [formsValid, validateReview] = useState<{ [key: string]: boolean }>({});
  const isButtonsDisabled = Object.values(formsValid).some((value) => !value);
  const statuses =
    status === ActionStatus.PENDING
      ? [Status.WAITING_FOR_APPROVAL, Status.WAITING_FOR_COMPLETION]
      : [Status.COMPLETED, Status.APPROVED, Status.DECLINED];

  const dispatch = useDispatch();
  const { css } = useStyle();
  const { t } = useTranslation();
  const tenant = useTenant();

  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);
  const allColleagueReviews = useSelector(getAllReviews) || [];
  const allColleagueReviewsSchema = useSelector(getAllReviewSchemas) || [];

  const groupColleagueReviews = useMemo(() => {
    return ((colleague.timeline as Array<any>).reduce((acc, timeline) => {
      acc[timeline.code] = {
        timeline,
        reviews: colleagueReviews?.filter((review) => review.tlPointUuid === timeline.uuid) || [],
      };
      return acc;
    }, {}) || {}) as { [key: string]: { timeline: Timeline; reviews: Review[] } };
  }, [JSON.stringify(colleagueReviews), colleague.timeline]);

  useEffect(() => {
    const reviewsUuid = colleague?.reviews?.map(({ uuid }) => uuid) || [];
    const colleaguesReviews = allColleagueReviews.filter(
      (review) => reviewsUuid.includes(review.uuid) && statuses.includes(review.status),
    );
    updateColleagueReviews(colleaguesReviews);
  }, [reviewLoaded, status]);

  const handleUpdateReview = useCallback(
    (prevStatus: Status, status: Status) => (code: string) => (reason: string) => {
      const { reviewType, uuid } = colleague?.timeline?.find((timeline) => timeline.code === code);

      const data = {
        ...(reason ? { reason } : {}),
        status,
        code,
        colleagueUuid: colleague.uuid,
        reviews: colleagueReviews
          .filter(({ status, tlPointUuid }) => prevStatus === status && tlPointUuid === uuid)
          .map(({ number, type, properties }) => {
            if (type !== ReviewType.MYR) {
              return { number, properties };
            }
            return { number };
          }),
      };
      onUpdate(reviewType, data);
      setIsOpenSuccessModal(true);
      setStatusHistory({ prevStatus, status, type: reviewType });
    },
    [colleague, colleagueReviews, reviewLoaded],
  );

  const fetchColleagueReviews = (colleagueUuid: string) => {
    setColleagueExpanded(colleagueUuid);
    dispatch(SchemaActions.clearSchemaData());
    dispatch(
      ReviewsActions.getColleagueReviews({
        pathParams: { colleagueUuid: colleagueUuid, cycleUuid: 'CURRENT' },
        searchParams: { includeFiles: true },
      }),
    );
    dispatch(SchemaActions.getSchema({ colleagueUuid }));
  };

  const handleValidateReview = (review: { [key: string]: boolean }) =>
    validateReview((state) => ({ ...state, ...review }));

  const handleChangeReview = (reviewUuid, data) => {
    updateColleagueReviews((stateReviews) =>
      stateReviews?.map((review) => (review.uuid !== reviewUuid ? review : { ...review, properties: { ...data } })),
    );
  };

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
                    {Object.keys(groupColleagueReviews).map((code) => {
                      const reviewGroupByStatus: [Status, any[]][] = [];
                      const colleagueReviews = groupColleagueReviews[code]?.reviews;
                      const colleagueTimeline = groupColleagueReviews[code].timeline;
                      const statusStatistics = Object.keys(colleagueTimeline.statistics || {}) as Status[];

                      for (const status of statusStatistics) {
                        reviewGroupByStatus.push([
                          status,
                          colleagueReviews.filter((review) => status === review.status),
                        ]);
                      }
                      return (
                        <div className={css({ padding: '24px 35px 24px 24px' })} key={code}>
                          <Notification
                            graphic='information'
                            iconColor='pending'
                            text={t(
                              'time_to_approve_or_decline',
                              tenant === Tenant.GENERAL
                                ? 'It’s time to review your colleague’s objectives and / or reviews'
                                : "It's time to review your colleague's priorities and / or reviews",
                              { ns: tenant },
                            )}
                            customStyle={{
                              background: '#FFDBC2',
                              marginBottom: '20px',
                            }}
                          />
                          {reviewGroupByStatus.map(([statusReview, reviews]) => {
                            return (
                              <div key={statusReview}>
                                {reviews.map((review) => {
                                  if (!review) return null;
                                  return (
                                    <ColleagueReview
                                      key={review.uuid}
                                      colleagueUuid={colleague.uuid}
                                      review={review}
                                      timeline={colleagueTimeline}
                                      schema={allColleagueReviewsSchema[code] || []}
                                      validateReview={handleValidateReview}
                                      onUpdate={handleChangeReview}
                                    />
                                  );
                                })}
                                {(statusReview === Status.WAITING_FOR_COMPLETION ||
                                  statusReview === Status.WAITING_FOR_APPROVAL) &&
                                  status === ActionStatus.PENDING && (
                                    <Buttons
                                      status={statusReview}
                                      code={code}
                                      onUpdate={handleUpdateReview}
                                      isDisabled={isButtonsDisabled}
                                    />
                                  )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
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
