import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColleaguesActions, colleagueUUIDSelector, NotesActions as NotesActionsToDispatch } from '@pma/store';

export const useUploadData = () => {
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  useEffect(() => {
    return () => {
      dispatch(ColleaguesActions.clearColleagueList());
    };
  }, []);

  useEffect(() => {
    if (colleagueUuid) dispatch(NotesActionsToDispatch.getFoldersNotes({ ownerId: colleagueUuid }));
  }, [colleagueUuid]);
};
