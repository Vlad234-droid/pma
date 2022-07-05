import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getNotesSelector } from '@pma/store';
import { useNotesContainer } from '../contexts';
import { filterNotesHandler } from 'utils';

export const useSearch = (setSelectedFolder, setSearchParams): void => {
  const notesSelect = useSelector(getNotesSelector) || [];
  const { searchValue, archiveMode, setArchiveMode } = useNotesContainer();
  useEffect(() => {
    if (searchValue.length > 2) {
      setSearchParams({});
      if (archiveMode.user) setArchiveMode((prev) => ({ ...prev, user: false }));
      if (archiveMode.team) setArchiveMode((prev) => ({ ...prev, team: false }));

      const obj = filterNotesHandler(notesSelect, searchValue);
      setSelectedFolder(obj);
    }
  }, [searchValue]);
};
