import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import ViewColleagueProfile from 'components/ViewColleagueProfile';
import InfinityScrollLoad from 'components/InfinityScrollLoad';
import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';
import { ActiveList } from '../../utils/types';
import { Page } from 'pages';
import { paramsReplacer } from 'utils';

type Props = {
  data: any;
  activeList: ActiveList;
  styles?: Rule | Styles | {};
  onUpload?: (type: string) => void;
};

const ColleaguesReviews: FC<Props> = ({ data, activeList, styles = {}, onUpload }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loading = false;

  useEffect(() => {
    onUpload &&
      activeList === ActiveList.TABLE &&
      Object.keys(data).forEach((type) => {
        onUpload(type);
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
      {Object.entries(data).map(([title, data]) => {
        // const total = reviews?.statistics?.[title]?.count ?? 0;
        const total = (data as []).length;
        // const hasMore = (data as any)?.length !== reviews?.statistics?.[title]?.count;
        const hasMore = true;

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
                        {t(title)}: {total}
                      </span>
                      {!!(data as any).length && activeList === ActiveList.LIST && (
                        <div className={css(expandButtonStyles)}>
                          <ExpandButton onClick={(expanded) => onUpload && expanded && onUpload(title)} />
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
                            <div key={`${title}`} className={css({ marginBottom: '24px', width: '100%' })}>
                              {!!(data as any)?.length &&
                                (data as any).map((item, i) => (
                                  //@ts-ignore
                                  <div key={`${title}${i}`} className={css(profileStyles)}>
                                    <ViewColleagueProfile
                                      title={'view'}
                                      colleague={item}
                                      onClick={() => handleView(item.uuid)}
                                    />
                                  </div>
                                ))}
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

export default ColleaguesReviews;
