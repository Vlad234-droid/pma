import { useState, useCallback } from 'react';
import { SearchOption } from 'config/enum';
import { ColleagueSimpleExtended } from '../types';

const useSearchColleaguesSimple = (colleagues: ColleagueSimpleExtended[]) => {
  const [localColleagues, setLocalColleagues] = useState<ColleagueSimpleExtended[]>([]);
  const clearColleagueList = () => setLocalColleagues([]);

  const handleSearchColleagues = useCallback(
    (value: string, searchOption = SearchOption.NAME) => {
      if (value === '' || value.length < 2) {
        clearColleagueList();
        return;
      }

      const result = colleagues.filter((obj) =>
        Object.values(obj).some((val) => {
          return val.toLowerCase().includes(value.toLowerCase());
        }),
      );

      setLocalColleagues(result);
    },
    [JSON.stringify(colleagues)],
  );

  return {
    handleSearchColleagues,
    colleagues: localColleagues,
    clearColleagueList,
  };
};

export default useSearchColleaguesSimple;
