import React, { FC, useState } from 'react';
import { useStyle, useBreakpoints, Button, Styles, Rule, CreateRule, Theme } from '@dex-ddl/core';
import { GenericItemField } from 'components/GenericForm';
import { Item, Input, Select, Textarea } from 'components/Form';
import { EditSelectedNoteProps } from './type';
import { Trans } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import { Icon as IconComponent } from 'components/Icon';
import { SuccessModal } from './index';
import { definePropperFieldTeamOptions, definePropperFieldOptions } from '../../../../../utils';
import { ConfirmModal } from 'features/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { NotesActions, colleagueUUIDSelector } from '@pma/store';

const EditSelectedNote: FC<EditSelectedNoteProps> = ({
  foldersWithNotes,
  methods,
  cancelSelectedNoteModal,
  submitForm,
  setSelectedNoteToEdit,
  selectedNoteToEdit,
  setSelectedFolder,
  definePropperEditMode,
  setSelectedFolderDynamic,
}) => {
  const { css, theme } = useStyle();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [successSelectedNoteToEdit, setSuccessSelectedNoteToEdit] = useState(false);

  const {
    formState: { isValid },
    trigger,
  } = methods;

  const notes: any = [
    {
      field_id: '1',
      field_type: 'input',
      field_title: 'Title',
      field_placeholder: 'Enter a title for your note',
    },
    {
      field_id: '2',
      field_type: 'textarea',
      field_title: 'Note',
      field_placeholder: 'Write your note here',
    },
    {
      field_id: '3',
      field_type: 'select',
      field_title: 'Folder (optional)',
      field_placeholder: 'Select a folder',

      field_options:
        definePropperEditMode !== null
          ? definePropperFieldOptions(foldersWithNotes, selectedNoteToEdit.folderUuid)
          : definePropperFieldTeamOptions(foldersWithNotes, selectedNoteToEdit.folderUuid),
    },
  ];

  const getPropperInfoData = () => {
    return {
      title: `Are you sure you want to delete this note?`,
      description: `The note will be permanently deleted`,
    };
  };

  const handleDeleteEditedNote = () => {
    setSelectedFolderDynamic(() => null);
    setSelectedFolder(() => null);
    setConfirmModal(() => false);
    dispatch(
      NotesActions.deleteNote({
        ownerColleagueUuid: colleagueUuid,
        noteId: selectedNoteToEdit.id,
      }),
    );
    setSelectedNoteToEdit(() => null);
  };

  if (successSelectedNoteToEdit) {
    return (
      <SuccessModal
        setSuccessSelectedNoteToEdit={setSuccessSelectedNoteToEdit}
        setSelectedNoteToEdit={setSelectedNoteToEdit}
        setSelectedFolder={setSelectedFolder}
        methods={methods}
      />
    );
  }

  return (
    <div className={css(WrapperModalGiveFeedbackStyle)}>
      <div>
        <div className={css(headerInfoStyle({ editMode }))}>
          {!editMode && <h2 className={css(noteTitleStyle)}>{selectedNoteToEdit.title}</h2>}
          <div className={css(flexStyle)}>
            <IconButton graphic='edit' onPress={() => setEditMode((prev) => !prev)} />
            {!editMode && (
              <IconButton
                graphic='delete'
                iconStyles={{ marginLeft: '20px' }}
                onPress={() => {
                  setConfirmModal(() => true);
                }}
              />
            )}
          </div>
        </div>
        {!editMode && <p className={css(sizeStyle)}>{selectedNoteToEdit.content}</p>}
      </div>
      {confirmModal && (
        <ConfirmModal
          title={getPropperInfoData().title}
          description={getPropperInfoData().description}
          onSave={() => {
            handleDeleteEditedNote();
          }}
          onCancel={() => {
            setConfirmModal(() => false);
          }}
          onOverlayClick={() => {
            setConfirmModal(() => false);
          }}
        />
      )}
      <form className={css(formStyle({ editMode }))}>
        {editMode &&
          notes.map((item) => {
            if (item.field_type === 'input') {
              return (
                <GenericItemField
                  key={item.field_id}
                  name={`noteTitle`}
                  methods={methods}
                  label={item.field_title}
                  Wrapper={Item}
                  Element={Input}
                  placeholder={item.field_placeholder}
                  value={selectedNoteToEdit.title}
                  onChange={() => {
                    trigger('noteTitle');
                  }}
                />
              );
            }
            if (item.field_type === 'textarea') {
              return (
                <GenericItemField
                  key={item.field_id}
                  name={`noteText`}
                  methods={methods}
                  label={item.field_title}
                  Wrapper={Item}
                  Element={Textarea}
                  placeholder={item.field_placeholder}
                  value={selectedNoteToEdit.content}
                  onChange={() => {
                    trigger('noteText');
                  }}
                />
              );
            }
            if (item.field_type === 'select') {
              const { field_options } = item;
              return (
                <GenericItemField
                  key={item.field_id}
                  name={`folder`}
                  methods={methods}
                  label={item.field_title}
                  Wrapper={({ children }) => (
                    <Item withIcon={false} label={item.field_title}>
                      {children}
                    </Item>
                  )}
                  Element={Select}
                  options={field_options}
                  placeholder={item.field_placeholder}
                  onChange={(value) => {
                    if (!value) return;
                    trigger('folder');
                    // setSelectedNoteToEdit((prev: any) => {
                    //   return { ...prev, folderUuid: value };
                    // });
                  }}
                  value={
                    selectedNoteToEdit.folderUuid === null
                      ? 'All notes'
                      : foldersWithNotes[
                          foldersWithNotes.findIndex((item) => item.id === selectedNoteToEdit.folderUuid)
                        ]?.id ?? ''
                  }
                />
              );
            }
          })}

        <div
          className={css({
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
          })}
        >
          <div
            className={css({
              position: 'relative',
              bottom: theme.spacing.s0,
              left: theme.spacing.s0,
              right: theme.spacing.s0,
              borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
            })}
          >
            <div
              className={css({
                padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
                display: 'flex',
                justifyContent: 'center',
              })}
            >
              <Button
                styles={[
                  theme.font.fixed.f16,
                  {
                    fontWeight: theme.font.weight.bold,
                    width: '50%',
                    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                    background: theme.colors.white,
                    border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                    color: `${theme.colors.tescoBlue}`,
                  },
                ]}
                onPress={cancelSelectedNoteModal}
              >
                <Trans>Cancel</Trans>
              </Button>
              <IconButton
                onPress={() => {
                  submitForm();
                  setSuccessSelectedNoteToEdit(() => true);
                }}
                graphic='arrowRight'
                customVariantRules={{
                  default: submitButtonStyle({ isValid }),
                  disabled: submitButtonStyle({ isValid }),
                }}
                iconStyles={iconStyledRule}
                iconPosition={Position.RIGHT}
                isDisabled={!isValid}
              >
                Save
              </IconButton>
            </div>
          </div>
        </div>
      </form>
      <span
        className={css(backIconStyle({ theme, mobileScreen }))}
        onClick={() => {
          setSuccessSelectedNoteToEdit(() => false);
          setSelectedNoteToEdit(() => null);
        }}
      >
        <IconComponent graphic='arrowLeft' invertColors={true} />
      </span>
    </div>
  );
};

