import { useState, useEffect } from 'react';
import { CalibrationColleague } from '@pma/openapi';
import { default as api } from '@pma/api';

const useColleaguesSimple = (query: Record<string, string> = {}) => {
  const [colleagues, setColleagues] = useState<CalibrationColleague[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setLoaded(false);
    api
      .getCalibrationColleagues(query)
      .then(({ data }) => {
        setColleagues(data);
        setLoaded(true);
        setLoading(false);
      })
      .catch((reason) => setError(reason));
  }, [JSON.stringify(query)]);

  return { loading, loaded, error, colleagues };
};

export default useColleaguesSimple;
