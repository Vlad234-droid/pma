import React, { FC, Dispatch, SetStateAction, MutableRefObject } from 'react';
import { Rule, useStyle, Button, Styles, CreateRule, useBreakpoints } from '@dex-ddl/core';
import { IconButton } from 'components/IconButton';
import { defineNotesHandler, AllNotesFolderIdTEAM } from '../../../../utils';
import { NoteData } from '../../type';

export const TEAM_FOLDER_WRAPPER = 'team_folder_wrapper';
export const CHANGE_TEAM_MODE = 'change_team_mode';
export const FOLDER_TITLE = 'folder_title';

type PersonalsTeamFoldersProps = {
  handleTEAMSelected: (itemID: string) => any;
  setConfirmTEAMModal: Dispatch<SetStateAction<boolean>>;
  selectedTEAMFolderId: MutableRefObject<null | string>;
  actionTEAMModal: MutableRefObject<null | string>;
  setSelectedFolder: Dispatch<SetStateAction<NoteData | null>>;
  selectedFolder: NoteData | null;
  foldersWithNotesTEAM: any;
  selectedTEAMNoteId: MutableRefObject<null | string>;
  setFoldersWithNotesTEAM: Dispatch<SetStateAction<Array<NoteData>>>;
  setFoldersWithNotes: Dispatch<SetStateAction<Array<NoteData>>>;
  setTeamArchivedMode: Dispatch<SetStateAction<boolean>>;
  teamArchivedMode: boolean;
  setSelectedTEAMFolder: Dispatch<SetStateAction<NoteData | null>>;
};

