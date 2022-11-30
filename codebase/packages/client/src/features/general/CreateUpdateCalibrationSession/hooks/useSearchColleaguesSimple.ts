import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getColleagueSimpleSelector, colleagueSimpleMetaSelector } from '@pma/store';
import { SearchOption } from 'config/enum';

const useSearchColleaguesSimple = (fields: Record<string, string> = {}) => {
  const [localColleagues, setLocalColleagues] = useState<any>([]);
  const { loaded } = useSelector(colleagueSimpleMetaSelector) || [];
  const colleagues = useSelector(getColleagueSimpleSelector) || [];

  const clearColleagueList = () => setLocalColleagues([]);

  const handleSearchColleagues = useCallback(
    (value: string, searchOption = SearchOption.NAME) => {
      if (value === '' || value.length < 3) {
        clearColleagueList();
        return;
      }

      const result = colleagues.filter((obj) =>
        Object.values(obj).some((val) => val.toLowerCase().includes(value.toLowerCase())),
      );

      setLocalColleagues(result);
    },
    [JSON.stringify(colleagues)],
  );

  return {
    loaded,
    handleSearchColleagues,
    colleagues: localColleagues,
    clearColleagueList,
  };
};

export default useSearchColleaguesSimple;
