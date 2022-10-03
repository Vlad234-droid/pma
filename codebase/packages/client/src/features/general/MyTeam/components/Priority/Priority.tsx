import React, { FC } from 'react';
import { Colors, Rule, Theme, useStyle } from '@pma/dex-wrapper';

import { TFunction, useTranslation } from 'components/Translation';

import { ReviewType, Status } from 'config/enum';
import { Graphics, Icon } from 'components/Icon';
import { Employee } from 'config/types';

const getContent = (theme: Theme, t: TFunction, status: Status): [Graphics, string, Colors] => {
  switch (status) {
    case Status.COMPLETED:
      return ['roundTick', t('completed', 'Completed'), 'green'];
    case Status.APPROVED:
      return ['roundTick', t('agreed', 'Agreed'), 'green'];
    case Status.WAITING_FOR_APPROVAL:
      return ['roundClock', t('waiting_for_agreed', 'Waiting agreement'), 'pending'];
    case Status.WAITING_FOR_COMPLETION:
      return ['roundClock', t('waiting_for_completion', 'Waiting for completion'), 'pending'];
    case Status.DECLINED:
      return ['roundAlert', t('request_to_amend', 'Request to amend'), 'base'];
    case Status.OVERDUE:
      return ['roundAlert', t('declined', 'Overdue'), 'tescoRed'];
    case Status.DRAFT:
    default:
      return ['roundPencil', t('saved_as_draft', 'Saved as draft'), 'grayscale'];
  }
};

type Props = {
  employee: Employee;
};

const Priority: FC<Props> = ({ employee }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const { timeline: timelines, reviews } = employee;

  const startedQuarterTimeline = timelines
    .filter(({ status, reviewType }) => status === Status.STARTED && reviewType === ReviewType.QUARTER)
    .pop();

  const relatedReviews = reviews
    .filter(({ tlPointUuid }) => tlPointUuid === startedQuarterTimeline?.uuid)
    .sort((a, b) => a.number - b.number);

  return (
    <div data-test-id='priorities'>
      {relatedReviews.length ? (
        relatedReviews.map((review) => {
          const [graphic, label, color] = getContent(theme, t, review.status);
          const date = [Status.WAITING_FOR_APPROVAL, Status.WAITING_FOR_COMPLETION].includes(review.status)
            ? t('submitted_date', { date: new Date(startedQuarterTimeline?.lastUpdatedTime || '') })
            : t('full_date', { date: new Date(startedQuarterTimeline?.lastUpdatedTime || '') });

          return (
            <div key={review.uuid} className={css(wrapperStyles)}>
              <div className={css(lineStyles)}>
                <div>{t('objective_number', `Priority ${review.number}`, { ns: 'bank', number: review.number })}</div>
                <div className={css(stateStyles)}>
                  <span>
                    {label} - {date}
                  </span>
                  <span className={css({ padding: '5px' })} />
                  <span>
                    <Icon graphic={graphic} fill={color} title={label} />
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className={css(wrapperStyles)}>No priorities created</div>
      )}
    </div>
  );
};

const lineStyles: Rule = { justifyContent: 'space-between', display: 'flex', alignItems: 'center' };
const stateStyles: Rule = { display: 'flex', alignItems: 'center' };

const wrapperStyles: Rule = ({ theme }) => ({
  background: `${theme.colors.backgroundDark}`,
  padding: '24px',
  borderRadius: '10px',
  marginTop: '10px',
});

export default Priority;
