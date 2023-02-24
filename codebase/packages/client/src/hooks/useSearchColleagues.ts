import { useDispatch, useSelector } from 'react-redux';
import { ColleaguesActions, getColleaguesSelector } from '@pma/store';
import { buildSearchColleaguesQuery, extendQuery } from 'utils';
import { SearchOption } from 'config/enum';

const useSearchColleagues = (fields: Record<string, string | boolean> = {}) => {
  const dispatch = useDispatch();
  const colleagues = useSelector(getColleaguesSelector) || [];

  const clearColleagueList = () => dispatch(ColleaguesActions.clearColleagueList());

  const handleSearchColleagues = (value: string, searchOption = SearchOption.NAME) => {
    if (value === '' || value.length < 3) {
      clearColleagueList();
      return;
    }
    dispatch(ColleaguesActions.getColleagues(extendQuery(buildSearchColleaguesQuery(value, searchOption), fields)));
  };

  return { handleSearchColleagues, clearColleagueList, colleagues };
};

export default useSearchColleagues;
