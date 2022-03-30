import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getNotesMetaSelector } from '@pma/store';

import NotesActions from './NotesActions';

const NotesActionsContainer: FC = () => {
  const { loaded } = useSelector(getNotesMetaSelector);

  return <NotesActions loaded={loaded} />;
};

export default NotesActionsContainer;
