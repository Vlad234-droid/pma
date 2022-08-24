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

export type GiveFeedbackFormProps = {
  onSubmit: (data: any) => void;
  defaultValues: any;
  currentColleague?: any;
  goToInfo: (data: any) => void;
  //TODO: remove in the future
  feedbackFields: Array<any>;
};
