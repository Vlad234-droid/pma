import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getAllReviews, getColleaguesSchemas } from '@pma/store';

import { useTenant, Tenant } from 'features/general/Permission';
import ColleagueInfo from 'components/ColleagueInfo';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { TileWrapper } from 'components/Tile';
import { Notification } from 'components/Notification';
import { useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';
import { ActionStatus, ReviewType, Status } from 'config/enum';

import { Buttons } from '../Buttons';
import { ColleagueReview } from '../ColleagueReviews';
import { useSuccessModalContext } from '../../context/successModalContext';
import useFetchColleagueReviews from '../../hook/useFetchColleagueReviews';

type Props = {
  status: ActionStatus;
  onUpdate: (data: any) => void;
  colleague: any;
};

const ColleagueAction: FC<Props> = ({ status, colleague, onUpdate }) => {
  const { setOpened: setIsOpenSuccessModal, setStatusHistory } = useSuccessModalContext();
  const [colleagueExpanded, setColleagueExpanded] = useState<string | null>(null);
  const [colleagueReviews, updateColleagueReviews] = useState<any>([]);
  const [formsValid, validateReview] = useState<{ [key: string]: boolean }>({});
  const isButtonsDisabled = Object.values(formsValid).some((value) => !value);
  const showNotification = status !== ActionStatus.COMPLETED;

  const { css } = useStyle();
  const { t } = useTranslation();
  const tenant = useTenant();
  const reviews = useSelector(getAllReviews) || [];
  const { cyclesUuid, reviewsUuid } = useMemo(() => {
    return {
      cyclesUuid: [...new Set(colleague?.timeline?.map(({ cycleUuid }) => cycleUuid))] as string[],
      reviewsUuid: colleague?.reviews?.map(({ uuid }) => uuid),
    };
  }, [colleague.uuid]);

  const { loaded, loading } = useFetchColleagueReviews(colleagueExpanded, cyclesUuid, reviewsUuid);

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
          .filter(({ status }) => status === prevStatus)
          .filter(({ tlPointUuid }) => tlPointUuid === tlUuid)
          .map(({ number, type, properties }) => {
            if (type === ReviewType.MYR) {
              return { number };
            }
            return { number, properties };
          }),
      };
      onUpdate(data);
      setIsOpenSuccessModal(true);
      setStatusHistory({ prevStatus, status, type: reviewType });
    },
    [colleague, colleagueReviews],
  );

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
                <div>
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
                      {!loaded && loading ? (
                        <Spinner fullHeight />
                      ) : (
                        colleague.timeline.map((colleagueTimeline) => {
                          const { code, uuid } = colleagueTimeline;
                          const reviewGroupByStatus: [Status, any[]][] = [];
                          const colleagueReviews = colleague.reviews.filter(({ tlPointUuid }) => tlPointUuid === uuid);
                          const statusStatistics = Object.keys(colleagueTimeline.statistics || {}) as Status[];

                          for (const status of statusStatistics) {
                            reviewGroupByStatus.push([
                              status,
                              colleagueReviews
                                .filter((review) => status === review.status)
                                .sort(({ number }, { number: nextNumber }) => (number > nextNumber ? 1 : -1)),
                            ]);
                          }

                          return (
                            <div className={css({ margin: '24px 35px 24px 24px' })} key={uuid}>
                              {showNotification && (
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
                              )}
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
                                          timelinePoint={colleagueTimeline}
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
                        })
                      )}
                    </Panel>
                  </Section>
                </div>
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
