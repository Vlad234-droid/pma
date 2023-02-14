import React, { FC } from 'react';
import { ColleagueSimple, PMCycleStatusEnum, ReviewStatusEnum, TotalCount } from '@pma/openapi';
import { calibrationReviewsMetaSelector, colleagueUUIDSelector } from '@pma/store';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { buildPath, buildPathWithParams } from 'features/general/Routes';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import ViewColleagueProfile from 'components/ViewColleagueProfile';
import InfinityScrollLoad from 'components/InfinityScrollLoad';
import { useTranslation } from 'components/Translation';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';
import { role, usePermission } from 'features/general/Permission';
import { View, Ratings, RatingsType } from '../../types';

type Props = {
  period?: string;
  data: RatingsType;
  activeList: View;
  statistics?: { [key: string]: TotalCount };
  styles?: Rule | Styles | {};
  onUpload?: (rating: string, _start?: number, _limit?: number) => void;
  sessionUuid?: string;
};

const ColleaguesRatings: FC<Props> = ({
  period,
  data,
  activeList,
  styles = {},
  onUpload,
  statistics,
  sessionUuid = '',
}) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const isPerform = usePermission([role.TALENT_ADMIN]);
  const navigate = useNavigate();
  const { loading } = useSelector(calibrationReviewsMetaSelector);
  const userUuid = useSelector(colleagueUUIDSelector);

  const { pathname } = useLocation();

  const handleView = <T extends string, U extends 'new'>(rating: T, userUuid: T, uuid: T | U, cycleUuid: T) => {
    if (sessionUuid && rating === Ratings.Unsubmitted.toLowerCase()) {
      navigate(
        buildPath(
          paramsReplacer(Page.CREATE_CALIBRATION_SESSION_RATING, {
            ':userUuid': userUuid,
            ':sessionUuid': sessionUuid,
          }),
        ),
        {
          state: {
            backPath: pathname,
            activeList,
            period,
            currentCycle: cycleUuid,
          },
        },
      );
      return;
    }
    navigate(
      buildPathWithParams(
        buildPath(paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':userUuid': userUuid, ':uuid': uuid })),
        sessionUuid ? { sessionMode: 'true' } : {},
      ),
      {
        state: {
          backPath: pathname,
          activeList,
          period,
          currentCycle: cycleUuid,
        },
      },
    );
  };

  return (
    <div className={css(styles)}>
      {Object.entries(data).map(([title, data]) => {
        if (title === Ratings.Unsubmitted.toLowerCase() && activeList === View.TABLE) return null;

        const ratingStatistics = statistics?.[title.toUpperCase()];

        // @ts-ignore
        const isExpandable = ratingStatistics && ratingStatistics?.count >= 1;
        const hasMore = !!(statistics && ratingStatistics?.count !== data?.length);

        return (
          <Accordion
            id={`colleague-review-accordion-${title}`}
            key={`${title}`}
            customStyle={{
              marginTop: '0px',
              ...(activeList === View.TABLE && { border: 'none', minWidth: '380px !important' }),
            }}
          >
            <BaseAccordion id={`colleague-review-accordion-${title}`}>
              {() => (
                <Section defaultExpanded={activeList === View.TABLE}>
                  <div className={css(scrollContainer)}>
                    <div className={css(wrapperStyles)}>
                      <span className={css(titleStyles)}>
                        {t(title)}: {ratingStatistics?.count}
                      </span>
                      {isExpandable && activeList === View.LIST && (
                        <div className={css(expandButtonStyles)}>
                          <ExpandButton onClick={(expanded) => onUpload && expanded && onUpload(title)} />
                        </div>
                      )}
                    </div>
                    <Panel defaultHeight={1084}>
                      <InfinityScrollLoad
                        loadOnScroll={false}
                        loadMore={(_limit, _start) => {
                          onUpload && onUpload(title, _start, _limit);
                        }}
                        loading={loading}
                        limit={10}
                        hasMore={hasMore}
                        render={() => (
                          <>
                            <div key={title} className={css({ marginBottom: '24px', width: '100%' })}>
                              {!!data?.length &&
                                data.map((item, i) => {
                                  const lineManagerUuid = item?.colleague?.lineManager?.uuid;
                                  const colleagueUuid = item?.colleague?.uuid as string;
                                  const reviewUuid = item?.review?.uuid as string;
                                  const cycleUuid = item?.pmCycle?.uuid as string;
                                  const pmCycleStatus = item?.pmCycle?.status;

                                  const isDisabledByCycle =
                                    pmCycleStatus &&
                                    title === Ratings.Unsubmitted.toLowerCase() &&
                                    (pmCycleStatus === PMCycleStatusEnum.Finished ||
                                      pmCycleStatus === PMCycleStatusEnum.Completed);

                                  const isDisabledByReview =
                                    title === Ratings.Unsubmitted.toLowerCase() &&
                                    isPerform &&
                                    lineManagerUuid !== userUuid &&
                                    (item?.review?.status === ReviewStatusEnum.Draft || true);

                                  const discussWithPP = JSON.parse(
                                    item?.review?.properties?.discuss_with_pp ?? 'false',
                                  );

                                  return (
                                    <div key={`${title}${i}`} className={css(profileStyles)}>
                                      <ViewColleagueProfile
                                        withIcon={discussWithPP}
                                        title={'view'}
                                        isCollapsed={activeList !== View.TABLE}
                                        colleague={item.colleague as ColleagueSimple}
                                        viewCustomStyles={{
                                          pointerEvents: isDisabledByCycle || isDisabledByReview ? 'none' : 'all',
                                          opacity: isDisabledByCycle || isDisabledByReview ? '0.4' : '1',
                                        }}
                                        onClick={() => {
                                          handleView(title, colleagueUuid, reviewUuid, cycleUuid);
                                        }}
                                        properties={activeList === View.LIST ? item?.review?.properties : {}}
                                      />
                                    </div>
                                  );
                                })}
                            </div>
                          </>
                        )}
                      />
                    </Panel>
                  </div>
                </Section>
              )}
            </BaseAccordion>
          </Accordion>
        );
      })}
    </div>
  );
};
const wrapperStyles: Rule = {
  padding: '24px 14px 24px 0px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const scrollContainer: Rule = {
  '&:not(:first-child)': {
    marginTop: '20px',
  },
} as Styles;

const profileStyles: Rule = {
  '&:not(:first-child)': {
    marginTop: '8px',
  },
} as Styles;

const expandButtonStyles: Rule = { paddingLeft: '12px' };

const titleStyles: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: `${theme.font.fixed.f18.fontSize}`,
  display: 'inline-block',
  color: theme.colors.tescoBlue,
});

export default ColleaguesRatings;
