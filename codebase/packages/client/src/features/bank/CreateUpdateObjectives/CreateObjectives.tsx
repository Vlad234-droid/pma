import React, { FC, memo } from 'react';

// TODO: should move to src/components
import { ModalComponent } from 'features/general/CreateUpdateObjectives/components/ModalComponent';
import { useTranslation } from 'components/Translation';
import { ObjectivesForm } from 'features/bank/CreateUpdateObjectives';

export type Props = {
  onClose: () => void;
  editNumber?: number;
  useSingleStep?: boolean;
};

const CreateUpdatePriorities: FC<Props> = memo(({ onClose, editNumber, useSingleStep = false }) => {
  const { t } = useTranslation();

  return (
    <ModalComponent onClose={onClose} title={t('create_priorities', 'Create priorities')}>
      <ObjectivesForm onClose={onClose} useSingleStep={useSingleStep} editNumber={editNumber} />
    </ModalComponent>
  );
});

export default CreateUpdatePriorities;
