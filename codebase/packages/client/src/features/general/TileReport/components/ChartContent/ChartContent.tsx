import React, { FC, useCallback } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';
import { getPendingReportSelector, getDoneReportSelector } from '@pma/store';

import ColleagueProfile from '../../components/ColleagueProfile';
import { useTranslation, Trans } from 'components/Translation';

import { checkForPendingChartView, checkForDoneChartView, getReportTitles } from '../../utils';
import { ReportTags } from '../../config';
import { ReportPage } from 'config/enum';

export const PROFILES_WRAPPER = 'profiles-wrapper';
export const APPROVED_COLLEAGUES_WRAPPER = 'approved-colleagues_wrapper';
export const NOT_APPROVED_COLLEAGUES_WRAPPER = 'not-approved-colleagues_wrapper';

type Props = {
  isException: boolean;
  type: string;
};

export const ChartContent: FC<Props> = ({ isException, type }) => {
  if (!type) return null;
  const { css } = useStyle();
  const { t } = useTranslation();

  const review3List = type === ReportPage.REPORT_MID_YEAR_REVIEW || type === ReportPage.REPORT_END_YEAR_REVIEW;

  const notPending = useCallback(() => {
    if (review3List && type) {
      return (
        useSelector(getPendingReportSelector(ReportTags[type].split(' ')[0], ReportTags[type].split(' ')[0])) || []
      );
    }
    return [];
  }, [type, review3List]);

  const pending =
    useSelector(getPendingReportSelector(checkForPendingChartView(ReportTags[type]), ReportTags[type])) || [];

  const done = useSelector(getDoneReportSelector(checkForDoneChartView(ReportTags[type]), ReportTags[type])) || [];

  return (
    <div className={css({ width: '100%' })} data-test-id={PROFILES_WRAPPER}>
      {review3List && (
        <div>
          {!!notPending().length && (
            <span className={css(objectiveTypeStyle)}>
              <Trans>Not submitted</Trans>
            </span>
          )}
          {notPending().map((item, i) => (
            <div
              key={`${item.uuid}${i}`}
              className={css({ marginTop: '8px' })}
              data-test-id={NOT_APPROVED_COLLEAGUES_WRAPPER}
            >
              <ColleagueProfile colleague={item} />
            </div>
          ))}
        </div>
      )}

      {isException && (
        <div>
          {!!pending.length && (
            <span className={css(objectiveTypeStyle)}>
              <Trans>{getReportTitles(t, type)?.pending}</Trans>
            </span>
          )}
          {pending.map((item, i) => (
            <div
              key={`${item.uuid}${i}`}
              className={css({ marginTop: '8px' })}
              data-test-id={NOT_APPROVED_COLLEAGUES_WRAPPER}
            >
              <ColleagueProfile colleague={item} />
            </div>
          ))}
        </div>
      )}

      <div>
        {!!done.length && (
          <span className={css(objectiveTypeStyle, { marginTop: '24px' })}>
            <Trans>{getReportTitles(t, type)?.done}</Trans>
          </span>
        )}
        {done.map((item, i) => (
          <div
            key={`${item.uuid}${i}`}
            className={css({ marginTop: '8px' })}
            data-test-id={APPROVED_COLLEAGUES_WRAPPER}
          >
            <ColleagueProfile colleague={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

const objectiveTypeStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: `${theme.font.fixed.f18.fontSize}`,
  marginBottom: '22px',
  display: 'inline-block',
  marginTop: '22px',
});
