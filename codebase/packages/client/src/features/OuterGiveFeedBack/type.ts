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
  modalSuccess: boolean;
  setModalSuccess: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  methods: UseFormReturn;
  feedbackItemsS?: TypefeedbackItems[] | [];
  setFeedbackItems: Dispatch<SetStateAction<TypefeedbackItems[] | []>>;
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
  setModalSuccess: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  methods: UseFormReturn;
  feedbackItemsS?: TypefeedbackItems[] | [];
  setFeedbackItems: Dispatch<SetStateAction<TypefeedbackItems[] | []>>;
  setSelectedPerson: Dispatch<SetStateAction<PeopleTypes | null>>;
};
export type InfoModalProps = {
  setInfoModal: Dispatch<SetStateAction<boolean>>;
};

type FieldType = {
  field_id: string;
  field_type: string;
  field_placeholder: string;
  field_value: undefined | string;
};

export type GiveFeedbackType = {
  giveFeedback_id: string;
  giveFeedbacka_main_title: string;
  giveFeedback_title: string;
  giveFeedback_description?: string;
  giveFeedback_field: FieldType;
};

export type SuccessModalProps = {
  setModalSuccess: Dispatch<SetStateAction<boolean>>;
  selectedPerson: PeopleTypes | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedPerson: Dispatch<SetStateAction<PeopleTypes | null>>;
  setFeedbackItems: Dispatch<SetStateAction<TypefeedbackItems[] | []>>;
};
