import React, { FC, useState } from 'react';
import { useStyle, useBreakpoints, Button, Styles, Rule, CreateRule, Theme } from '@dex-ddl/core';
import { GenericItemField } from 'components/GenericForm';
import { Item, Input, Select, Textarea } from 'components/Form';
import { EditSelectedNoteProps } from './type';
import { Trans, useTranslation } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import { Icon as IconComponent } from 'components/Icon';
import { SuccessModal } from './index';
import { getEditedNote } from 'utils/note';
import { ConfirmModal } from 'features/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { NotesActions, colleagueUUIDSelector } from '@pma/store';
import { Option } from 'components/Form/types';

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
  const { t } = useTranslation();

  const {
    formState: { isValid },
    trigger,
    setValue,
  } = methods;

  const notes = getEditedNote(definePropperEditMode, foldersWithNotes, selectedNoteToEdit.folderUuid, t);

  const getPropperInfoData = () => {
    return {
      title: t('delete_this_note', 'Are you sure you want to delete this note?'),
      description: t('permanently_deleted', 'The note will be permanently deleted'),
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
            if (item.type === 'input') {
              return (
                <GenericItemField
                  key={item.id}
                  name={`noteTitle`}
                  methods={methods}
                  label={item.title}
                  Wrapper={Item}
                  Element={Input}
                  placeholder={item.placeholder}
                  value={selectedNoteToEdit.title}
                  onChange={() => {
                    trigger('noteTitle');
                  }}
                />
              );
            }
            if (item.type === 'textarea') {
              return (
                <GenericItemField
                  key={item.id}
                  name={`noteText`}
                  methods={methods}
                  label={item.title}
                  Wrapper={Item}
                  Element={Textarea}
                  placeholder={item.placeholder}
                  value={selectedNoteToEdit.content}
                  onChange={() => {
                    trigger('noteText');
                  }}
                />
              );
            }
            if (item.type === 'select') {
              const { field_options } = item;
              return (
                <Item withIcon={false} label={item.title} key={item.id}>
                  <Select
                    options={field_options as Option[]}
                    name={'targetType'}
                    placeholder={item.placeholder}
                    //@ts-ignore
                    onChange={({ target }) => {
                      const { value } = target;
                      setValue('folder', value, { shouldValidate: true });
                    }}
                  />
                </Item>
              );
            }
          })}

        <div className={css(btnPositionContainer)}>
          <div className={css(blockContainer({ theme }))}>
            <div
              className={css({
                padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
                display: 'flex',
                justifyContent: 'center',
              })}
            >
              <Button styles={[theme.font.fixed.f16, cancelBtnStyle({ theme })]} onPress={cancelSelectedNoteModal}>
                <Trans i18nKe='cancel'>Cancel</Trans>
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
                <Trans i18nKe='save'>Save</Trans>
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

const btnPositionContainer: Rule = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
};
const blockContainer: CreateRule<{ theme: Theme }> = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  borderTop: `${theme.border.width.b1} solid ${theme.colors.lightGray}`,
});
const cancelBtnStyle: CreateRule<{ theme: Theme }> = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '50%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

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
