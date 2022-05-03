import React, { Dispatch, FC, SetStateAction } from 'react';
import { EditSelectedNote } from '../../components/Modals/EditSelectedNote';
import WrapperModal from '../../../Modal/components/WrapperModal';
import { useTranslation } from 'components/Translation';
import { useNotesContainer } from '../../contexts';
import { UseFormReturn } from 'react-hook-form';
import { NotesType } from '../../type';

const UserEditWrapper: FC<{
  cancelSelectedNoteModal: () => void;
  methods: UseFormReturn;
  submitForm: () => void;
  definePropperEditMode: NotesType | null;
  setSelectedFolderDynamic: Dispatch<SetStateAction<NotesType | null>>;
}> = ({ cancelSelectedNoteModal, methods, submitForm, definePropperEditMode, setSelectedFolderDynamic }) => {
  const { t } = useTranslation();
  const { setSelectedNoteToEdit, foldersWithNotes, selectedNoteToEdit, setSelectedFolder } = useNotesContainer();
  return (
    <WrapperModal title={t('edit_note', 'Edit note')} onClose={cancelSelectedNoteModal}>
      <EditSelectedNote
        methods={methods}
        cancelSelectedNoteModal={cancelSelectedNoteModal}
        submitForm={submitForm}
        setSelectedNoteToEdit={setSelectedNoteToEdit}
        foldersWithNotes={foldersWithNotes}
        selectedNoteToEdit={selectedNoteToEdit}
        setSelectedFolder={setSelectedFolder}
        definePropperEditMode={definePropperEditMode}
        setSelectedFolderDynamic={setSelectedFolderDynamic}
      />
    </WrapperModal>
  );
};

export default UserEditWrapper;
