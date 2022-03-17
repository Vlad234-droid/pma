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

export enum ObjectiveType {
  APPROVED = 'APPROVED',
  SUBMITTED = 'SUBMITTED',
}

export enum ReportType {
  HAS_OBJECTIVE_SUBMITTED = 'has_objective_submitted',
  HAS_OBJECTIVE_APPROVED = 'has_objective_approved',
}
