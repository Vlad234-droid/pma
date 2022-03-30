import { ReportActions } from '@pma/store';
import { metaStatuses, listOfStatuses } from 'features/Report/config';

export const getData = (dispatch, query) => {
  dispatch(
    ReportActions.getObjectivesStatistics({
      year: query.year,
      topics_in: [...metaStatuses],
    }),
  );
  dispatch(
    ReportActions.getTargetingColleagues({
      year: query.year,
    }),
  );

  dispatch(
    ReportActions.getObjectivesReport({
      year: query.year,
      statuses_in: [...listOfStatuses],
    }),
  );
};
