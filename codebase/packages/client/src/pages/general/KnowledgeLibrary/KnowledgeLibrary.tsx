import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@pma/store';
import { buildPath } from 'features/general/Routes';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';

import { KnowledgeLibraryWrapper } from 'features/general/KnowledgeLibrary';

const KnowledgeLibrary: FC = () => {
  const { info, authenticated } = useSelector(currentUserSelector) || {};
  useEffect(() => {
    if (authenticated) {
      console.log(
        buildPath(
          paramsReplacer(`${Page.KNOWLEDGE_LIBRARY_BY_ID}`, {
            ':countryCode': info?.data?.colleague?.countryCode,
            ':id': '1',
          }),
        ),
      );
    }
  }, [info]);

  return <KnowledgeLibraryWrapper />;
};

export default KnowledgeLibrary;
