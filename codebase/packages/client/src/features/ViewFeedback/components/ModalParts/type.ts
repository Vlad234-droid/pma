import { Dispatch, SetStateAction } from 'react';

export type ModalDownloadFeedbackProps = {
  setOpenMainModal: Dispatch<SetStateAction<boolean>>;
  ModalSuccess: boolean;
  setModalSuccess: Dispatch<SetStateAction<boolean>>;
  closeHandler: () => void;
  downloadTitle: string;
  downloadDescription: string;
};

export type PeopleTypes = any;

export type SuccessModalProps = {
  setModalSuccess: Dispatch<SetStateAction<boolean>>;
  setOpenMainModal: Dispatch<SetStateAction<boolean>>;
  setSelectedPerson: Dispatch<SetStateAction<PeopleTypes | null>>;
};
