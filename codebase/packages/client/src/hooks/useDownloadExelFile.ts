import { useState } from 'react';
import { useToast, Variant } from 'features/general/Toast';
import { downloadFile, createFile } from 'utils';

const useDownloadExelFile = ({
  resource,
  fileName,
  ext = 'xlsx',
  errorMassage,
}: {
  resource: { url: string; params?: any };
  fileName: string;
  ext?: string;
  errorMassage: {
    title: string;
    description: string;
  };
}) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const success = createFile(`${fileName}.${ext}`);
  const failure = () => {
    addToast({
      id: Date.now().toString(),
      variant: Variant.ERROR,
      ...errorMassage,
    });
  };

  const onLoaded = () => setLoading(() => false);

  return {
    loading,
    download: function (params = {}) {
      setLoading(() => true);
      return downloadFile({ ...resource, params: resource.params || params }, success, onLoaded, failure);
    },
  };
};

export default useDownloadExelFile;
