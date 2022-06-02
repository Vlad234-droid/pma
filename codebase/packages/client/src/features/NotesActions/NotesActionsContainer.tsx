import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getNotesMetaSelector } from '@pma/store';

import NotesActions from './NotesActions';
import { NotesProvider } from './contexts/notesContext';

const NotesActionsContainer: FC = () => {
  const { loading } = useSelector(getNotesMetaSelector);

  return (
    <NotesProvider>
      <NotesActions loading={loading} />
    </NotesProvider>
  );
};

export default NotesActionsContainer;
