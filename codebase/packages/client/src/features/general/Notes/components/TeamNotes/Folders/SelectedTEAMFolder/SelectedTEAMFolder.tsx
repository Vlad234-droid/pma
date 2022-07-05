import React, { FC, Dispatch, SetStateAction, MutableRefObject, MouseEvent, useRef, useEffect, useState } from 'react';
import { Rule, Styles, useStyle, colors, CreateRule } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { IconButton } from 'components/IconButton';
import { formatToRelativeDate } from 'utils/date';
import { useNotesContainer } from '../../../../contexts';
import useEventListener from 'hooks/useEventListener';
import { buildPath } from 'features/general/Routes';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';
import { NoteTeamData } from '../../../../configs';

export const TEAM_WRAPPER = 'team-wrapper';

const initialState: NoteTeamData = {
  id: '',
  notes: [],
  ownerColleagueUuid: '',
  quantity: 0,
  selectedDots: false,
  title: '',
  referenceColleagueUuid: '',
};

type Props = {
  setConfirmTEAMModal: Dispatch<SetStateAction<boolean>>;
  actionTEAMModal: MutableRefObject<null | string>;
  teamActions: Record<string, string | null>;
};
const SelectedFolder: FC<Props> = ({ setConfirmTEAMModal, actionTEAMModal, teamActions }) => {
  const { css, matchMedia } = useStyle();
  const mediumScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const ref = useRef<HTMLDivElement | null>();
  const navigate = useNavigate();
  const [selectedFolder, setSelectedFolder] = useState<NoteTeamData>(initialState);

  const [searchParams] = useSearchParams();

  const { archiveMode, foldersWithNotesTEAM } = useNotesContainer();

  useEffect(() => {
    if (searchParams.get('folder')) {
      setSelectedFolder(() => foldersWithNotesTEAM.filter((note) => note.id === searchParams.get('folder'))[0]);
    }
  });

  const teamArchivedMode = archiveMode.team;

  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    const element = event?.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      setSelectedFolder((prev) => ({ ...prev, notes: prev?.notes.map((item) => ({ ...item, selected: false })) }));
    }
  };

  useEventListener('mousedown', handleClickOutside);

  const btnsActionsHandler = (itemId: string, itemFolderUuid: string | null): JSX.Element => {
    const btnsActions = [
      {
        ...(!teamArchivedMode && {
          id: '1',
          button: (
            <div
              className={css(Align_flex_style)}
              id='backdrop'
              data-test-id='backdrop-archive'
              onClick={() => {
                teamActions.noteId = itemId;
                actionTEAMModal.current = 'archive';
                setConfirmTEAMModal(() => true);
              }}
            >
              <IconButton
                iconProps={{ title: 'Archive' }}
                id='backdrop'
                graphic='archive'
                data-test-id='backdrop-archive-icon'
                onPress={() => {
                  teamActions.noteId = itemId;
                  actionTEAMModal.current = 'archive';
                  setConfirmTEAMModal(() => true);
                }}
              />
              <span className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })} id='backdrop'>
                Archive note
              </span>
            </div>
          ),
        }),
      },
      {
        ...(!teamArchivedMode && {
          id: '2',
          button: (
            <div
              id='backdrop'
              className={css(Align_flex_style)}
              data-test-id='backdrop-folder'
              onClick={() => {
                teamActions.noteId = itemId;
                teamActions.folderUuid = itemFolderUuid;
                actionTEAMModal.current = 'move';
                setConfirmTEAMModal(() => true);
              }}
            >
              <IconButton
                iconProps={{ title: 'Move to folder' }}
                graphic='folder'
                id='backdrop'
                data-test-id='backdrop-folder-icon'
                onPress={() => {
                  teamActions.noteId = itemId;
                  teamActions.folderUuid = itemFolderUuid;
                  actionTEAMModal.current = 'move';
                  setConfirmTEAMModal(() => true);
                }}
              />
              <span className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })} id='backdrop'>
                Move to folder
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
              teamActions.noteId = itemId;
              actionTEAMModal.current = 'delete';
              setConfirmTEAMModal(() => true);
            }}
          >
            <IconButton
              iconProps={{ title: 'Delete' }}
              graphic='delete'
              id='backdrop'
              data-test-id='backdrop-delete-icon'
              onPress={() => {
                teamActions.noteId = itemId;
                actionTEAMModal.current = 'delete';
                setConfirmTEAMModal(() => true);
              }}
            />
            <span className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })} id='backdrop'>
              Delete note
            </span>
          </div>
        ),
      },
    ];

    return (
      //@ts-ignore
      <div ref={ref} className={css(Modal_buttons_style({ teamArchivedMode }))} data-test-id='button-dots'>
        {btnsActions.map((item) => (
          <div key={item.id} className={css({})}>
            {item.button}
          </div>
        ))}
      </div>
    );
  };

  const selectedNoteActionhandler = (noteId) => {
    setSelectedFolder((prev) => {
      const arr = { ...prev };

      arr.notes[arr.notes.findIndex((item) => item.id === noteId)].selected = true;

      return arr;
    });
  };

  const setSelectedNoteHandler = (e, item) => {
    if (e.target.parentElement.id === 'backdrop' || e.target.id === 'backdrop') return;
    navigate(buildPath(paramsReplacer(Page.TEAM_NOTE, { ':uuid': item.id })));
  };

  const isActive = !searchParams.get('folder') || !selectedFolder?.notes?.length;

  if (isActive) return null;

  return (
    <div className={css(Expanded_Note_Style({ mediumScreen }))} data-test-id={TEAM_WRAPPER}>
      <div className={css(flex_between_style)}>
        <span className={css(Folder_Title_styled)}>{selectedFolder?.title}</span>
      </div>
      <div className={css({ marginTop: '32px', display: 'flex', flexDirection: 'column' })}>
        {selectedFolder?.notes?.map((item) => (
          <div
            className={css(flex_between_style, Note_container_style, { position: 'relative' })}
            key={item.id}
            onClick={(e) => setSelectedNoteHandler(e, item)}
          >
            <span className={css(noteTitle_style)}>{item.title}</span>
            <div className={css(Flex_style)}>
              <span className={css(Time_Styled)}>{formatToRelativeDate(item?.updateTime)}</span>
              <div
                className={css(dots_style)}
                data-test-id='dots'
                onClick={() => selectedNoteActionhandler(item.id)}
                id='backdrop'
              >
                <span />
                <span />
                <span />
              </div>
            </div>
            {item.selected && btnsActionsHandler(item.id, item.folderUuid)}
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

const Modal_buttons_style: CreateRule<{ teamArchivedMode: boolean }> = ({ teamArchivedMode }) =>
  ({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    right: '-30px',
    bottom: !teamArchivedMode ? '-174px' : '-56px',
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

const dots_style: Rule = ({ colors }) =>
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

const Flex_style: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Expanded_Note_Style: CreateRule<{ mediumScreen: boolean }> =
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

const Folder_Title_styled: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f20.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  color: theme.colors.base,
});

const flex_between_style: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const noteTitle_style: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  color: theme.colors.tescoBlue,
});

const Note_container_style: Rule = {
  height: '46px',
  position: 'relative',
  cursor: 'pointer',
  '&:before': {
    content: '""',
    position: 'absolute',
    height: '2px',
    width: '100%',
    background: '#E5E5E5',
    left: '0px',
    bottom: '0px',
  },
} as Styles;

const Time_Styled: Rule = {
  fontWeight: 'normal',
  fontSize: '18px',
  lineHeight: '22px',
  textAlign: 'right',
  color: '#333333',
};

export default SelectedFolder;
