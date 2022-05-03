import React, { FC, Dispatch, SetStateAction } from 'react';
import { EditSelectedNote } from '../../components/Modals/EditSelectedNote';
import WrapperModal from 'features/Modal/components/WrapperModal';
import { useTranslation } from 'components/Translation';
import { useNotesContainer } from '../../contexts';
import { UseFormReturn } from 'react-hook-form';
import { NotesType } from '../../type';

const TeamEditWrapper: FC<{
  cancelSelectedNoteModal: () => void;
  methods: UseFormReturn;
  cancelTEAMSelectedNoteModal: () => void;
  submitForm: () => void;
  definePropperEditMode: NotesType | null;
  setSelectedFolderDynamic: Dispatch<SetStateAction<NotesType | null>>;
}> = ({
  cancelSelectedNoteModal,
  methods,
  cancelTEAMSelectedNoteModal,
  submitForm,
  definePropperEditMode,
  setSelectedFolderDynamic,
}) => {
  const { t } = useTranslation();
  const { setSelectedTEAMNoteToEdit, foldersWithNotesTEAM, selectedTEAMNoteToEdit, setSelectedTEAMFolder } =
    useNotesContainer();
  return (
    <WrapperModal title={t('my_notes', 'My notes')} onClose={cancelSelectedNoteModal}>
      <EditSelectedNote
        methods={methods}
        cancelSelectedNoteModal={cancelTEAMSelectedNoteModal}
        submitForm={submitForm}
        setSelectedNoteToEdit={setSelectedTEAMNoteToEdit}
        foldersWithNotes={foldersWithNotesTEAM}
        selectedNoteToEdit={selectedTEAMNoteToEdit}
        setSelectedFolder={setSelectedTEAMFolder}
        definePropperEditMode={definePropperEditMode}
        setSelectedFolderDynamic={setSelectedFolderDynamic}
      />
    </WrapperModal>
  );
};

export default TeamEditWrapper;
