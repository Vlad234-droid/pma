import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: should move to src/components
import { ModalComponent } from 'features/general/CreateUpdateObjectives/components/ModalComponent';
import { useTranslation } from 'components/Translation';
import { ObjectivesForm } from 'features/bank/CreateUpdateObjectives';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';

const CreateUpdatePriorities: FC = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClose = () => navigate(buildPath(Page.REVIEWS_VIEW));

  return (
    <ModalComponent onClose={handleClose} title={t('create_priorities', 'Create priorities')}>
      <ObjectivesForm onClose={handleClose} />
    </ModalComponent>
  );
});

export default CreateUpdatePriorities;
