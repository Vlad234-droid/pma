import React, { FC } from 'react';
import { colors, CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { getFoldersSelector } from '@pma/store';
import { useSelector } from 'react-redux';

import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';
import { formatToRelativeDate } from 'utils/date';
import { getNotesFolderTitle } from 'utils/note';
import { SelectedFolderProps } from '../../../type';

export const FOLDER_WRAPPER = 'folder-wrapper';

const SelectedFolder: FC<SelectedFolderProps> = ({
  selectedFolder,
  setConfirmModal,
  selectedNoteId,
  actionModal,
  setSelectedFolder,
  foldersWithNotes,
  setFoldersWithNotes,
  selectedFolderId,
  noteFolderUuid,
  setSelectedNoteToEdit,
  isUserArchived = false,
  setSelectedTEAMNoteToEdit,
  selectedTEAMNoteId,
  actionTEAMModal,
  setConfirmTEAMModal,
  noteTEAMFolderUuid,
  testId = '',
}) => {
  const { css, matchMedia } = useStyle();
  const mediumScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  //TODO: this is hard to read. Refactor this
  const btnsActionsHandle = (itemId: string, itemFolderUuid: string | null, item: any) => {
    const btnsActions = [
      {
        ...(!isUserArchived && {
          id: '1',
          button: (
            <div
              className={css(Align_flex_style)}
              id='backdrop'
              data-test-id='backdrop-archive'
              onClick={() => {
                if (!item.referenceColleagueUuid) {
                  selectedNoteId.current = itemId;
                  actionModal.current = 'archive';
                  setConfirmModal(() => true);
                } else {
                  selectedTEAMNoteId.current = itemId;
                  actionTEAMModal.current = 'archive';
                  setConfirmTEAMModal(() => true);
                }
              }}
            >
              <IconButton
                iconProps={{ title: 'Archive' }}
                id='backdrop'
                customVariantRules={{ default: notePropertiesIconStyle }}
                graphic='archive'
                data-test-id='backdrop-archive-icon'
                onPress={() => {
                  if (!item.referenceColleagueUuid) {
                    selectedNoteId.current = itemId;
                    actionModal.current = 'archive';
                    setConfirmModal(() => true);
                  } else {
                    selectedTEAMNoteId.current = itemId;
                    actionTEAMModal.current = 'archive';
                    setConfirmTEAMModal(() => true);
                  }
                }}
              />
              <span className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })} id='backdrop'>
                <Trans i18nKey='archive_note'>Archive note</Trans>
              </span>
            </div>
          ),
        }),
      },
      {
        ...(!isUserArchived && {
          id: '2',
          button: (
            <div
              id='backdrop'
              data-test-id='backdrop-folder'
              className={css(Align_flex_style)}
              onClick={() => {
                if (!item.referenceColleagueUuid) {
                  selectedNoteId.current = itemId;
                  noteFolderUuid.current = itemFolderUuid;
                  actionModal.current = 'move';
                  setConfirmModal(() => true);
                } else {
                  selectedTEAMNoteId.current = itemId;
                  noteTEAMFolderUuid.current = itemFolderUuid;
                  actionTEAMModal.current = 'move';
                  setConfirmTEAMModal(() => true);
                }
              }}
            >
              <IconButton
                iconProps={{ title: 'Move to folder' }}
                graphic='folder'
                id='backdrop'
                data-test-id='backdrop-folder-icon'
                customVariantRules={{ default: notePropertiesIconStyle }}
                onPress={() => {
                  if (!item.referenceColleagueUuid) {
                    selectedNoteId.current = itemId;
                    noteFolderUuid.current = itemFolderUuid;
                    actionModal.current = 'move';
                    setConfirmModal(() => true);
                  } else {
                    selectedTEAMNoteId.current = itemId;
                    noteTEAMFolderUuid.current = itemFolderUuid;
                    actionTEAMModal.current = 'move';
                    setConfirmTEAMModal(() => true);
                  }
                }}
              />
              <span className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })} id='backdrop'>
                <Trans i18nKey='move_to_folder'>Move to folder</Trans>
              </span>
            </div>
          ),
        }),
      },
      {
        id: '3',
        button: (
          <div
            className={css(Align_flex_styleLast)}
            id='backdrop'
            data-test-id='backdrop-delete'
            onClick={() => {
              if (!item.referenceColleagueUuid) {
                selectedNoteId.current = itemId;
                actionModal.current = 'delete';
                setConfirmModal(() => true);
              } else {
                selectedTEAMNoteId.current = itemId;
                actionTEAMModal.current = 'delete';
                setConfirmTEAMModal(() => true);
              }
            }}
          >
            <IconButton
              iconProps={{ title: 'Delete' }}
              graphic='delete'
              id='backdrop'
              data-test-id='backdrop-delete-icon'
              customVariantRules={{ default: notePropertiesIconStyle }}
              onPress={() => {
                if (!item.referenceColleagueUuid) {
                  selectedNoteId.current = itemId;
                  actionModal.current = 'delete';
                  setConfirmModal(() => true);
                } else {
                  selectedTEAMNoteId.current = itemId;
                  actionTEAMModal.current = 'delete';
                  setConfirmTEAMModal(() => true);
                }
              }}
            />
            <span className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })} id='backdrop'>
              <Trans i18nKey='delete_note'>Delete note</Trans>
            </span>
          </div>
        ),
      },
    ];

    return (
      <div className={css(modalButtonsStyle({ isUserArchived }))} data-test-id='button-dots'>
        {btnsActions.filter(Boolean).map((item) => (
          <div key={item.id}>{item.button}</div>
        ))}
      </div>
    );
  };

  const selectedNoteActionhandler = (noteId) => {
    selectedFolderId.current = null;
    if (foldersWithNotes.length) {
      setFoldersWithNotes((prev) => {
        const arr = [...prev];
        arr.forEach((item) => {
          item.selectedDots = false;
        });
        return arr;
      });
    }

    if (selectedFolder.notes[selectedFolder?.notes?.findIndex((item) => item.selected === true)]) {
      setSelectedFolder((prev) => {
        const arr = { ...prev };
        arr.notes[arr.notes.findIndex((item) => item.id === noteId)].selected = false;
        return arr;
      });
      return;
    }
    setSelectedFolder((prev) => {
      const arr = { ...prev };
      arr.notes.forEach((item) => (item.selected = false));
      return arr;
    });

    setSelectedFolder((prev) => {
      const arr = { ...prev };
      arr.notes[arr.notes.findIndex((item) => item.id === noteId)].selected = true;
      return arr;
    });
  };

  const setSelectedNoteHandler = (e, item) => {
    if (isUserArchived) return;
    if (e.target.parentElement.id === 'backdrop' || e.target.id === 'backdrop') return;
    if (selectedFolder.notes[selectedFolder?.notes?.findIndex((item) => item.selected === true)]) {
      setSelectedFolder((prev) => {
        const arr = { ...prev };
        arr.notes[arr.notes.findIndex((note) => note.id === item.id)].selected = false;
        return arr;
      });
    }
    if (item.referenceColleagueUuid) {
      setSelectedTEAMNoteToEdit(() => item);
    } else {
      setSelectedNoteToEdit(() => item);
    }
  };

  const foldersList = useSelector(getFoldersSelector) || [];

  return (
    <div className={css(expandedNoteStyle({ mediumScreen }))} data-test-id={FOLDER_WRAPPER}>
      <div className={css(flexBeetweenStyle)}>
        <span className={css(folderTitleStyled)}>{selectedFolder?.title}</span>
      </div>
      <div className={css({ marginTop: '32px', display: 'flex', flexDirection: 'column' })} data-test-id={testId}>
        {selectedFolder?.notes?.map((item) => (
          <div
            className={css(flexBeetweenStyle, noteContainerStyle, { position: 'relative' })}
            key={item.id}
            data-test-id='note'
            onClick={(e) => setSelectedNoteHandler(e, item)}
          >
            <span className={css(noteTitleStyle)}>
              {item.title}
              {selectedFolder.isInSearch && (
                <div className={css(noteFolderTitleStyle)}>{getNotesFolderTitle(item.folderUuid, foldersList)}</div>
              )}
            </span>
            <div className={css(FlexStyle)}>
              <span className={css(timeStyled)}>{formatToRelativeDate(item?.updateTime)}</span>
              <div
                className={css(dotsStyle)}
                data-test-id='dots'
                onClick={() => selectedNoteActionhandler(item.id)}
                id='backdrop'
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            {item.selected && btnsActionsHandle(item.id, item.folderUuid, item)}
          </div>
        ))}
      </div>
    </div>
  );
};

