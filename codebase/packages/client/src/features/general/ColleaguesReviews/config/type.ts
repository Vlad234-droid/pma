import { ReviewType } from 'config/enum';
import { Props as ColleagueInfo } from 'components/ColleagueInfo/ColleagueInfo';

const _limit = 10;
const _start = 0;

export const initialFields: Record<'_start' | '_limit', number> = {
  _start,
  _limit,
};

export const defaultSort = { _sort: 'first-name:asc,last-name:asc' };

export type Info = Omit<ColleagueInfo, 'manager'> & { uuid: string };

export type ReviewStatistics = {
  type: ReviewType;
  statistics: Record<
    string,
    {
      count: number;
      percentage: number;
      title: string;
    }
  >;
  totalCount: number;
};

export type ReportPageTitle =
  | 'approved'
  | 'not-submitted'
  | 'submitted'
  | 'New to business'
  | 'Below expected'
  | 'Great'
  | 'Outstanding'
  | 'Satisfactory'
  | 'new-to-business'
  | 'given'
  | 'requested';

export type ReportPageEmptyData = {
  [K in ReportPageTitle]?: [];
};

export type List = Record<string, Array<Info> | []>;
