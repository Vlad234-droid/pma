export type PeopleTypes = any;
export type ObjectiveOptionsType = {
  value: string;
  label: string;
  uuid: string;
};

export enum TargetType {
  GOAL = 'GOAL',
  OBJECTIVE = 'OBJECTIVE',
  VALUE_BEHAVIOR = 'VALUE_BEHAVIOR',
  OTHER = 'OTHER',
}
