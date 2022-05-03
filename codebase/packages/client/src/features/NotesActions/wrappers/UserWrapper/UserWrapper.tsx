import React, { FC } from 'react';
import { AddNoteModal } from '../../components';
import WrapperModal from 'features/Modal/components/WrapperModal';
import { ModalStatuses } from '../../NotesActions';
import { useTranslation } from 'components/Translation';
import { UseFormReturn } from 'react-hook-form';
import { FoldersWithNotesTypes } from '../../type';

const UserWrapper: FC<{
  cancelModal: () => void;
  status: ModalStatuses;
  methods: UseFormReturn;
  submitForm: () => void;
  createFolder: boolean;
  foldersWithNotes: Array<FoldersWithNotesTypes> | [];
}> = ({ cancelModal, status, methods, submitForm, createFolder, foldersWithNotes }) => {
  const { t } = useTranslation();
  return (
    <WrapperModal
      onClose={cancelModal}
      title={
        status === ModalStatuses.PERSONAL_FOLDER ? t('add_a_folder', 'Add a folder') : t('add_a_note', 'Add a note')
      }
    >
      <AddNoteModal
        methods={methods}
        cancelModal={cancelModal}
        submitForm={submitForm}
        createFolder={createFolder}
        foldersWithNotes={foldersWithNotes}
      />
    </WrapperModal>
  );
};

export default UserWrapper;
