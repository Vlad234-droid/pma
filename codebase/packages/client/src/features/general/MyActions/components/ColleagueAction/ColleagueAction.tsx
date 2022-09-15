import React, { FC, useCallback, useEffect, useState } from 'react';
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
import { ReviewType, Status } from 'config/enum';
import { Review, Timeline } from 'config/types';
import { Buttons } from '../Buttons';
import { ColleagueReview } from '../ColleagueReviews';
import { Tenant } from 'utils';

type Props = {
  status: Status;
  onUpdate: (reviewType: string, data: any) => void;
  colleague: any;
};

const ColleagueAction: FC<Props> = ({ status, colleague, onUpdate }) => {
  const [colleagueExpanded, setColleagueExpanded] = useState<string>();
  const [colleagueReviews, updateColleagueReviews] = useState<any>([]);
  const [formsValid, validateReview] = useState<{ [key: string]: boolean }>({});
  const isButtonsDisabled = Object.values(formsValid).some((value) => !value);

  const dispatch = useDispatch();
  const { css } = useStyle();
  const { t } = useTranslation();
  const tenant = useTenant();

  const { loaded: reviewLoaded = false } = useSelector(reviewsMetaSelector);
  const allColleagueReviews = useSelector(getAllReviews) || [];
  const allColleagueReviewsSchema = useSelector(getAllReviewSchemas) || [];

  // TODO: strange part of code, should refactoring
  const groupColleagueReviews: { [key: string]: { timeline: Timeline; reviews: Review[] } } = {};
  for (const timeline of colleague.timeline) {
    groupColleagueReviews[timeline.code] = {
      timeline,
      reviews: colleagueReviews.filter((review) => review.tlPointUuid === timeline.uuid),
    };
  }

  useEffect(() => {
    const reviewsUuid = colleague?.reviews?.map(({ uuid }) => uuid) || [];
    const colleaguesReviews = allColleagueReviews.filter(
      (review) => reviewsUuid.includes(review.uuid) && review.status === status,
    );
    updateColleagueReviews(colleaguesReviews);
  }, [reviewLoaded, status]);

  const handleUpdateReview = useCallback(
    (status: Status) => (code: string) => (reason: string) => {
      const { reviewType, uuid } = colleague?.timeline?.find((timeline) => timeline.code === code);

      const data = {
        ...(reason ? { reason } : {}),
        status,
        code,
        colleagueUuid: colleague.uuid,
        reviews: colleagueReviews
          .filter(({ status, tlPointUuid }) => status === Status.WAITING_FOR_APPROVAL && tlPointUuid === uuid)
          .map(({ number, type, properties }) => {
            if (type !== ReviewType.MYR) {
              return { number, properties };
            }
            return { number };
          }),
      };
      onUpdate(reviewType, data);
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
                      <div className={css({ padding: '24px 35px 24px 24px' })} key={reviewType}>
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
                        {groupColleagueReviews[reviewType]?.reviews?.map((review) => (
                          <ColleagueReview
                            key={review.uuid}
                            colleagueUuid={colleague.uuid}
                            review={review}
                            timeline={groupColleagueReviews[reviewType].timeline}
                            schema={allColleagueReviewsSchema[reviewType] || []}
                            validateReview={handleValidateReview}
                            updateColleagueReviews={updateColleagueReviews}
                          />
                        ))}
                        {status === Status.WAITING_FOR_APPROVAL && (
                          <Buttons
                            reviewType={reviewType}
                            onUpdate={handleUpdateReview}
                            isDisabled={isButtonsDisabled}
                          />
                        )}
                      </div>
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
