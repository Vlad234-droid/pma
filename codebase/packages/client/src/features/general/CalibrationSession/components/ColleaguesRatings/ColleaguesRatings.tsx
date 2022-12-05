import React, { FC, useEffect } from 'react';
import { ColleagueSimple } from '@pma/openapi';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { buildPath } from 'features/general/Routes';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import ViewColleagueProfile from 'components/ViewColleagueProfile';
import InfinityScrollLoad from 'components/InfinityScrollLoad';
import { useTranslation } from 'components/Translation';
import { ActiveList, RatingsType } from '../../types';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';
import { statisticsType } from '../../hook/useCalibrationStatistics';

type Props = {
  data: RatingsType | Omit<RatingsType, 'unsubmitted'>;
  activeList: ActiveList;
  statistics?: statisticsType;
  styles?: Rule | Styles | {};
  onUpload?: (rating: string) => void;
};

const ColleaguesRatings: FC<Props> = ({ data, activeList, styles = {}, onUpload, statistics }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loading = false;

  useEffect(() => {
    onUpload &&
      activeList === ActiveList.TABLE &&
      Object.keys(data).forEach((rating) => {
        onUpload(rating);
      });
  }, []);

  const handleView = (uuid: string) =>
    navigate(buildPath(paramsReplacer(`${Page.USER_REVIEWS}`, { ':uuid': uuid })), {
      state: {
        backPath: `${pathname}`,
      },
    });

  return (
    <div className={css(styles)}>
      {Object.entries(data).map(([title, data], i) => {
        // const total = reviews?.statistics?.[title]?.count ?? 0;
        // const hasMore = (data as any)?.length !== reviews?.statistics?.[title]?.count;
        const ratingStatistics = statistics && statistics?.[i];
        const rating = ratingStatistics?.rating as string;
        const hasMore = !!(ratingStatistics && ratingStatistics?.count >= 1);

        return (
          <Accordion
            id={`colleague-review-accordion-${title}`}
            key={`${title}`}
            customStyle={{ marginTop: '0px', ...(activeList === ActiveList.TABLE && { border: 'none' }) }}
          >
            <BaseAccordion id={`colleague-review-accordion-${title}`}>
              {() => (
                <Section defaultExpanded={activeList === ActiveList.TABLE}>
                  <div className={css(scrollContainer)}>
                    <div className={css(wrapperStyles)}>
                      <span className={css(titleStyles)}>
                        {t(rating.toLowerCase())}: {ratingStatistics?.count}
                      </span>
                      {hasMore && activeList === ActiveList.LIST && (
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
                          switch (activeList) {
                            case ActiveList.LIST: {
                              // dispatch();
                              break;
                            }
                            case ActiveList.TABLE: {
                              // dispatch();
                              break;
                            }
                          }
                        }}
                        loading={loading}
                        limit={15}
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
                                        //TODO: replace to review uuid
                                        onClick={() => handleView(item?.colleague?.uuid as string)}
                                        properties={item?.review?.properties}
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
