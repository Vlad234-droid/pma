import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { AddTeamNoteModal } from '../../components';
import WrapperModal from 'features/Modal/components/WrapperModal';
import { ModalStatuses } from '../../NotesActions';
import { useTranslation } from 'components/Translation';
import { useNotesContainer } from '../../contexts';

const TeamWrapper: FC<{
  cancelTEAMModal: () => void;
  status: ModalStatuses;
  teamMethods: UseFormReturn;
  handleTEAMSubmit: () => void;
}> = ({ cancelTEAMModal, status, teamMethods, handleTEAMSubmit }) => {
  const { t } = useTranslation();
  const { searchValue, setSearchValue, selectedPerson, setSelectedPerson, foldersWithNotesTEAM } = useNotesContainer();
  return (
    <WrapperModal
      onClose={cancelTEAMModal}
      title={
        status === ModalStatuses.TEAM_FOLDER
          ? t('add_team_folder', 'Add team folder')
          : t('add_a_team_note', 'Add a team note')
      }
    >
      <AddTeamNoteModal
        teamMethods={teamMethods}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        foldersWithNotesTEAM={foldersWithNotesTEAM}
        cancelTEAMModal={cancelTEAMModal}
        handleTEAMSubmit={handleTEAMSubmit}
        createFolder={status === ModalStatuses.TEAM_FOLDER}
      />
    </WrapperModal>
  );
};

export default TeamWrapper;
