import React, { useEffect } from 'react';
import TileReport from 'features/TileReport';
import useQueryString from 'hooks/useQueryString';
import { useNavigate } from 'react-router-dom';
import { Page } from 'pages';
import { buildPath } from 'features/Routes';

const TileReportStatistics = () => {
  const query = useQueryString() as Record<string, string>;
  const navigate = useNavigate();

  useEffect(() => {
    if (!Object.entries(query).length || !query.year) navigate(buildPath(Page.REPORT));
  }, [query]);
  return <TileReport />;
};

export default TileReportStatistics;
