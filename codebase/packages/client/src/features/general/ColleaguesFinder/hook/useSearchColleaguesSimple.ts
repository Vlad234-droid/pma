import { useDispatch, useSelector } from 'react-redux';
import { ColleagueSimpleAction, getColleagueSimpleSelector } from '@pma/store';
import { buildSearchColleaguesQuery, extendQuery } from 'utils';
import { SearchOption } from 'config/enum';

const useSearchColleaguesSimple = (fields: Record<string, string> = {}, sessionUuid?: string) => {
  const dispatch = useDispatch();
  const colleagues = useSelector(getColleagueSimpleSelector) || [];

  const clearColleagueList = () => dispatch(ColleagueSimpleAction.clearColleagueSimple());

  const handleSearchColleagues = (value: string, searchOption = SearchOption.NAME) => {
    if (value === '' || value.length < 3) {
      clearColleagueList();
      return;
    }
    dispatch(
      sessionUuid
        ? ColleagueSimpleAction.getSessionColleagueSimple({
            query: extendQuery(buildSearchColleaguesQuery(value, searchOption), fields),
            sessionId: sessionUuid,
          })
        : ColleagueSimpleAction.getColleagueSimple(
            extendQuery(buildSearchColleaguesQuery(value, searchOption), fields),
          ),
    );
  };

  return { handleSearchColleagues, clearColleagueList, colleagues };
};

export default useSearchColleaguesSimple;
