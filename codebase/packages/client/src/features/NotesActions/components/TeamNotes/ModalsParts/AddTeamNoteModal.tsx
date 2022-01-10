import React, { Dispatch, FC, SetStateAction } from 'react';
import { Notification } from 'components/Notification';
import { useStyle, Rule, useBreakpoints, Button } from '@dex-ddl/core';
import { SearchPart } from './SearchPart';
import { UseFormReturn } from 'react-hook-form';
import { PeopleTypes } from './type';
import { Trans } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import { SubmitPart } from './SubmitPart';
import { NotesTypeTEAM, FoldersWithNotesTypesTEAM } from 'features/NotesActions/type';
import { Icon as IconComponent } from 'components/Icon';
import { SuccessModal } from './SuccessModal';

type AddTeamNoteModalProps = {
  teamMethods: UseFormReturn;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setTeamNoteModal: Dispatch<SetStateAction<boolean>>;
  setSelectedPerson: Dispatch<SetStateAction<NotesTypeTEAM | null>>;
  selectedPerson: PeopleTypes | null;
  foldersWithNotesTEAM: Array<FoldersWithNotesTypesTEAM> | [];
  cancelTEAMModal: () => void;
  handleTEAMSubmit: () => void;
  setSuccessTEAMModal: Dispatch<SetStateAction<boolean>>;
  successTEAMModal: boolean;
};

const AddTeamNoteModal: FC<AddTeamNoteModalProps> = ({
  teamMethods,
  searchValue,
  setSearchValue,
  setTeamNoteModal,
  selectedPerson,
  setSelectedPerson,
  foldersWithNotesTEAM,
  cancelTEAMModal,
  handleTEAMSubmit,
  setSuccessTEAMModal,
  successTEAMModal,
}) => {
  if (successTEAMModal) {
    return (
      <SuccessModal
        teamMethods={teamMethods}
        setTeamNoteModal={setTeamNoteModal}
        setSuccessTEAMModal={setSuccessTEAMModal}
        setSelectedPerson={setSelectedPerson}
      />
    );
  }
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const {
    formState: { isValid },
    reset,
  } = teamMethods;

  return (
    <div className={css(WrapperModalGiveFeedbackStyle)}>
      <span
        className={css(arrowLeftStyle)}
        onClick={() => {
          if (selectedPerson !== null) {
            setSearchValue(() => '');
            setSelectedPerson(() => null);
            reset();
          } else {
            setTeamNoteModal(() => false);
          }
        }}
      >
        <IconComponent graphic='arrowLeft' invertColors={true} />
      </span>
      <Notification
        graphic='information'
        iconColor='link'
        text='My Notes can be used to create and store notes about Your Contribution or that of your direct reports. Use this space to record achievements, thoughts on objectives or subjects to raise during your 1:1s. Although these notes are private, if you write something about anyone else they can request to see it so please remain professional.'
        closable={false}
        customStyle={{
          background: '#F3F9FC',
          marginBottom: '20px',
        }}
      />
      <h2 className={css(collegueStyled)}>Select a colleague</h2>
      <span className={css(discStyle)}>Select which colleague you want to add note about</span>

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
          />
        )}
      </form>
      <div className={css(absolueStyle)}>
        <div className={css(selectedRelativeStyle)}>
          <div
            className={css({
              padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
              display: 'flex',
              justifyContent: 'space-between',
            })}
          >
            <Button styles={[theme.font.fixed.f16, buttonCoreStyled]} onPress={cancelTEAMModal} isDisabled={true}>
              <Trans>Cancel</Trans>
            </Button>

            <IconButton
              isDisabled={!isValid}
              customVariantRules={{ default: iconBtnStyle, disabled: iconBtnStyleDisabled }}
              graphic='arrowRight'
              iconProps={{ invertColors: true }}
              iconPosition={Position.RIGHT}
              onPress={() => {
                setSuccessTEAMModal(() => true);
                handleTEAMSubmit();
              }}
            >
              <Trans>Submit</Trans>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
  cursor: 'pointer',
  marginRight: '3px',
});

const buttonCoreStyled: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
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

const arrowLeftStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
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
