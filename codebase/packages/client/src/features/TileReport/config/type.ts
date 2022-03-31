type colleagueValue = string | null;

export type ColleagueProfileProps = {
  colleague: {
    businessType: colleagueValue;
    firstName: colleagueValue;
    jobName: colleagueValue;
    lastName: colleagueValue;
    lineManager: colleagueValue;
    middleName: colleagueValue;
    uuid: string;
    tags: Record<string, '1' | '0'>;
  };
};

export enum ReportPage {
  REPORT_SUBMITTED_OBJECTIVES = 'REPORT_SUBMITTED_OBJECTIVES',
  REPORT_APPROVED_OBJECTIVES = 'REPORT_APPROVED_OBJECTIVES',
  REPORT_MID_YEAR_REVIEW = 'REPORT_MID_YEAR_REVIEW',
  REPORT_END_YEAR_REVIEW = 'REPORT_END_YEAR_REVIEW',
  REPORT_WORK_LEVEL = 'REPORT_WORK_LEVEL',
  REPORT_FEEDBACK = 'REPORT_FEEDBACK',
}
export enum ReportTags {
  REPORT_SUBMITTED_OBJECTIVES = 'has_objective_submitted',
  REPORT_APPROVED_OBJECTIVES = 'has_objective_approved',
  REPORT_MID_YEAR_REVIEW = 'has_myr_submitted has_myr_approved',
  REPORT_END_YEAR_REVIEW = 'has_eyr_submitted has_eyr_approved',
  REPORT_WORK_LEVEL = 'REPORT_WORK_LEVEL',
  REPORT_FEEDBACK = 'has_feedback_requested has_feedback_given',
}