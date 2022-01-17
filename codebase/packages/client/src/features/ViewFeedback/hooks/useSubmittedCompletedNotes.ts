import { useSelector } from 'react-redux';
import { getPropperNotesByCriteria } from '@pma/store';

const identity = (item) => item;

function useSubmittedCompletedNotes({ status, sortFn, filterFn = identity, serializer = identity }) {
  const submittedCompletedNotes =
    useSelector(
      getPropperNotesByCriteria({
        status,
        filterFn,
        sortFn,
        serializer,
      }),
    ) || [];

  return submittedCompletedNotes;
}

export default useSubmittedCompletedNotes;
