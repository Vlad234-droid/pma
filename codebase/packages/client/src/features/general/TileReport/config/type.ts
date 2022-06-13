type colleagueValue = string | null;

export type ColleagueProfile = {
  businessType: colleagueValue;
  firstName: colleagueValue;
  jobName: colleagueValue;
  lastName: colleagueValue;
  lineManager: colleagueValue;
  middleName: colleagueValue;
  uuid: string;
  tags: Record<string, string>;
};

export type ColleagueProfileProps = {
  colleague: ColleagueProfile;
};
type ChartDataType = Array<ColleagueProfileProps>;

export type TableChartData = {
  'Below expected': ChartDataType;
  Great: ChartDataType;
  Outstanding: ChartDataType;
  Satisfactory: ChartDataType;
};

export enum ReportTags {
  REPORT_SUBMITTED_OBJECTIVES = 'has_objective_submitted',
  REPORT_APPROVED_OBJECTIVES = 'has_objective_approved',
  REPORT_MID_YEAR_REVIEW = 'has_myr_submitted has_myr_approved',
  REPORT_END_YEAR_REVIEW = 'has_eyr_submitted has_eyr_approved',
  REPORT_WORK_LEVEL = 'REPORT_WORK_LEVEL',
  REPORT_FEEDBACK = 'has_feedback_requested has_feedback_given',
  REPORT_NEW_TO_BUSINESS = 'is_new_to_business',
  REPORT_MYR_BREAKDOWN = 'myr_overall_rating',
  REPORT_EYR_BREAKDOWN = 'eyr_overall_rating',
}
