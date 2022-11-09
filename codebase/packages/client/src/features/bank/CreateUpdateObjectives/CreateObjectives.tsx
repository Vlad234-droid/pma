import React, { FC, memo } from 'react';

// TODO: should move to src/components
import { ModalComponent } from 'features/general/CreateUpdateObjectives/components/ModalComponent';
import { useTranslation } from 'components/Translation';
import { ObjectivesForm } from 'features/bank/CreateUpdateObjectives';

export type Props = {
  onClose: () => void;
  onSuccessClose: () => void;
  editNumber?: number;
  useSingleStep?: boolean;
};

const CreateUpdatePriorities: FC<Props> = memo(({ onClose, onSuccessClose, editNumber, useSingleStep = false }) => {
  const { t } = useTranslation();
  const title =
    useSingleStep && editNumber ? t('edit_priorities', 'Edit priorities') : t('create_priorities', 'Create priorities');

  return (
    <ModalComponent onClose={onClose} title={title}>
      <ObjectivesForm
        onClose={onClose}
        onSuccessClose={onSuccessClose}
        useSingleStep={useSingleStep}
        editNumber={editNumber}
      />
    </ModalComponent>
  );
});

export default CreateUpdatePriorities;
