import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { FoldersWithNotesTypesTEAM, NotesTypeTEAM } from 'features/NotesActions/type';
import { Notification } from 'components/Notification';
import { Trans, useTranslation } from 'components/Translation';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import { ButtonsWrapper } from 'components/ButtonsWrapper';

import { SearchPart, SubmitPart, SuccessModal } from '../index';
import { PeopleTypes } from '../type';

export const MODAL_WRAPPER = 'modal-wrapper';

type AddTeamNoteModalProps = {
  teamMethods: UseFormReturn;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSelectedPerson: Dispatch<SetStateAction<NotesTypeTEAM | null>>;
  selectedPerson: PeopleTypes | null;
  foldersWithNotesTEAM: Array<FoldersWithNotesTypesTEAM> | [];
  cancelTEAMModal: () => void;
  handleTEAMSubmit: () => void;
  createFolder: boolean;
};

const AddTeamNoteModal: FC<AddTeamNoteModalProps> = ({
  teamMethods,
  searchValue,
  setSearchValue,
  selectedPerson,
  setSelectedPerson,
  foldersWithNotesTEAM,
  cancelTEAMModal,
  handleTEAMSubmit,
  createFolder,
}) => {
  const [successTEAMModal, setSuccessTEAMModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const { css } = useStyle();

  const {
    formState: { isValid },
    reset,
  } = teamMethods;

  if (successTEAMModal) {
    return <SuccessModal teamMethods={teamMethods} cancelTEAMModal={cancelTEAMModal} createFolder={createFolder} />;
  }

  return (
    <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={MODAL_WRAPPER}>
      <ArrowLeftIcon
        testId={'go-back'}
        onClick={() => {
          if (selectedPerson !== null) {
            setSearchValue(() => '');
            setSelectedPerson(() => null);
            reset();
          } else {
            cancelTEAMModal();
          }
        }}
        data-test-id='go-back'
      />

      <Notification
        graphic='information'
        iconColor='link'
        text={t(
          'notes_description',
          'My Notes can be used to create and store notes about Your Contribution or that of your direct reports. Use this space to record achievements, thoughts on objectives or subjects to raise during your 1:1s. Although these notes are private, if you write something about anyone else they can request to see it so please remain professional.',
        )}
        closable={false}
        customStyle={{
          background: '#F3F9FC',
          marginBottom: '20px',
        }}
      />
      <h2 className={css(colleagueStyled)}>
        <Trans i18nKey='select_a_colleague'>Select a colleague</Trans>
      </h2>
      <span className={css(discStyle)}>
        <Trans i18nKey='select_a_colleague_to_add'>Select which colleague you want to add note about</Trans>
      </span>

      <form>
        <SearchPart
          teamMethods={teamMethods}
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {selectedPerson && (
          <SubmitPart
            selectedPerson={selectedPerson}
            teamMethods={teamMethods}
            foldersWithNotesTEAM={foldersWithNotesTEAM}
            createFolder={createFolder}
          />
        )}
      </form>
      <ButtonsWrapper
        isValid={isValid}
        onLeftPress={cancelTEAMModal}
        onRightPress={() => {
          setSuccessTEAMModal(() => true);
          handleTEAMSubmit();
        }}
      />
    </div>
  );
};

const WrapperModalGiveFeedbackStyle: Rule = {
  paddingLeft: '40px',
  paddingRight: '40px',
  height: '100%',
  overflow: 'auto',
};

const colleagueStyled: Rule = {
  margin: '40px 0px 8px 0px',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
};

const discStyle: Rule = {
  fontSize: '18px',
  lineHeight: '22px',
};

export default AddTeamNoteModal;
