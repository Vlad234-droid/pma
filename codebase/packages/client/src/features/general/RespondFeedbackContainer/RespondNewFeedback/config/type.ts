export enum Statuses {
  PENDING = 'pending',
  SENDING = 'sending',
  INFO = 'info',
}

type Item = Record<string, string>;

export type HandleSaveType = {
  feedbackItems: Array<Item>;
  status: string;
  targetColleagueUuid: string;
};
