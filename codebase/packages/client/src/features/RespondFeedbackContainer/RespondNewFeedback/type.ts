export type GiveFeedbackFormProps = {
  onSubmit: (data: any) => void;
  defaultValues: any;
  currentColleague?: any;
  goToInfo: (data: any) => void;
  //TODO remove in the future
  feedbackFields: Array<any>;
};
