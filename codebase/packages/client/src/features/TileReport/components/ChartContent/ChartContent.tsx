import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';
import { getPendingReportSelector, getDoneReportSelector } from '@pma/store';

import ColleagueProfile from '../../components/ColleagueProfile';
import { useTranslation, Trans } from 'components/Translation';

import { checkForPendingChartView, checkForDoneChartView, getReportTitles } from '../../utils';
import { ReportTags } from '../../config';

export const PROFILES_WRAPPER = 'profiles-wrapper';
export const APPROVED_COLLEAGUES_WRAPPER = 'approved-colleagues_wrapper';
export const NOT_APPROVED_COLLEAGUES_WRAPPER = 'not-approved-colleagues_wrapper';

type Props = {
  checkBusinessType: boolean;
  type: string;
};

export const ChartContent: FC<Props> = ({ checkBusinessType, type }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const pending =
    useSelector(getPendingReportSelector(checkForPendingChartView(ReportTags[type]), ReportTags[type])) || [];

  const done = useSelector(getDoneReportSelector(checkForDoneChartView(ReportTags[type]), ReportTags[type])) || [];

  return (
    <div className={css({ width: '100%' })} data-test-id={PROFILES_WRAPPER}>
      {checkBusinessType && (
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
});
