import React, { FC, MouseEvent, useRef } from 'react';
import { Rule, useStyle, Button, Styles, CreateRule, Theme } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';
import { useTranslation } from 'components/Translation';

import { PersonalFoldersProps } from '../../../configs';
import { defineNotesHandler, AllNotesFolderId } from 'utils/note';
import { useNotesContainer } from '../../../contexts';
import useEventListener from 'hooks/useEventListener';

export const PERSONAL_FOLDER_WRAPPER = 'personal_folder_wrapper';
export const CHANGE_USER_MODE = 'change-user-mode';

const PersonalFolders: FC<PersonalFoldersProps> = ({ handleSelected, setConfirmModal, actionModal, userActions }) => {
  const { css, theme, matchMedia } = useStyle();
  const mediumScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement | null>();

  const {
    archiveMode,
    setSelectedTEAMFolder,
    selectedTEAMFolder,
    foldersWithNotes,
    setFoldersWithNotes,
    setSelectedFolder,
    setArchiveMode,
  } = useNotesContainer();

  const isUserArchived = archiveMode.user;

  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    const element = event?.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      setFoldersWithNotes((prev) => [...prev.map((item) => ({ ...item, selectedDots: false }))]);
    }
  };

  useEventListener('mousedown', handleClickOutside);

  const selectedDotsActionhandler = (e, noteId) => {
    if (e.target.id === 'dots' || e.target.parentElement.id === 'dots') {
      setFoldersWithNotes((prev) => {
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
    )
      return;
    if (selectedTEAMFolder !== null) setSelectedTEAMFolder(() => null);
    handleSelected(id);
  };

  const btnsActionsHandler = (itemId: string, notesLength: number) => {
    const btnsActions = [
      {
        ...(!isUserArchived && {
          id: '1',
          button: (
            <div
              className={css(alignFlexStyle)}
              id='backdrop'
              onClick={() => {
                userActions.folderId = itemId;
                actionModal.current = 'archive';
                setConfirmModal(() => true);
              }}
            >
              <IconButton
                graphic='archive'
                customVariantRules={{ default: folderPropertiesIconStyle }}
                onPress={() => {
                  userActions.folderId = itemId;
                  actionModal.current = 'archive';
                  setConfirmModal(() => true);
                }}
              />
              <span className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })}>
                {t('archive_folder', 'Archive folder')}
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
              userActions.folderId = itemId;
              actionModal.current = 'delete';
              setConfirmModal(() => true);
            }}
          >
            <IconButton
              iconProps={{ title: 'Delete' }}
              graphic='delete'
              customVariantRules={{ default: folderPropertiesIconStyle }}
              onPress={() => {
                userActions.folderId = itemId;
                actionModal.current = 'delete';
                setConfirmModal(() => true);
              }}
            />
            <span id='backdrop' className={css({ whiteSpace: 'nowrap', marginLeft: '8px' })}>
              {t('delete_folder', 'Delete folder')}
            </span>
          </div>
        ),
      },
    ];

    return (
      //@ts-ignore
      <div ref={ref} id='backdrop' className={css(dotsContainerStyle({ isUserArchived, notesLength, theme }))}>
        {btnsActions.map((item) => (
          <div key={item.id} id='backdrop'>
            {item.button}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={css(mainFolderContainerStyle({ mediumScreen }))} data-test-id={PERSONAL_FOLDER_WRAPPER}>
      <div className={css({ display: 'flex', justifyContent: 'space-between', height: '24px' })}>
        <h2 className={css(titleStyle)}>
          {!isUserArchived ? t('personal_folders', 'Personal Folders') : t('archived_folders', 'Archived Folders')}
        </h2>
      </div>
      <div className={css({ marginTop: '48px' })}>
        {foldersWithNotes?.map((item) => {
          const { selected } = item;

          return (
            <div
              data-test-id='folder-item'
              className={css({ position: 'relative' })}
              key={item.id}
              onClick={(e) => handleExpandFolder(e, item.id)}
            >
              <div className={css(itemListStyle({ selected }))}>
                <div className={css(marginFlex)}>
                  <span className={css(folderTitle)}>{item.title}</span>
                  <span className={css(quantityStyle)}>{defineNotesHandler(item.notes.length)}</span>
                </div>
                <div className={css({ display: 'flex', alignItems: 'center' })}>
                  {item.id !== AllNotesFolderId && (
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

                  {item.selectedDots && btnsActionsHandler(item.id, item.notes.length)}

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
          data-test-id={CHANGE_USER_MODE}
          onPress={() => {
            setArchiveMode((prev) => ({ ...prev, user: !prev.user }));
            setSelectedFolder(() => null);
          }}
        >
          {!isUserArchived ? t('archived_folders', 'Archived Folders') : t('personal_folders', 'Personal Folders')}
        </Button>
      </div>
    </div>
  );
};

const dotsContainerStyle: CreateRule<{ isUserArchived: boolean; notesLength: number; theme: Theme }> = ({
  isUserArchived,
  notesLength,
  theme,
}) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  right: '28px',
  bottom: !isUserArchived ? (notesLength ? '-101px' : '-110px') : !notesLength ? '-53px' : '-46px',
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

const folderPropertiesIconStyle: Rule = () => {
  return {
    display: 'block',
    height: '24px',
  };
};

export default PersonalFolders;
