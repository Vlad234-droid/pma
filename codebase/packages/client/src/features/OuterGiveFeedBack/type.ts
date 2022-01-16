import { Dispatch, SetStateAction, ReactElement } from 'react';
import { UseFormReturn } from 'react-hook-form';
export type ConfigProps = {
  id: number;
  action: string;
  text: string;
  icon: ReactElement;
  iconText: string;
  modalTitle?: string;
  link: string;
};

export type PeopleTypes = any;

export type TypefeedbackItems = {
  uuid: string;
  code: string;
  content: string;
  feedbackUuid: string;
};
export type ModalGiveFeedbackProps = {
  isOpenMainModal: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedPerson: Dispatch<SetStateAction<PeopleTypes | null>>;
  selectedPerson: PeopleTypes | null;
  infoModal: boolean;
  setInfoModal: Dispatch<SetStateAction<boolean>>;
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
  modalSuccess: boolean;
  setModalSuccess: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  confirmModal: boolean;
  setSearchValue: Dispatch<SetStateAction<string>>;
  feedbackItemsS?: TypefeedbackItems[] | [];
  setFeedbackItems: Dispatch<SetStateAction<TypefeedbackItems[] | []>>;
  setModalGreatFeedback: Dispatch<SetStateAction<boolean>>;

  modalGreatFeedback: boolean;
};

export type SearchPartProps = {
  setSelectedPerson: any;
  setSearchValue?: any;
  searchValue?: string;
  selectedPerson: PeopleTypes | null;
};

export type SubmitPartProps = {
  selectedPerson: PeopleTypes | null;
  setInfoModal: Dispatch<SetStateAction<boolean>>;
  feedbackItemsS?: TypefeedbackItems[] | [];
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
  giveFeedback: Array<GiveFeedbackType>;
  onDraft: () => void;
  setModalGreatFeedback: Dispatch<SetStateAction<boolean>>;
};
export type InfoModalProps = {
  setInfoModal: Dispatch<SetStateAction<boolean>>;
};

type FieldType = {
  id: string;
  type: string;
};

export type GiveFeedbackType = {
  id: string;
  code: string;
  title: string;
  description?: string;
  field: FieldType;
};
