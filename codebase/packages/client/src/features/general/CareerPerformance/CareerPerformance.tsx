import React, { FC } from 'react';

import { Trans } from 'components/Translation';
import { KnowledgeLibraryWidget } from 'features/general/KnowledgeLibrary';
import Spinner from 'components/Spinner';

import Section from './components/Section';
import { useSelector } from 'react-redux';
import { timelinesMetaSelector } from '@pma/store';

const CareerPerformance: FC = ({ children }) => {
  const { loaded } = useSelector(timelinesMetaSelector);

  if (!loaded) {
    return <Spinner fullHeight />;
  }

  return (
    <>
      {children}
      <Section title={<Trans i18nKey='useful_resources'>Useful resources</Trans>}>
        <KnowledgeLibraryWidget />
      </Section>
    </>
  );
};

export default CareerPerformance;
