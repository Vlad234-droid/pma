import { useDispatch, useSelector } from 'react-redux';
import { ColleaguesActions, getColleaguesSelector } from '@pma/store';
import { buildSearchColleaguesQuery, extendQuery } from 'utils';

const useSearchColleagues = (fields: Record<string, string> = {}) => {
  const dispatch = useDispatch();
  const colleagues = useSelector(getColleaguesSelector) || [];

  const clearColleagueList = () => dispatch(ColleaguesActions.clearColleagueList());

  const handleSearchColleagues = (value: string) => {
    if (value === '' || value.length <= 1) {
      clearColleagueList();
      return;
    }

    dispatch(ColleaguesActions.getColleagues(extendQuery(buildSearchColleaguesQuery(value), fields)));
  };

  return { handleSearchColleagues, clearColleagueList, colleagues };
};

export default useSearchColleagues;
