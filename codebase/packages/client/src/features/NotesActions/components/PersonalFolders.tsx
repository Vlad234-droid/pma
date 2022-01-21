import React, { FC } from 'react';
import { Rule, useStyle, Button, Styles, CreateRule, useBreakpoints } from '@dex-ddl/core';
import { IconButton } from 'components/IconButton';
import { PersonalFoldersProps } from '../type';
import { defineNotesHandler, AllNotesFolderId } from '../../../utils';

export const PERSONAL_FOLDER_WRAPPER = 'personal_folder_wrapper';
export const CHANGE_USER_MODE = 'change_user_mode';

const PersonalFolders: FC<PersonalFoldersProps> = ({
  handleSelected,
  setConfirmModal,
  setSelectedTEAMFolder,
  selectedTEAMFolder,
  setFoldersWithNotesTEAM,
  actionModal,
  selectedFolderId,
  foldersWithNotes,
  setFoldersWithNotes,
  selectedFolder,
  setSelectedFolder,
  selectedNoteId,
  setUserArchivedMode,
  userArchivedMode,
}) => {
  const { css, theme } = useStyle();

  const selectedDotsActionhandler = (e, noteId) => {
    selectedNoteId.current = null;
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
      if (foldersWithNotes?.find((item) => item?.selectedDots === true)) {
        setFoldersWithNotes((prev) => {
          const arr = [...prev];
          arr[arr.findIndex((item) => item.id === noteId)].selectedDots = false;
          return arr;
        });
        return;
      }

      setFoldersWithNotes((prev) => {
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
    setFoldersWithNotesTEAM((prev) => {
      return [
        ...prev.map((item) => {
          return {
            ...item,
            selected: false,
          };
        }),
      ];
    });
    if (selectedTEAMFolder !== null) {
      setSelectedTEAMFolder(() => null);
    }
    handleSelected(id);
  };

  const btnsActionsHandle = (itemId: string, notesLength: number) => {
    const btnsActions = [
      {
        ...(!userArchivedMode && {
          id: '1',
          button: (
            <div
              className={css(alignFlexStyle)}
              id='backdrop'
              onClick={() => {
                selectedFolderId.current = itemId;
                actionModal.current = 'archive';
                setConfirmModal(() => true);
              }}
            >
              <IconButton
                graphic='archive'
                onPress={() => {
                  selectedFolderId.current = itemId;
                  actionModal.current = 'archive';
                  setConfirmModal(() => true);
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
              selectedFolderId.current = itemId;
              actionModal.current = 'delete';
              setConfirmModal(() => true);
            }}
          >
            <IconButton
              iconProps={{ title: 'Delete' }}
              graphic='delete'
              onPress={() => {
                selectedFolderId.current = itemId;
                actionModal.current = 'delete';
                setConfirmModal(() => true);
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
          bottom: !userArchivedMode ? (notesLength ? '-101px' : '-110px') : !notesLength ? '-53px' : '-46px',
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
    <div className={css(mainFolderContainerStyle)} data-test-id={PERSONAL_FOLDER_WRAPPER}>
      <div className={css(titleStyle)}>
        <h2 className={css({ padding: '24px' })}>{!userArchivedMode ? 'Personal Folders' : 'Archived Folders'}</h2>
      </div>
      <div className={css({ marginTop: '48px' })}>
        {foldersWithNotes?.map((item) => {
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
                  {item.id !== AllNotesFolderId && (
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
        data-test-id={CHANGE_USER_MODE}
        onPress={() => {
          setUserArchivedMode((prev) => !prev);
          setSelectedFolder(() => null);
        }}
      >
        {!userArchivedMode ? 'Archived Folders' : 'Personal Folders'}
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
  borderBottom: `1px solid ${colors.backgroundDarkest}`,
  padding: '15px 24px',
});
const alignFlexStyleLast: Rule = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  cursor: 'pointer',

  padding: '15px 24px',
};

export default PersonalFolders;
