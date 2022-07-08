import { ReportActions } from '@pma/store';
import { metaStatuses, listOfStatuses } from 'features/general/Report/config';
import { ReportPage } from 'config/enum';

export const getData = (dispatch, query, type) => {
  dispatch(
    ReportActions.getObjectivesStatistics({
      year: query.year,
      topics_in: [...metaStatuses],
    }),
  );
  if (type === ReportPage.REPORT_FEEDBACK) {
    dispatch(
      ReportActions.getTargetingFeedbacks({
        year: query.year,
      }),
    );
  } else {
    dispatch(
      ReportActions.getTargetingColleagues({
        year: query.year,
      }),
    );
  }

  dispatch(
    ReportActions.getObjectivesReport({
      year: query.year,
      statuses_in: [...listOfStatuses],
    }),
  );
};