const PersonalsTeamFolders: FC<PersonalsTeamFoldersProps> = ({
  handleTEAMSelected,
  setConfirmTEAMModal,
  selectedTEAMFolderId,
  setSelectedFolder,
  selectedFolder,
  foldersWithNotesTEAM,
  selectedTEAMNoteId,
  setFoldersWithNotesTEAM,
  setFoldersWithNotes,
  actionTEAMModal,
  teamArchivedMode,
  setTeamArchivedMode,
  setSelectedTEAMFolder,
}) => {
  const { css, theme } = useStyle();

  const selectedDotsActionhandler = (e, noteId) => {
    selectedTEAMNoteId.current = null;
    if (e.target.id === 'dots' || e.target.parentElement.id === 'dots') {
      if (selectedFolder !== null) {
        setSelectedFolder((prev) => {
          const arr = { ...prev };
          arr.notes.forEach((item) => {
            item.selected = false;
          });
          return arr;
        });
      }
      if (foldersWithNotesTEAM[foldersWithNotesTEAM.findIndex((item) => item.selectedDots === true)]) {
        setFoldersWithNotesTEAM((prev) => {
          const arr = [...prev];
          arr[arr.findIndex((item) => item.id === noteId)].selectedDots = false;
          return arr;
        });
        return;
      }

      setFoldersWithNotesTEAM((prev) => {
        const arr = [...prev];
        arr[arr.findIndex((item) => item.id === noteId)].selectedDots = true;
        return arr;
      });
    }
  };

  const handleExpandFolder = (e, id: string): void => {
    if (e.target.id === 'dots' || e.target.parentElement.id === 'dots' || e.target.id === 'backdrop') {
      return;
    }
    setFoldersWithNotes((prev) => {
      return [
        ...prev.map((item) => {
          return {
            ...item,
            selected: false,
          };
        }),
      ];
    });
    if (selectedFolder !== null) {
      setSelectedFolder(() => null);
    }
    handleTEAMSelected(id);
  };

  const btnsActionsHandle = (itemId: string, notesLength: number) => {
    const btnsActions = [
      {
        ...(!teamArchivedMode && {
          id: '1',
          button: (
            <div
              className={css(alignFlexStyle)}
              id='backdrop'
              onClick={() => {
                selectedTEAMFolderId.current = itemId;
                actionTEAMModal.current = 'archive';
                setConfirmTEAMModal(() => true);
              }}
            >
              <IconButton
                graphic='archive'
                onPress={() => {
                  selectedTEAMFolderId.current = itemId;
                  actionTEAMModal.current = 'archive';
                  setConfirmTEAMModal(() => true);
                }}
              />
              <span className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })}>Archive folder</span>
            </div>
          ),
        }),
      },
      {
        id: '2',
        button: (
          <div
            id='backdrop'
            className={css(alignFlexStyleLast)}
            onClick={() => {
              selectedTEAMFolderId.current = itemId;
              actionTEAMModal.current = 'delete';
              setConfirmTEAMModal(() => true);
            }}
          >
            <IconButton
              iconProps={{ title: 'Delete' }}
              graphic='delete'
              onPress={() => {
                selectedTEAMFolderId.current = itemId;
                actionTEAMModal.current = 'delete';
                setConfirmTEAMModal(() => true);
              }}
            />
            <span id='backdrop' className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })}>
              Delete folder
            </span>
          </div>
        ),
      },
    ];

    return (
      <div
        id='backdrop'
        className={css({
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          right: '28px',
          bottom: !teamArchivedMode ? (notesLength ? '-101px' : '-110px') : !notesLength ? '-53px' : '-46px',
          background: theme.colors.white,
          zIndex: 2,
          borderRadius: '8px',
          boxShadow: 'rgba(100, 100, 111, 0.05) 4px 2px 10px 10px',
          ':before': {
            content: "''",
            width: '18px',
            height: '18px',
            position: 'absolute',
            top: '-9px',
            right: '34px',
            background: theme.colors.white,
            boxShadow: 'rgba(100, 100, 111, 0.08) -1px -1px 3px -1px',
            transform: 'rotate(45deg)',
          },
        })}
      >
        {btnsActions.map((item) => (
          <div key={item.id} id='backdrop'>
            {item.button}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={css(mainFolderContainerStyle)} data-test-id={TEAM_FOLDER_WRAPPER}>
      <div className={css(titleStyle)}>
        <h2 className={css({ padding: '24px' })} data-test-id={FOLDER_TITLE}>
          {!teamArchivedMode ? 'Folders for Notes on my Team' : 'Archived Folders for Notes on my Team'}
        </h2>
      </div>
      <div className={css({ marginTop: '48px' })}>
        {foldersWithNotesTEAM?.map((item) => {
          const { selected } = item;
          return (
            <div
              className={css({ position: 'relative' })}
              key={item.id}
              onClick={(e) => handleExpandFolder(e, item.id)}
            >
              <div className={css(itemListStyle({ selected }))}>
                <div className={css(marginFlex)}>
                  <span className={css(folterStyle)}>{item.title}</span>
                  <span className={css(quantityStyle)}>{defineNotesHandler(item.notes.length)}</span>
                </div>
                <div className={css({ display: 'flex', alignItems: 'center' })}>
                  {item.id !== AllNotesFolderIdTEAM && (
                    <div className={css(flexStyle)}>
                      <div className={css(dotsStyle)} onClick={(e) => selectedDotsActionhandler(e, item.id)} id='dots'>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}

                  {item.selectedDots && btnsActionsHandle(item.id, item.notes.length)}

                  <div className={css({ display: 'flex', alignItems: 'center' })}>
                    <IconButton
                      iconStyles={{ marginRight: '24px' }}
                      graphic='arrowRight'
                      onPress={(e) => handleExpandFolder(e, item.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        styles={[archiveStyle]}
        mode='inverse'
        data-test-id={CHANGE_TEAM_MODE}
        onPress={() => {
          setTeamArchivedMode((prev) => !prev);
          setSelectedTEAMFolder(() => null);
        }}
      >
        {!teamArchivedMode ? 'Archived Folders' : 'Personal Folders'}
      </Button>
    </div>
  );
};

const marginFlex: Rule = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '24px',
};
const dotsStyle: Rule = ({ colors }) =>
  ({
    display: 'flex',
    marginLeft: '30px',
    padding: '10px 10px 10px 10px',
    '& span': {
      height: '6px',
      width: '6px',
      background: colors.link,
      marginLeft: '4px',
      borderRadius: '50%',
    },
  } as Styles);

const mainFolderContainerStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mediumScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    width: '100%',
    background: '#FFFFFF',
    boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    ...(mediumScreen && { flexGrow: 1 }),
    marginTop: '8px',
  };
};

const flexStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

const titleStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  height: '24px',
  '& > h2': {
    margin: '0px',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#333333',
  },
} as Styles;
const archiveStyle: Rule = ({ theme }) => ({
  border: `1px solid ${theme.colors.tescoBlue}`,
  fontSize: '14px',
  height: '34px',
  fontWeight: 'bold',
  width: '136px',
  margin: '24px',
  whiteSpace: 'nowrap',
});

const itemListStyle: CreateRule<{ selected: boolean }> = ({ selected }) =>
  ({
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    padding: '13px 0px',
    backgroundColor: selected ? '#F3F9FC' : 'white',
    ':after': {
      content: '""',
      position: 'absolute',
      bottom: '0px',
      width: '100%',
      height: '1px',
      background: '#E5E5E5',
      marginTop: '16px',
    },
  } as Styles);

const folterStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#00539F',
};

const quantityStyle: Rule = ({ theme }) => ({
  fontSize: '18px',
  lineHeight: '22px',
  color: theme.colors.base,
  position: 'relative',
  marginTop: '4px',
});

const alignFlexStyle: Rule = ({ colors }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  cursor: 'pointer',
  borderBottom: `1px solid ${colors.lightGray}`,
  padding: '15px 24px',
});
const alignFlexStyleLast: Rule = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  cursor: 'pointer',

  padding: '15px 24px',
};
export default PersonalsTeamFolders;
