import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColleaguesActions, getColleaguesSelector } from '@pma/store';
import { buildSearchColleaguesQuery } from 'utils';

export default () => {
  const dispatch = useDispatch();
  const colleagues = useSelector(getColleaguesSelector) || [];

  const clearColleagueList = () => dispatch(ColleaguesActions.clearColleagueList());

  const handleSearchColleagues = (value: string) => {
    if (value === '' || value.length <= 1) {
      clearColleagueList();
      return;
    }

    dispatch(ColleaguesActions.getColleagues(buildSearchColleaguesQuery(value)));
  };

  useEffect(() => {
    return () => {
      dispatch(ColleaguesActions.clearColleagueList());
    };
  }, []);

  return { handleSearchColleagues, clearColleagueList, colleagues };
};
