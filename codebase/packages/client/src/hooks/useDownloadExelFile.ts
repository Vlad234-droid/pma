import { useToast, Variant } from 'features/general/Toast';
import { downloadFile, createFile } from 'utils';

const useDownloadExelFile = ({
  resource,
  fileName,
  ext = 'xlsx',
  errorMassage,
}: {
  resource: { url: string; params: any };
  fileName: string;
  ext?: string;
  errorMassage: {
    title: string;
    description: string;
  };
}) => {
  const { addToast } = useToast();
  const success = createFile(`${fileName}.${ext}`);
  const failure = () => {
    addToast({
      id: Date.now().toString(),
      variant: Variant.ERROR,
      ...errorMassage,
    });
  };

  return () => downloadFile(resource, success, failure);
};

export default useDownloadExelFile;
