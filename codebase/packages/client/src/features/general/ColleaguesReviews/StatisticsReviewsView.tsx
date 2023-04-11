import React, { FC } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { TFunction, Trans, useTranslation } from 'components/Translation';
import { IconButton } from 'components/IconButton';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';

import useDownloadExelFile from 'hooks/useDownloadExelFile';
import { isSingular, filterToRequest, formatDateStringFromISO, getFinancialYear } from 'utils';
import { List } from './config';
import { ReportPage, Status } from 'config/enum';
import { ColleaguesPanel } from './ColleaguesPanel';

const switchTitles = (titleToSwitch, t: TFunction) => {
  const titles = {
    'not-submitted': t('total_reviews_not_submitted', 'Total reviews not submitted'),
    approved: t('total_reviews_submitted_&_approved_by_manager', 'Total reviews submitted & approved by manager'),
    submitted: t(
      'total_reviews_submitted_approved_and_not_approved',
      'Total reviews submitted (approved and not approved)',
    ),
  };
  return titles[titleToSwitch];
};

const createTitle = (baseTitle: string, type: ReportPage, total: number, t: TFunction) => {
  return `${
    type === ReportPage.REPORT_MID_YEAR_REVIEW ||
    type === ReportPage.REPORT_END_YEAR_REVIEW ||
    type === ReportPage.REPORT_ANNIVERSARY_REVIEWS
      ? switchTitles(baseTitle, t)
      : t(baseTitle)
  }
      : ${total} ${isSingular(total) ? t('colleague', 'Colleague') : t('colleagues', 'Colleagues')}`;
};

const REPORT_URL = 'reports/linked-objective-report/formats/excel';

type Props = {
  type: ReportPage;
  year: any;
  listWithEmptyLabels: List;
  reviews: any;
  isWLPage: boolean;
  toggleFullView: () => void;
  isFullView: boolean;
  filterValues: Record<string, Record<string, boolean>>;
  filters: ReturnType<typeof filterToRequest>;
};

export const StatisticsReviewsView: FC<Props> = ({
  type,
  year,
  listWithEmptyLabels,
  reviews,
  isWLPage,
  toggleFullView,
  isFullView,
  filterValues,
  filters,
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const { download: downloadReport, loading: downloadReportLoading } = useDownloadExelFile({
    resource: {
      url: REPORT_URL,
      params: {
        year: year || getFinancialYear(),
        status: Status.APPROVED.toLocaleLowerCase(),
        ...filters,
      },
    },
    fileName: `Objectives Report (${formatDateStringFromISO(new Date().toISOString(), 'dd LLL yyyy HH:mm:ms')})`,
    ext: 'xlsx',
    errorMassage: {
      title: t('statistics_not_found', 'Statistics not found'),
      description: t('try_to_select_another_year', 'Try to select another year.'),
    },
  });

  return (
    <div className={css({ width: '100%' })}>
      {type &&
        Object.entries(listWithEmptyLabels).map(([title, data]) => {
          const total = reviews?.statistics?.[title]?.count ?? 0;
          const hasMore = (data as any)?.length !== reviews?.statistics?.[title]?.count;

          return (
            <Accordion
              id={`colleague-review-accordion-${title}`}
              key={`${title}`}
              customStyle={{ marginTop: '0px', ...(isWLPage && { border: 'none !important' }) }}
            >
              <BaseAccordion id={`colleague-review-accordion-${title}`}>
                {() => (
                  <Section defaultExpanded={isWLPage}>
                    <div className={css(scrollContainer)}>
                      <div className={css(wrapperStyles({ isWLPage }))}>
                        <span className={css(titleStyles)}>{createTitle(title, type, total, t)}</span>
                        {!!(data as any).length && !isWLPage && (
                          <div className={css(expandButtonStyles)}>
                            <ExpandButton />
                          </div>
                        )}
                        {isWLPage && (
                          <div>
                            <IconButton
                              isDisabled={downloadReportLoading}
                              onPress={downloadReport}
                              graphic='download'
                              customVariantRules={{ default: iconButtonStyles, disabled: disabledIconStyles }}
                              iconStyles={iconStyles}
                            >
                              <Trans i18nKey='download'>Download</Trans>
                            </IconButton>

                            <IconButton
                              onPress={toggleFullView}
                              graphic='full'
                              customVariantRules={{ default: iconButtonStyles }}
                              iconStyles={iconStyles}
                              data-test-id={'full-button'}
                            >
                              {!isFullView ? (
                                <Trans i18nKey='full_view'>Full view</Trans>
                              ) : (
                                <Trans i18nKey='show_less'>Show less</Trans>
                              )}
                            </IconButton>
                          </div>
                        )}
                      </div>
                      <ColleaguesPanel
                        filterValues={filterValues}
                        type={type}
                        title={title}
                        filters={filters}
                        hasMore={hasMore}
                        data={data}
                      />
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

const wrapperStyles: CreateRule<{ isWLPage: boolean }> = ({ isWLPage }) => ({
  padding: isWLPage ? '24px 14px 2px 0px' : '24px 14px 24px 0px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const scrollContainer: Rule = {
  '&:not(:first-child)': {
    marginTop: '20px',
  },
} as Styles;

const iconStyles: Rule = ({ theme }) => ({
  marginRight: theme.spacing.s2_5,
});

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: theme.spacing.s2_5,
  color: theme.colors.tescoBlue,
  fontWeight: 700,
});

const disabledIconStyles: Rule = ({ theme }) => ({
  padding: theme.spacing.s2_5,
  cursor: 'default',
});

const expandButtonStyles: Rule = { paddingLeft: '12px' };

const titleStyles: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: `${theme.font.fixed.f18.fontSize}`,
  display: 'inline-block',
  color: theme.colors.tescoBlue,
});
