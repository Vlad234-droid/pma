import { useSelector } from 'react-redux';
import { getPropperNotesByCriteria } from '@pma/store';

const identity = (item) => item;

function useSubmittedCompletedNotes({ status, sortFn, filterFn = identity, serializer = identity }) {
  return (
    useSelector(
      getPropperNotesByCriteria({
        status,
        filterFn,
        sortFn,
        serializer,
      }),
    ) || []
  );
}

export default useSubmittedCompletedNotes;
