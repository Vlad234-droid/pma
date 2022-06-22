import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { personalNoteByUUIDSelector } from '@pma/store';
import NoteDetail from 'features/general/Notes/components/NoteDetail';
import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import { useUploadData } from './hooks/useUploadData';
import { paramsReplacer } from 'utils';

const PersonalNoteView = () => {
  const { t } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const note = useSelector(personalNoteByUUIDSelector(uuid as string));
  useUploadData();

  const handleBack = () => navigate(buildPath(Page.NOTES));
  const handleEditNote = () => navigate(buildPath(paramsReplacer(Page.PERSONAL_NOTE_CREATE, { ':uuid': note.id })));

  return (
    <WrapperModal title={t('my_notes', 'My notes')} onClose={handleBack}>
      <NoteDetail note={note} onEdit={handleEditNote} onClose={handleBack} />
    </WrapperModal>
  );
};

export default PersonalNoteView;
