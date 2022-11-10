import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { ReviewsActions, SchemaActions, getAllReviews, getColleaguesSchemas } from '@pma/store';

import { useTenant } from 'features/general/Permission';
import useDispatch from 'hooks/useDispatch';
import ColleagueInfo from 'components/ColleagueInfo';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { TileWrapper } from 'components/Tile';
import { Notification } from 'components/Notification';
import { useTranslation } from 'components/Translation';
import { ActionStatus, ReviewType, Status } from 'config/enum';
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

  const dispatch = useDispatch();
  const { css } = useStyle();
  const { t } = useTranslation();
  const tenant = useTenant();
  const reviews = useSelector(getAllReviews) || [];
  const cycleUuidList = useMemo(
    () => [...new Set(colleague.timeline.map(({ cycleUuid }) => cycleUuid))] as string[],
    [colleague.uuid],
  );

  const reviewSchemaMap = useSelector(getColleaguesSchemas(colleague.uuid)) || {};

  const handleUpdateReview = useCallback(
    ({
      prevStatus,
      status,
      tlUuid,
      code,
      cycleUuid,
      reviewType,
      reason,
    }: {
      prevStatus: Status;
      status: Status;
      tlUuid: string;
      code: string;
      cycleUuid: string;
      reviewType: ReviewType;
      reason?: string;
    }) => {
      const data = {
        reason,
        status,
        code,
        cycleUuid,
        colleagueUuid: colleague.uuid,
        reviews: colleagueReviews
          .filter(({ tlPointUuid }) => tlPointUuid === tlUuid)
          .map(({ number, type, properties }) => {
            if (type === ReviewType.MYR) {
              return { number };
            }
            return { number, properties };
          }),
      };
      onUpdate(reviewType, data);
      setIsOpenSuccessModal(true);
      setStatusHistory({ prevStatus, status, type: reviewType });
    },
    [colleague, colleagueReviews],
  );

  const colleagueReviewUuids = useMemo(
    () => colleague.reviews.map(({ uuid }) => uuid),
    [JSON.stringify(colleague.reviews)],
  );

  useEffect(() => {
    colleagueReviewUuids.forEach((uuid) => {
      dispatch(ReviewsActions.getReviewByUuid({ uuid }));
    });
    cycleUuidList.forEach((cycleUuid) => {
      dispatch(
        SchemaActions.getColleagueSchema({
          colleagueUuid: colleague.uuid,
          cycleUuid,
        }),
      );
    });
  }, [colleagueReviewUuids]);

  useEffect(() => {
    updateColleagueReviews(reviews);
  }, [reviews]);

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
                        <ExpandButton onClick={(expanded) => expanded && setColleagueExpanded(colleague.uuid)} />
                      </div>
                    </div>
                  </div>
                  <Panel>
                    {colleague.timeline.map((colleagueTimeline) => {
                      const { code, uuid } = colleagueTimeline;
                      const reviewGroupByStatus: [Status, any[]][] = [];
                      const colleagueReviews = colleague.reviews.filter(({ tlPointUuid }) => tlPointUuid === uuid);
                      const statusStatistics = Object.keys(colleagueTimeline.statistics || {}) as Status[];

                      for (const status of statusStatistics) {
                        reviewGroupByStatus.push([
                          status,
                          colleagueReviews.filter((review) => status === review.status),
                        ]);
                      }

                      return (
                        <div className={css({ padding: '24px 35px 24px 24px' })} key={uuid}>
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
                          {reviewGroupByStatus.map(([statusReview, colleagueReviews]) => {
                            return (
                              <div key={statusReview}>
                                {colleagueReviews.map((review) => {
                                  const reviewData = reviews.find(({ uuid }) => uuid === review?.uuid);
                                  if (!reviewData) return null;
                                  return (
                                    <ColleagueReview
                                      key={review.uuid}
                                      colleagueUuid={colleague.uuid}
                                      review={reviewData}
                                      timeline={colleagueTimeline}
                                      schema={reviewSchemaMap?.[colleagueTimeline?.cycleUuid]?.[code] || []}
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
                                      tlPointUuid={colleagueTimeline.uuid}
                                      reviewType={colleagueTimeline.reviewType}
                                      cycleUuid={colleagueTimeline.cycleUuid || 'CURRENT'}
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
