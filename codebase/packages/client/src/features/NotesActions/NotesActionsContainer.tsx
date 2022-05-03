import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getNotesMetaSelector } from '@pma/store';

import NotesActions from './NotesActions';
import { NotesProvider } from './contexts/notesContext';

const NotesActionsContainer: FC = () => {
  const { loaded } = useSelector(getNotesMetaSelector);

  return (
    <NotesProvider>
      <NotesActions loaded={loaded} />
    </NotesProvider>
  );
};

export default NotesActionsContainer;
