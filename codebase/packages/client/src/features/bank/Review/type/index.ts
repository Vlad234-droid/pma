import { ReviewType } from 'config/enum';

export type ReviewFormType = {
  reviewType: ReviewType.MYR | ReviewType.EYR;
  onClose: () => void;
};

export type FileMetadata = {
  type?: Record<any, any>;
  path?: string;
  fileName: string;
  fileLength?: number;
  uuid?: string;
  status?: string;
  description?: string;
  fileDate?: string;
};
