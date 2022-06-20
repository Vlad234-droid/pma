import React, { FC } from 'react';
import Notes from 'features/general/Notes';
import { NotesProvider } from 'features/general/Notes/contexts/notesContext';

const NotesPage: FC = () => {
  return (
    <NotesProvider>
      <Notes />
    </NotesProvider>
  );
};

export default NotesPage;
