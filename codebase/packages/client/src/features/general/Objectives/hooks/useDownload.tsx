import React, { useEffect, useMemo } from 'react';
import { downloadPDF, ObjectiveDocument, usePDF } from '@pma/pdf-renderer';

const useDownloadObjectives = (objectives) => {
  const document = useMemo(() => <ObjectiveDocument items={objectives} />, [JSON.stringify(objectives)]);
  const [instance, updateInstance] = usePDF({ document });

  useEffect(() => {
    if (objectives.length) {
      updateInstance();
    }
  }, [JSON.stringify(objectives)]);

  return () => downloadPDF(instance.url!, 'objectives.pdf');
};

export default useDownloadObjectives;
