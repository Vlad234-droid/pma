import React, { FC, memo } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';
import { ReviewType } from 'config/enum';
import { Icon } from 'components/Icon';

export type Props = {
  review: any;
  selectReviewHandler: any;
};

const RowReview: FC<Props> = memo(({ review, selectReviewHandler }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { type, lastUpdatedTime } = review;

  return (
    <div className={css(listItemStyles)}>
      <div className={css({ margin: '24px 0' })}>
        <div className={css(titleStyles)}>{t(`review_type_description_${type?.toLowerCase()}`, ReviewType[type])}</div>
        <div className={css(subTitleStyles)}>
          <Icon graphic={'calender'} size={'16px'} iconStyles={{ verticalAlign: 'middle', marginRight: '4px' }} />
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
  marginBottom: '8px',
});

const listItemStyles: Rule = ({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  // @ts-ignore
  borderBottom: `2px solid ${theme.colors.lightGray}`,
});

const buttonsWrapperStyles = { display: 'flex', alignItems: 'center' };

export default RowReview;
