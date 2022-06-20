import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, NotesActions } from '@pma/store';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'components/Translation';
import { IconButton } from 'components/IconButton';
import { ArrowLeftIcon } from 'components/ArrowLeftIcon';
import { ConfirmModal } from 'features/general/Modal';
import { buildPath } from 'features/general/Routes';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';

export const MODAL_WRAPPER = 'modal-wrapper';

type Props = {
  selectedNoteToEdit: any;
  type: 'TEAM_NOTE' | 'PERSONAL_NOTE';
  onClose: () => void;
};

const NoteDetail: FC<Props> = ({ selectedNoteToEdit, type, onClose }) => {
  const { css } = useStyle();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getPropperInfoData = () => {
    return {
      title: t('delete_this_note', 'Are you sure you want to delete this note?'),
      description: t('permanently_deleted', 'The note will be permanently deleted'),
    };
  };

  const handleDeleteEditedNote = () => {
    setConfirmModal(() => false);
    dispatch(
      NotesActions.deleteNote({
        ownerColleagueUuid: colleagueUuid,
        noteId: selectedNoteToEdit.id,
      }),
    );
  };

  const handleEditNote = () => navigate(buildPath(paramsReplacer(Page[type], { ':uuid': selectedNoteToEdit.id })));

  return (
    <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={MODAL_WRAPPER}>
      <div>
        <div className={css(headerInfoStyle)}>
          <h2 className={css(noteTitleStyle)}>{selectedNoteToEdit.title}</h2>
          <div className={css(flexStyle)}>
            <IconButton graphic='edit' onPress={handleEditNote} />
            <IconButton
              graphic='delete'
              iconStyles={{ marginLeft: '20px' }}
              onPress={() => {
                setConfirmModal(() => true);
              }}
            />
          </div>
        </div>
        <p className={css(sizeStyle)}>{selectedNoteToEdit.content}</p>
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
      <ArrowLeftIcon onClick={onClose} />
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
