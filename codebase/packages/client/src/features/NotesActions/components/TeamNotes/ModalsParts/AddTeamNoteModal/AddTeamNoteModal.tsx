import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button, CreateRule, Rule, Theme, useBreakpoints, useStyle } from '@pma/dex-wrapper';
import { FoldersWithNotesTypesTEAM, NotesTypeTEAM } from 'features/NotesActions/type';
import { Notification } from 'components/Notification';
import { Icon as IconComponent } from 'components/Icon';
import { Trans, useTranslation } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
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
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const {
    formState: { isValid },
    reset,
  } = teamMethods;

  if (successTEAMModal) {
    return <SuccessModal teamMethods={teamMethods} cancelTEAMModal={cancelTEAMModal} createFolder={createFolder} />;
  }

  return (
    <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={MODAL_WRAPPER}>
      <span
        className={css(arrowLeftStyle({ theme, mobileScreen }))}
        data-test-id='go-back'
        onClick={() => {
          if (selectedPerson !== null) {
            setSearchValue(() => '');
            setSelectedPerson(() => null);
            reset();
          } else {
            cancelTEAMModal();
          }
        }}
      >
        <IconComponent graphic='arrowLeft' invertColors={true} />
      </span>
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
      <h2 className={css(collegueStyled)}>
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
      <div className={css(absolueStyle)}>
        <div className={css(selectedRelativeStyle)}>
          <div className={css(btnsStyle({ mobileScreen, theme }))}>
            <Button styles={[theme.font.fixed.f16, buttonCoreStyled]} onPress={cancelTEAMModal}>
              <Trans i18nKey='cancel'>Cancel</Trans>
            </Button>

            <IconButton
              isDisabled={!isValid}
              customVariantRules={{ default: iconBtnStyle, disabled: iconBtnStyleDisabled }}
              graphic='arrowRight'
              data-test-id='arrowRight'
              iconProps={{ invertColors: true }}
              iconPosition={Position.RIGHT}
              onPress={() => {
                setSuccessTEAMModal(() => true);
                handleTEAMSubmit();
              }}
            >
              <Trans i18nKey='submit'>Submit</Trans>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const btnsStyle: CreateRule<{ mobileScreen: boolean; theme: Theme }> = ({ mobileScreen, theme }) => ({
  padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
  display: 'flex',
  justifyContent: 'space-between',
});

const WrapperModalGiveFeedbackStyle: Rule = {
  paddingLeft: '40px',
  paddingRight: '40px',
  height: '100%',
  overflow: 'auto',
};

const collegueStyled: Rule = {
  margin: '40px 0px 8px 0px',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
};

const discStyle: Rule = {
  fontSize: '18px',
  lineHeight: '22px',
};
const absolueStyle: Rule = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  background: '#FFFFFF',
  height: '112px',
  borderRadius: '32px',
};

const selectedRelativeStyle: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  // @ts-ignore
  borderTop: `${theme.border.width.b2} solid ${theme.colors.lightGray}`,
  cursor: 'pointer',
  marginRight: '3px',
});

// TODO: Extract duplicate 7
const buttonCoreStyled: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '0px 12px 0px 20px',
  display: 'flex',
  width: '49%',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconBtnStyleDisabled: Rule = ({ theme }) => ({
  padding: '0px 12px 0px 20px',
  display: 'flex',
  width: '49%',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  pointerEvents: 'none',
  opacity: '0.4',
});

const arrowLeftStyle: CreateRule<{ theme: Theme; mobileScreen: boolean }> = ({ theme, mobileScreen }) => {
  return {
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

export default AddTeamNoteModal;
