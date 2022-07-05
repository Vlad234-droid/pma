import React, { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { colors, CreateRule, Rule, Styles, theme, useStyle } from '@pma/dex-wrapper';
import { getFoldersSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IconButton } from 'components/IconButton';
import { buildPath } from 'features/general/Routes';
import { Trans } from 'components/Translation';
import { Page } from 'pages';

import { formatToRelativeDate } from 'utils/date';
import { getNotesFolderTitle } from 'utils/note';
import { NoteData, SelectedFolderProps } from '../../../configs';
import { useNotesContainer } from '../../../contexts';
import { paramsReplacer } from 'utils';
import { useSearch } from '../../../hooks/useSearch';
import useEventListener from 'hooks/useEventListener';

const initialState: NoteData = {
  id: '',
  isInSearch: false,
  notes: [],
  ownerColleagueUuid: '',
  quantity: 0,
  selectedDots: false,
  title: '',
};

export const FOLDER_WRAPPER = 'folder-wrapper';

const SelectedFolder: FC<SelectedFolderProps> = ({
  setConfirmModal,
  actionModal,
  actionTEAMModal,
  setConfirmTEAMModal,
  testId = '',
  userActions,
  teamActions,
}) => {
  const { css, matchMedia } = useStyle();
  const mediumScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const ref = useRef<HTMLDivElement | null>();
  const navigate = useNavigate();
  const [selectedFolder, setSelectedFolder] = useState<NoteData>(initialState);

  const [searchParams, setSearchParams] = useSearchParams();

  const { archiveMode, foldersWithNotes } = useNotesContainer();

  useEffect(() => {
    if (searchParams.get('folder')) {
      setSelectedFolder(() => foldersWithNotes.filter((note) => note.id === searchParams.get('folder'))[0]);
    }
  });

  useSearch(setSelectedFolder, setSearchParams);

  const isUserArchived = archiveMode.user;

  const btnActionsData = [
    {
      ...(!archiveMode.user && {
        buttonID: '1',
        elID: 'backdrop',
        testID: 'backdrop-archive',
        currentAction: 'archive',
        button: {
          graphic: 'archive',
          title: 'Archive',
          testID: 'backdrop-archive-icon',
          translateID: 'archive_note',
          text: 'Archive note',
        },
      }),
    },
    {
      ...(!archiveMode.user && {
        buttonID: '2',
        elID: 'backdrop',
        testID: 'backdrop-folder',
        currentAction: 'move',
        button: {
          graphic: 'folder',
          title: 'Move to folder',
          testID: 'backdrop-folder-icon',
          translateID: 'move_to_folder',
          text: 'Move to folder',
        },
      }),
    },
    {
      buttonID: '3',
      elID: 'backdrop',
      testID: 'backdrop-delete',
      currentAction: 'delete',
      button: {
        graphic: 'delete',
        title: 'Delete',
        testID: 'backdrop-delete-icon',
        translateID: 'delete_note',
        text: 'Delete note',
      },
    },
  ];

  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    const element = event?.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      setSelectedFolder((prev) => ({ ...prev, notes: prev?.notes.map((item) => ({ ...item, selected: false })) }));
    }
  };

  useEventListener('mousedown', handleClickOutside);

  const buttonsHandler = (itemId: string, itemFolderUuid: string | null, item: any) => {
    const btnsActions = btnActionsData.map((el, idx) => {
      if (!Object.keys(el).length) return;
      return {
        id: el.buttonID,
        button: (
          <div
            className={css(idx === btnActionsData.length - 1 ? Align_flex_styleLast : Align_flex_style)}
            id={el.elID}
            data-test-id={el.testID}
            onClick={() => {
              if (!item.referenceColleagueUuid) {
                userActions.noteId = itemId;
                // @ts-ignore
                actionModal.current = el.currentAction;
                setConfirmModal(() => true);
                if (idx === 1) {
                  teamActions.folderUuid = itemFolderUuid;
                  userActions.folderUuid = itemFolderUuid;
                }
              } else {
                teamActions.noteId = itemId;
                // @ts-ignore
                actionTEAMModal.current = el.currentAction;
                setConfirmTEAMModal(() => true);
                if (idx === 1) {
                  teamActions.folderUuid = itemFolderUuid;
                  userActions.folderUuid = itemFolderUuid;
                }
              }
            }}
          >
            <IconButton
              iconProps={{ title: el?.button?.title }}
              id={el?.button?.testID}
              customVariantRules={{ default: notePropertiesIconStyle }}
              // @ts-ignore
              graphic={el.button.graphic}
              data-test-id={el?.button?.testID}
              onPress={() => {
                if (!item.referenceColleagueUuid) {
                  userActions.noteId = itemId;
                  // @ts-ignore
                  actionModal.current = el.currentAction;
                  setConfirmModal(() => true);
                  if (idx === 1) {
                    teamActions.folderUuid = itemFolderUuid;
                    userActions.folderUuid = itemFolderUuid;
                  }
                } else {
                  teamActions.noteId = itemId;
                  // @ts-ignore
                  actionTEAMModal.current = el.currentAction;
                  setConfirmTEAMModal(() => true);
                  if (idx === 1) {
                    teamActions.folderUuid = itemFolderUuid;
                    userActions.folderUuid = itemFolderUuid;
                  }
                }
              }}
            />
            <span className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })} id={el.elID}>
              <Trans i18nKey={el?.button?.translateID}>{el?.button?.text}</Trans>
            </span>
          </div>
        ),
      };
    });

    return (
      //@ts-ignore
      <div ref={ref} className={css(modalButtonsStyle({ isUserArchived }))} data-test-id='button-dots'>
        {btnsActions.map((item) => (
          <div key={item?.id}>{item?.button}</div>
        ))}
      </div>
    );
  };

  const selectedNoteHandler = (noteId) => {
    setSelectedFolder((prev) => {
      const arr = { ...prev };
      arr.notes[arr.notes.findIndex((item) => item.id === noteId)].selected = true;
      return arr;
    });
  };

  const setSelectedNoteHandler = (e: MouseEvent<HTMLDivElement>, item: any) => {
    if (
      isUserArchived ||
      (e.target as HTMLElement).parentElement?.id === 'backdrop' ||
      (e.target as HTMLElement).id === 'backdrop'
    )
      return;
    if (item.referenceColleagueUuid) {
      navigate(buildPath(paramsReplacer(Page.TEAM_NOTE, { ':uuid': item.id })));
    } else {
      navigate(buildPath(paramsReplacer(Page.PERSONAL_NOTE, { ':uuid': item.id })));
    }
  };

  const foldersList = useSelector(getFoldersSelector) || [];

  const isActive = (!searchParams.get('folder') || !selectedFolder?.notes?.length) && !selectedFolder?.isInSearch;

  if (isActive) return null;

  return (
    <div className={css(expandedNoteStyle({ mediumScreen }))} data-test-id={FOLDER_WRAPPER}>
      <div className={css(flexBetweenStyle)}>
        <span className={css(folderTitleStyled)}>{selectedFolder?.title}</span>
      </div>
      <div className={css({ marginTop: '32px', display: 'flex', flexDirection: 'column' })} data-test-id={testId}>
        {selectedFolder?.notes?.map((item) => (
          <div
            className={css(flexBetweenStyle, noteContainerStyle, { position: 'relative' })}
            key={item.id}
            data-test-id='note'
            onClick={(e) => setSelectedNoteHandler(e, item)}
          >
            <span className={css(noteTitleStyle)}>
              {item.title}
              {selectedFolder?.isInSearch && (
                //@ts-ignore
                <div className={css(noteFolderTitleStyle)}>{getNotesFolderTitle(item?.folderUuid, foldersList)}</div>
              )}
            </span>
            <div className={css(FlexStyle)}>
              <span className={css(timeStyled)}>{formatToRelativeDate(item?.updateTime)}</span>
              <div
                className={css(dotsStyle)}
                data-test-id='dots'
                onClick={() => selectedNoteHandler(item.id)}
                id='backdrop'
              >
                <span />
                <span />
                <span />
              </div>
            </div>
            {item.selected && buttonsHandler(item.id, item.folderUuid, item)}
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
const dotsStyle: Rule = {
  display: 'flex',
  marginLeft: '30px',
  padding: '10px 0px 10px 10px',
  cursor: 'pointer',
  '& span': {
    height: '6px',
    width: '6px',
    background: theme.colors.link,
    marginLeft: '4px',
    borderRadius: '50%',
  },
} as Styles;

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
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f20.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  color: theme.colors.base,
};

const flexBetweenStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const noteTitleStyle: Rule = {
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  color: theme.colors.link,
};

const noteFolderTitleStyle: Rule = {
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  color: theme.colors.base,
  fontWeight: `${theme.font.weight.regular}`,
  marginTop: '5px',
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
    background: theme.colors.backgroundDarkest,
    left: '0px',
    bottom: '0px',
  },
} as Styles;

const timeStyled: Rule = {
  fontWeight: 'normal',
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  textAlign: 'right',
  color: theme.colors.base,
};

const notePropertiesIconStyle: Rule = {
  display: 'block',
  height: '24px',
};

export default SelectedFolder;
