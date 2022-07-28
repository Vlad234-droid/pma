import React, { FC, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, NotesActions } from '@pma/store';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'components/Translation';
import { IconButton } from 'components/IconButton';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import { ConfirmModal } from 'components/ConfirmModal';

export const MODAL_WRAPPER = 'modal-wrapper';
export const ARROW_LEFT = 'arrow-left';

type Note = {
  content: string;
  id: string;
  ownerColleagueUuid: string;
  status: string;
  title: string;
  updateTime: string;
};

type Props = {
  note: Note;
  onClose: () => void;
  onEdit: () => void;
};

const NoteDetail: FC<Props> = ({ note, onEdit, onClose }) => {
  const { css } = useStyle();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const { t } = useTranslation();

  const handleDeleteEditedNote = () => {
    setConfirmModal(() => false);
    dispatch(
      NotesActions.deleteNote({
        ownerColleagueUuid: colleagueUuid,
        noteId: note?.id,
      }),
    );
    onClose();
  };

  if (!note) return null;

  return (
    <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={MODAL_WRAPPER}>
      <div>
        <div className={css(headerInfoStyle)}>
          <h2 className={css(noteTitleStyle)}>{note.title}</h2>
          <div className={css(flexStyle)}>
            <IconButton graphic='edit' onPress={onEdit} />
            <IconButton
              graphic='delete'
              iconStyles={{ marginLeft: '20px' }}
              onPress={() => {
                setConfirmModal(() => true);
              }}
            />
          </div>
        </div>
        <p className={css(sizeStyle)}>{note.content}</p>
      </div>
      {confirmModal && (
        <ConfirmModal
          title={t('delete_this_note', 'Are you sure you want to delete this note?')}
          description={t('permanently_deleted', 'The note will be permanently deleted')}
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
      <ArrowLeftIcon onClick={onClose} testId={ARROW_LEFT} />
    </div>
  );
};

const WrapperModalGiveFeedbackStyle: Rule = {
  paddingLeft: '40px',
  paddingRight: '40px',
  height: '100%',
  overflow: 'auto',
};

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

const headerInfoStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default NoteDetail;
