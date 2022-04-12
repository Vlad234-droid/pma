import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { buildPath } from 'features/Routes';
import TileReport from 'features/TileReport';
import { useTranslation } from 'components/Translation';
import { Page } from 'pages';

import useQueryString from 'hooks/useQueryString';
import { useHeaderContainer } from 'contexts/headerContext';
import { defineHeaderTitle, convertToReportEnum } from 'features/TileReport/utils';

const TileReportStatistics = () => {
  const { setLinkTitle } = useHeaderContainer();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const query = useQueryString() as Record<string, string>;
  const navigate = useNavigate();

  useEffect(() => {
    setLinkTitle(defineHeaderTitle(convertToReportEnum(pathname), t));
  }, []);

  useEffect(() => {
    if (!Object.entries(query).length || !query.year) navigate(buildPath(Page.REPORT));
  }, [query]);
  return <TileReport />;
};

export default TileReportStatistics;
