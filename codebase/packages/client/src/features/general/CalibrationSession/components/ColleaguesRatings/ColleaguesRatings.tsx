import React, { FC } from 'react';
import { calibrationReviewsMetaSelector } from '@pma/store';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { ColleagueSimple, RatingStatisticRatingEnum } from '@pma/openapi';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { buildPath } from 'features/general/Routes';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import ViewColleagueProfile from 'components/ViewColleagueProfile';
import InfinityScrollLoad from 'components/InfinityScrollLoad';
import { useTranslation } from 'components/Translation';
import { ActiveList, RatingsType, statisticsType } from '../../types';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';

type Props = {
  data: RatingsType;
  activeList: ActiveList;
  statistics?: statisticsType;
  styles?: Rule | Styles | {};
  onUpload?: (rating: string, _start?: number, _limit?: number) => void;
};

const ColleaguesRatings: FC<Props> = ({ data, activeList, styles = {}, onUpload, statistics }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const navigate = useNavigate();
  const { loading } = useSelector(calibrationReviewsMetaSelector);
  const { pathname } = useLocation();

  const handleView = (userUuid: string, uuid: string) =>
    navigate(buildPath(paramsReplacer(Page.CREATE_CALIBRATION_RATING, { ':userUuid': userUuid, ':uuid': uuid })), {
      state: {
        backPath: pathname,
      },
    });

  return (
    <div className={css(styles)}>
      {Object.entries(data).map(([title, data], i) => {
        if (title === RatingStatisticRatingEnum.Unsubmitted.toLowerCase() && activeList === ActiveList.TABLE)
          return null;

        const ratingStatistics = statistics && statistics?.[i];
        const rating = ratingStatistics?.rating as string;
        const isExpandable = ratingStatistics && ratingStatistics?.count >= 1;
        const hasMore = !!(
          statistics && statistics.find(({ rating }) => rating.toLowerCase() === title)?.count !== data.length
        );

        return (
          <Accordion
            id={`colleague-review-accordion-${title}`}
            key={`${title}`}
            customStyle={{
              marginTop: '0px',
              ...(activeList === ActiveList.TABLE && { border: 'none', minWidth: '350px !important' }),
            }}
          >
            <BaseAccordion id={`colleague-review-accordion-${title}`}>
              {() => (
                <Section defaultExpanded={activeList === ActiveList.TABLE}>
                  <div className={css(scrollContainer)}>
                    <div className={css(wrapperStyles)}>
                      <span className={css(titleStyles)}>
                        {t(rating.toLowerCase())}: {ratingStatistics?.count}
                      </span>
                      {isExpandable && activeList === ActiveList.LIST && (
                        <div className={css(expandButtonStyles)}>
                          <ExpandButton
                            onClick={(expanded) => !data?.length && onUpload && expanded && onUpload(title)}
                          />
                        </div>
                      )}
                    </div>
                    <Panel>
                      <InfinityScrollLoad
                        loadOnScroll={false}
                        loadMore={(_limit, _start) => {
                          onUpload && onUpload(rating, _start, _limit);
                        }}
                        loading={loading}
                        limit={10}
                        hasMore={hasMore}
                        render={() => (
                          <>
                            <div key={title} className={css({ marginBottom: '24px', width: '100%' })}>
                              {!!data?.length &&
                                data.map((item, i) => {
                                  return (
                                    <div key={`${title}${i}`} className={css(profileStyles)}>
                                      <ViewColleagueProfile
                                        title={'view'}
                                        colleague={item.colleague as ColleagueSimple}
                                        onClick={() =>
                                          handleView(item?.colleague?.uuid as string, item?.review?.uuid as string)
                                        }
                                        properties={activeList === ActiveList.LIST ? item?.review?.properties : {}}
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
