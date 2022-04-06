import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

import ColleagueProfile from '../../components/ColleagueProfile';
import { useSelector } from 'react-redux';
import { getTableChartData, getAnniversaryData } from '@pma/store';
import { ReportTags } from '../../config';
import { ReportPage } from 'config/enum';
import { useTranslation } from 'components/Translation';

export const PROFILES_WRAPPER = 'profiles-wrapper';
export const NOT_APPROVED_COLLEAGUES_WRAPPER = 'not-approved-colleagues_wrapper';

export const TableContent: FC<{ type: string }> = ({ type }) => {
  if (!type) return null;
  const { css } = useStyle();
  const { t } = useTranslation();

  const isAnniversarty = type === ReportPage.REPORT_ANNIVERSARY_REVIEWS;

  const tableChartData = !isAnniversarty
    ? useSelector(getTableChartData(ReportTags[type])) || {}
    : useSelector(getAnniversaryData) || {};

  return (
    <div className={css({ width: '100%' })} data-test-id={PROFILES_WRAPPER}>
      {Object.entries(tableChartData).map(
        ([title, data]) =>
          !!(data as []).length && (
            <div key={title} className={css({ marginBottom: '24px' })}>
              <span className={css(objectiveTypeStyle)}>{t(title)}</span>
              {(data as []).map((item, i) => (
                <div
                  //@ts-ignore
                  key={`${item.uuid}${i}`}
                  className={css({ marginTop: '8px' })}
                  data-test-id={NOT_APPROVED_COLLEAGUES_WRAPPER}
                >
                  <ColleagueProfile colleague={item} />
                </div>
              ))}
            </div>
          ),
      )}
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
