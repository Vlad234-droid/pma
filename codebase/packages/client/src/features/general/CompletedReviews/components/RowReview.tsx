import React, { FC, memo } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';
import { ReviewType } from 'config/enum';
import { Icon } from 'components/Icon';

export type Props = {
  review: any;
  selectReviewHandler: any;
};

export const RowReview: FC<Props> = memo(({ review, selectReviewHandler }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { type, number, lastUpdatedTime } = review;

  return (
    <div className={css(listItemStyles)}>
      <div className={css({ margin: '24px 0' })}>
        <div className={css(titleStyles)}>
          {t(`review_type_description_${type?.toLowerCase()}`, ReviewType[type], {
            num: number,
          })}
        </div>
        <div className={css(subTitleStyles)}>
          <Icon
            graphic={'calender'}
            size={'16px'}
            iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }}
          />
          {t('full_date', `${lastUpdatedTime}`, { date: new Date(lastUpdatedTime) })}
        </div>
      </div>
      <div className={css(buttonsWrapperStyles)}>
        <button data-uuid={review.uuid} className={css(buttonStyles)} onClick={selectReviewHandler}>
          <Icon data-uuid={review.uuid} graphic={'arrowRight'} />
        </button>
      </div>
    </div>
  );
});

const buttonStyles = {
  backgroundColor: 'inherit',
  border: 'none',
  cursor: 'pointer',
};

const subTitleStyles: Rule = ({ theme }) => ({
  display: 'flex',
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
});

const titleStyles: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
  color: theme.colors.tescoBlue,
});

const listItemStyles: Rule = ({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  // @ts-ignore
  borderBottom: `2px solid ${theme.colors.lightGray}`,
});

const buttonsWrapperStyles = { display: 'flex', alignItems: 'center' };
