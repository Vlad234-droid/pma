import { useState, useEffect } from 'react';
import { CalibrationColleague } from '@pma/openapi';
import { default as api } from '@pma/api';

const useColleaguesSimple = (query: Record<string, string> = {}, shouldBeUsed = true) => {
  const [colleagues, setColleagues] = useState<CalibrationColleague[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (shouldBeUsed) {
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
    } else {
      setColleagues([]);
      setLoaded(true);
      setLoading(false);
    }
  }, [JSON.stringify(query), shouldBeUsed]);

  return { loading, loaded, error, colleagues };
};

export default useColleaguesSimple;
