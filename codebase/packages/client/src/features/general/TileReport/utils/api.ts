import { ReportActions } from '@pma/store';
import { metaStatuses } from 'features/general/Report/config';
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
  // TODO: enabled when content of chart meets business requirements
  // dispatch(
  //   ReportActions.getObjectivesReport({
  //     year: query.year,
  //     statuses_in: [...listOfStatuses],
  //   }),
  // );
};