const Align_flex_style: Rule = ({ colors }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  cursor: 'pointer',
  // @ts-ignore
  borderBottom: `2px solid ${colors.lightGray}`,
  padding: '15px 24px',
});
const Align_flex_styleLast: Rule = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  cursor: 'pointer',

  padding: '15px 24px',
};

const modalButtonsStyle: CreateRule<{ isUserArchived: boolean }> = ({ isUserArchived }) =>
  ({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    right: '-30px',
    bottom: !isUserArchived ? '-174px' : '-56px',
    background: colors.white,
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
      background: colors.white,
      boxShadow: 'rgba(100, 100, 111, 0.08) -1px -1px 3px -1px',
      transform: 'rotate(45deg)',
    },
  } as Styles);
const dotsStyle: Rule = ({ colors }) =>
  ({
    display: 'flex',
    marginLeft: '30px',
    padding: '10px 0px 10px 10px',
    cursor: 'pointer',
    '& span': {
      height: '6px',
      width: '6px',
      background: colors.link,
      marginLeft: '4px',
      borderRadius: '50%',
    },
  } as Styles);

const FlexStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const expandedNoteStyle: CreateRule<{ mediumScreen: boolean }> =
  ({ mediumScreen }) =>
  ({ theme }) => ({
    background: theme.colors.white,
    boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    width: '100%',
    height: '100%',
    padding: '24px',
    alignSelf: 'flex-start',
    ...(mediumScreen && { flexGrow: 1 }),
  });

const folderTitleStyled: Rule = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  color: '#333333',
};

const flexBeetweenStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const noteTitleStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#00539F',
};

const noteFolderTitleStyle: Rule = ({ theme }) => {
  return {
    fontSize: `${theme.font.fixed.f16.fontSize}`,
    lineHeight: `${theme.font.fixed.f16.lineHeight}`,
    color: theme.colors.base,
    fontWeight: `${theme.font.weight.regular}`,
    marginTop: '5px',
  };
};

const noteContainerStyle: Rule = {
  position: 'relative',
  cursor: 'pointer',
  padding: '10px 0',
  '&:before': {
    content: '""',
    position: 'absolute',
    height: '1px',
    width: '100%',
    background: '#E5E5E5',
    left: '0px',
    bottom: '0px',
  },
} as Styles;

const timeStyled: Rule = {
  fontWeight: 'normal',
  fontSize: '18px',
  lineHeight: '22px',
  textAlign: 'right',
  color: '#333333',
};

const notePropertiesIconStyle: Rule = {
  display: 'block',
  height: '24px',
};

export default SelectedFolder;
