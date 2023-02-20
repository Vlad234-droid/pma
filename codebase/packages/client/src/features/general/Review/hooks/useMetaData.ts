import { useSelector } from 'react-redux';
import {
  currentUserSelector,
  getColleagueMetaSelector,
  reviewsMetaSelector,
  schemaMetaSelector,
  timelinesMetaSelector,
} from '@pma/store';

export const useMetaData = () => {
  const { loaded: colleagueLoaded } = useSelector(getColleagueMetaSelector);
  const { loading: reviewLoading, loaded: reviewLoaded, saving, saved } = useSelector(reviewsMetaSelector);
  const { loading: schemaLoading, loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loading: timelineLoading } = useSelector(timelinesMetaSelector) || {};
  const { info } = useSelector(currentUserSelector);

  return {
    colleagueLoaded,
    reviewLoading,
    reviewLoaded,
    saving,
    saved,
    schemaLoading,
    schemaLoaded,
    timelineLoading,
    info,
  };
};
