import React, { FC, HTMLProps, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';

import { IconButton } from 'components/IconButton';
import { useTranslation } from 'components/Translation';
import { ReviewType, Status } from 'config/enum';
import { REVIEW_MODIFICATION_MODE, reviewModificationMode } from '../../utils';
import { useSelector } from 'react-redux';
import {
  countByTypeReviews,
  filterReviewsByTypeSelector,
  getReviewSchema,
  getTimelineByCodeSelector,
  isReviewsNumbersInStatus,
} from '@pma/store';
import { USER } from 'config/constants';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';

export type CreateModalProps = {
  withIcon?: boolean;
};

type Props = HTMLProps<HTMLInputElement> & CreateModalProps;

const CreateButton: FC<Props> = memo(({ withIcon = false }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const navigate = useNavigate();

  const schema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const { markup = { max: 0, min: 0 } } = schema;

  const reviewsMinNumbersInStatusApproved = useSelector(
    isReviewsNumbersInStatus(ReviewType.OBJECTIVE)(Status.APPROVED, markup.min),
  );
  const originObjectives = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE));
  const timelineObjective = useSelector(getTimelineByCodeSelector(ReviewType.OBJECTIVE, USER.current));
  const countReviews = useSelector(countByTypeReviews(ReviewType.OBJECTIVE)) || 0;
  const objectiveSchema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const modificationMode = reviewModificationMode(countReviews, objectiveSchema);

  const isAvailable =
    (reviewsMinNumbersInStatusApproved ||
      timelineObjective?.status === Status.DRAFT ||
      originObjectives?.length === 0) &&
    countReviews < markup.max &&
    modificationMode !== REVIEW_MODIFICATION_MODE.NONE;

  const handleBtnClick = () => navigate(buildPath(Page.CREATE_OBJECTIVES));

  if (!isAvailable) return null;

  return (
    <div className={css({ display: 'flex', marginBottom: '20px' })}>
      {withIcon ? (
        <IconButton
          customVariantRules={{ default: iconBtnStyle }}
          onPress={handleBtnClick}
          graphic='add'
          iconProps={{ invertColors: true }}
          iconStyles={iconStyle}
        >
          {t('create_objectives', 'Create objective')}
        </IconButton>
      ) : (
        <Button styles={[buttonStyle]} onPress={handleBtnClick}>
          {t('create_objectives', 'Create objective')}
        </Button>
      )}
    </div>
  );
});

const iconBtnStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  padding: '0 16px',
  display: 'flex',
  height: '40px',
  paddingLeft: '12px',
  paddingRight: '12px',
  borderRadius: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconStyle: Rule = {
  marginRight: '10px',
};

const buttonStyle: Rule = ({ theme }) => ({
  border: `${theme.border.width.b2} solid ${theme.colors.white}`,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
});

export default CreateButton;
