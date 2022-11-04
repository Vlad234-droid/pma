import { useState, useEffect } from 'react';
import { httpClient } from '@pma/api';

const useOverallRating = (params) => {
  const [rating, setRating] = useState({ overall_rating: '' });

  useEffect(() => {
    if (params) httpClient(`/reports/overall-rating`, { params }).then(({ data }) => setRating(data));
  }, [params]);

  return rating;
};

export default useOverallRating;
