import React, { FC } from 'react';
import { calibrationReviewsMetaSelector } from '@pma/store';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { ColleagueSimple, ReviewStatusEnum, TotalCount } from '@pma/openapi';
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
  data: RatingsType;
  activeList: View;
  statistics?: { [key: string]: TotalCount };
  styles?: Rule | Styles | {};
  onUpload?: (rating: string, _start?: number, _limit?: number) => void;
  sessionUuid?: string;
};

const ColleaguesRatings: FC<Props> = ({ data, activeList, styles = {}, onUpload, statistics, sessionUuid = '' }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const isPerform = usePermission([role.TALENT_ADMIN]);
  const navigate = useNavigate();
  const { loading } = useSelector(calibrationReviewsMetaSelector);
  const { pathname } = useLocation();

  const handleView = (userUuid: string, uuid: string) =>
    navigate(
      buildPathWithParams(
        buildPath(paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':userUuid': userUuid, ':uuid': uuid })),
        sessionUuid ? { sessionMode: 'true' } : {},
      ),
      {
        state: {
          backPath: pathname,
          activeList,
        },
      },
    );

  return (
    <div className={css(styles)}>
      {Object.entries(data).map(([title, data]) => {
        //@ts-ignore
        const sortedColleague = data?.sort((a, b) =>
          a?.colleague?.firstName?.localeCompare(b?.colleague?.firstName as string, 'es', { sensitivity: 'base' }),
        );

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
                    <Panel>
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
                              {!!sortedColleague?.length &&
                                sortedColleague.map((item, i) => {
                                  const isDisabled =
                                    isPerform &&
                                    title === Ratings.Unsubmitted.toLowerCase() &&
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
                                          pointerEvents: isDisabled ? 'none' : 'all',
                                          opacity: isDisabled ? '0.4' : '1',
                                        }}
                                        onClick={() => {
                                          handleView(item?.colleague?.uuid as string, item?.review?.uuid as string);
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
