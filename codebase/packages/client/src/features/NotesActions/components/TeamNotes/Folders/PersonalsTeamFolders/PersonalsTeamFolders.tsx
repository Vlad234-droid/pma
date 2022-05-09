import React, { FC, Dispatch, SetStateAction, MutableRefObject, MouseEvent, useRef } from 'react';
import { Rule, useStyle, Button, Styles, CreateRule } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';
import { defineNotesHandler, AllNotesFolderIdTEAM } from 'utils/note';
import { Trans } from 'components/Translation';

import { useNotesContainer } from '../../../../contexts';
import useEventListener from 'hooks/useEventListener';

export const TEAM_FOLDER_WRAPPER = 'team_folder_wrapper';
export const CHANGE_TEAM_MODE = 'change_team_mode';
export const FOLDER_TITLE = 'folder_title';

type PersonalsTeamFoldersProps = {
  handleTEAMSelected: (itemID: string) => any;
  setConfirmTEAMModal: Dispatch<SetStateAction<boolean>>;
  actionTEAMModal: MutableRefObject<null | string>;
  teamsActions: Record<string, string | null>;
};

const PersonalsTeamFolders: FC<PersonalsTeamFoldersProps> = ({
  handleTEAMSelected,
  setConfirmTEAMModal,
  actionTEAMModal,
  teamsActions,
}) => {
  const { css, matchMedia } = useStyle();
  const mediumScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const ref = useRef<HTMLDivElement | null>();

  const {
    setArchiveMode,
    archiveMode,
    setSelectedFolder,
    selectedFolder,
    foldersWithNotesTEAM,
    setFoldersWithNotesTEAM,
    setSelectedTEAMFolder,
  } = useNotesContainer();

  const teamArchivedMode = archiveMode.team;

  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    const element = event?.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      setFoldersWithNotesTEAM((prev) => [...prev.map((item) => ({ ...item, selectedDots: false }))]);
    }
  };

  useEventListener('mousedown', handleClickOutside);

  const selectedDotsActionhandler = (e, noteId) => {
    if (e.target.id === 'dots' || e.target.parentElement.id === 'dots') {
      setFoldersWithNotesTEAM((prev) => {
        const arr = [...prev];
        arr.find((item) => item.id === noteId).selectedDots = true;
        return arr;
      });
    }
  };

  const handleExpandFolder = (e, id: string): void => {
    if (
      e.target.id === 'dots' ||
      e.target.parentElement.id === 'dots' ||
      e.target.parentElement.id === 'backdrop' ||
      e.target.id === 'backdrop'
    ) {
      return;
    }
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
                teamsActions.folderId = itemId;
                actionTEAMModal.current = 'archive';
                setConfirmTEAMModal(() => true);
              }}
            >
              <IconButton
                graphic='archive'
                onPress={() => {
                  teamsActions.folderId = itemId;
                  actionTEAMModal.current = 'archive';
                  setConfirmTEAMModal(() => true);
                }}
              />
              <span className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })}>
                <Trans i18nKey='archive_folder'>Archive folder</Trans>
              </span>
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
              teamsActions.folderId = itemId;
              actionTEAMModal.current = 'delete';
              setConfirmTEAMModal(() => true);
            }}
          >
            <IconButton
              iconProps={{ title: 'Delete' }}
              graphic='delete'
              onPress={() => {
                teamsActions.folderId = itemId;
                actionTEAMModal.current = 'delete';
                setConfirmTEAMModal(() => true);
              }}
            />
            <span id='backdrop' className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })}>
              <Trans i18nKey='delete_folder'>Delete folder</Trans>
            </span>
          </div>
        ),
      },
    ];

    return (
      <div
        //@ts-ignore
        ref={ref}
        id='backdrop'
        className={css(dotsContainerStyle({ teamArchivedMode, notesLength }))}
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
    <div className={css(mainFolderContainerStyle({ mediumScreen }))} data-test-id={TEAM_FOLDER_WRAPPER}>
      <div className={css({ display: 'flex', justifyContent: 'space-between', height: '24px' })}>
        <h2 className={css(titleStyle)} data-test-id={FOLDER_TITLE}>
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
              data-test-id='folder-item'
              onClick={(e) => handleExpandFolder(e, item.id)}
            >
              <div className={css(itemListStyle({ selected }))}>
                <div className={css(marginFlex)}>
                  <span className={css(folderTitle)}>{item.title}</span>
                  <span className={css(quantityStyle)}>{defineNotesHandler(item.notes.length)}</span>
                </div>
                <div className={css({ display: 'flex', alignItems: 'center' })}>
                  {item.id !== AllNotesFolderIdTEAM && (
                    <div className={css(flexStyle)}>
                      <div
                        className={css(dotsStyle)}
                        data-test-id='dots-items'
                        onClick={(e) => selectedDotsActionhandler(e, item.id)}
                        id='dots'
                      >
                        <span />
                        <span />
                        <span />
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
      <div className={css({ justifyContent: 'flex-start', display: 'flex' })}>
        <Button
          styles={[archiveStyle]}
          mode='inverse'
          data-test-id={CHANGE_TEAM_MODE}
          onPress={() => {
            setArchiveMode((prev) => ({ ...prev, team: !prev.team }));
            setSelectedTEAMFolder(() => null);
          }}
        >
          {!teamArchivedMode ? 'Archived Folders' : 'Personal Folders'}
        </Button>
      </div>
    </div>
  );
};

const dotsContainerStyle: CreateRule<{ teamArchivedMode: boolean; notesLength: number }> =
  ({ teamArchivedMode, notesLength }) =>
  ({ theme }) => ({
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
  });

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

const mainFolderContainerStyle: CreateRule<{ mediumScreen: boolean }> =
  ({ mediumScreen }) =>
  ({ theme }) => ({
    width: '100%',
    background: theme.colors.white,
    boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    ...(mediumScreen && { flexGrow: 1 }),
    marginTop: '8px',
  });

const flexStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

const titleStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f20,
  letterSpacing: '0px',
  margin: '0px',
  color: theme.colors.base,
  padding: '24px',
});

const archiveStyle: Rule = ({ theme }) => ({
  border: `2px solid ${theme.colors.tescoBlue}`,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  height: '34px',
  fontWeight: 'bold',
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
      height: '2px',
      background: '#E5E5E5',
      marginTop: '16px',
    },
  } as Styles);

const folderTitle: Rule = ({ theme }) => ({
  letterSpacing: '0px',
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  color: theme.colors.tescoBlue,
});

const quantityStyle: Rule = ({ theme }) => ({
  letterSpacing: '0px',
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
  // @ts-ignore
  borderBottom: `2px solid ${colors.lightGray}`,
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
