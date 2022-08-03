import React, { useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useTenant } from 'features/general/Permission';
import { useTranslation } from 'components/Translation';
import { BasicFormModal } from 'components/BasicFormModal';
import { ReviewType } from 'config/enum';
import { Page } from 'pages/general/types';
import { buildPath } from 'features/general/Routes';

const Reviews = () => {
  const tenant = useTenant();
  const { type } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const ReviewForm = useMemo(
    () => React.lazy(() => import(`features/${tenant}/Review`).then((module) => ({ default: module.Review }))),
    [],
  );

  const handleClose = () => {
    navigate(buildPath(Page.REVIEWS_VIEW));
  };

  useEffect(() => {
    const reviewType = type?.toUpperCase();
    if (reviewType !== ReviewType.EYR && reviewType !== ReviewType.MYR) {
      handleClose();
    }
  }, []);

  return (
    <BasicFormModal
      onClose={handleClose}
      title={
        type?.toUpperCase() === ReviewType.MYR
          ? t('mid_year_review', 'Mid-year review')
          : t('review_type_description_eyr', 'Year-end review')
      }
    >
      <ReviewForm reviewType={type?.toUpperCase()} onClose={handleClose} />
    </BasicFormModal>
  );
};

export default Reviews;
