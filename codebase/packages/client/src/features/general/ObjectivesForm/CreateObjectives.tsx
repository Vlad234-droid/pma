import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { countByTypeReviews, getReviewSchema } from '@pma/store';
import { useTranslation } from 'components/Translation';
import { ObjectiveForm, ObjectivesForm } from 'features/general/ObjectivesForm';
import { ModalComponent } from './components/ModalComponent';
import { ReviewType } from 'config/enum';
import { REVIEW_MODIFICATION_MODE, reviewModificationMode } from './utils';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';

const CreateButton: FC = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const countReviews = useSelector(countByTypeReviews(ReviewType.OBJECTIVE)) || 0;
  const objectiveSchema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const modificationMode = reviewModificationMode(countReviews, objectiveSchema);
  const useSingleStep = modificationMode === REVIEW_MODIFICATION_MODE.SINGLE;

  const handleClose = () => navigate(buildPath(Page.OBJECTIVES_VIEW));

  return (
    <ModalComponent onClose={handleClose} title={t('create_objectives', 'Create objectives')}>
      {useSingleStep ? <ObjectiveForm onClose={handleClose} /> : <ObjectivesForm onClose={handleClose} />}
    </ModalComponent>
  );
});

export default CreateButton;
