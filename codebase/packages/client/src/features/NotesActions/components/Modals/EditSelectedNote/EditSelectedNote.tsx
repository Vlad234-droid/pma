import React, { FC, useEffect, useState } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { GenericItemField } from 'components/GenericForm';
import { Input, Item, Select, Textarea } from 'components/Form';
import { colleagueUUIDSelector, NotesActions } from '@pma/store';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'components/Translation';
import { IconButton } from 'components/IconButton';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import { SuccessModal } from './index';
import { ConfirmModal } from 'features/Modal';
import { ButtonsWrapper } from 'components/ButtonsWrapper';

import { Option } from 'components/Form/types';
import { EditSelectedNoteProps } from './type';
import { getEditedNote } from 'utils/note';

export const MODAL_WRAPPER = 'modal-wrapper';

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
  const { css } = useStyle();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [successSelectedNoteToEdit, setSuccessSelectedNoteToEdit] = useState(false);
  const { t } = useTranslation();

  const {
    formState: { isValid },
    setValue,
  } = methods;

  useEffect(() => {
    setValue('noteTitle', selectedNoteToEdit.title, { shouldValidate: true });
    setValue('noteText', selectedNoteToEdit.content, { shouldValidate: true });
  }, []);

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
    <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={MODAL_WRAPPER}>
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
                />
              );
            }
            // TODO: Extract duplicate 6
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
        <ButtonsWrapper
          isValid={isValid}
          onLeftPress={cancelSelectedNoteModal}
          onRightPress={() => {
            submitForm();
            setSuccessSelectedNoteToEdit(() => true);
          }}
        />
      </form>
      <ArrowLeftIcon
        onClick={() => {
          setSuccessSelectedNoteToEdit(() => false);
          setSelectedNoteToEdit(() => null);
        }}
      />
    </div>
  );
};

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

export default EditSelectedNote;
