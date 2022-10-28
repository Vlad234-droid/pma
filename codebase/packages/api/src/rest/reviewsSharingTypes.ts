export type ShareColleagueReviewsParams = {
  colleagueUuid: string;
  cycleUuid: string;
  code: string;
};

export type GetAllSharedColleagueReviewsParams = Omit<ShareColleagueReviewsParams, 'cycleUuid'>;
