import { ReportPage, ReviewType } from 'config/enum';
import { Props as ColleagueInfo } from 'components/ColleagueInfo/ColleagueInfo';

const _limit = 10;
const _start = 0;

export const initialFields: Record<'_start' | '_limit', number> = {
  _start,
  _limit,
};

type Info = Omit<ColleagueInfo, 'manager'> & { uuid: string };

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

export type List = Record<string, Array<Info>>;

export type ReviewsListProps = {
  type: ReportPage;
  list: List;
  reviews: ReviewStatistics;
};