const backIconStyle: CreateRule<{ theme: Theme; mobileScreen: boolean }> = ({ theme, mobileScreen }) => ({
  position: 'fixed',
  top: theme.spacing.s5,
  left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
});

const WrapperModalGiveFeedbackStyle: Rule = {
  paddingLeft: '40px',
  paddingRight: '40px',
  height: '100%',
  overflow: 'auto',
};
const formStyle: CreateRule<{ editMode: boolean }> = ({ editMode }) => ({
  ...(!editMode && { marginTop: '40px' }),
});

const noteTitleStyle: Rule = {
  margin: '0px',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '28px',
};

const sizeStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};

const flexStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const headerInfoStyle: CreateRule<{ editMode: boolean }> = ({ editMode }) => ({
  display: 'flex',
  justifyContent: !editMode ? 'space-between' : 'flex-end',
  alignItems: 'center',
});

const iconStyledRule: Rule = {
  '& > path': {
    fill: 'white',
  },
} as Styles;

const submitButtonStyle: CreateRule<{ isValid: any }> =
  ({ isValid }) =>
  ({ theme }) => ({
    fontWeight: theme.font.weight.bold,
    width: '50%',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: `${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 20px',
    borderRadius: `${theme.spacing.s20}`,
    opacity: isValid ? '1' : '0.4',
    pointerEvents: isValid ? 'all' : 'none',
  });

export default EditSelectedNote;
