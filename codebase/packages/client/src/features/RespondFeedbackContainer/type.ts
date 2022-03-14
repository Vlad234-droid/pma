import { FeedbackStatus } from 'config/enum';
import { Dispatch, SetStateAction, ReactElement } from 'react';

export type ConfigProps = {
  id: number;
  action: string;
  text: string;
  icon: ReactElement;
  iconText: string;
  modalTitle?: string;
  link: string;
};
export type TypefeedbackItems = {
  uuid?: string;
  code: string;
  content: string;
  feedbackUuid: string;
};

export type PeopleTypes = any;
export type ModalGiveFeedbackProps = {
  feedbackItems: Array<TypefeedbackItems>;
  setFeedbackItems: Dispatch<SetStateAction<[] | TypefeedbackItems[]>>;
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
};

export type SearchPartProps = {
  setPeopleFiltered: any;
  people: PeopleTypes[];
  setSelectedPerson: any;
  peopleFiltered: PeopleTypes[];
  setSearchValue?: any;
  searchValue?: string;
  selectedPerson: PeopleTypes | null;
};

export type SubmitPartProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  feedbackItems: Array<TypefeedbackItems>;
  selectedPerson: PeopleTypes | null;
  setInfoModal: Dispatch<SetStateAction<boolean>>;
  setModalSuccess: Dispatch<SetStateAction<boolean>>;
};
export type InfoModalProps = {
  setInfoModal: Dispatch<SetStateAction<boolean>>;
};

type FieldType = {
  field_id: string;
  field_type: string;
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
  setFeedbackItems: Dispatch<SetStateAction<[] | TypefeedbackItems[]>>;
  setModalSuccess: Dispatch<SetStateAction<boolean>>;
  selectedPerson: PeopleTypes | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedPerson: Dispatch<SetStateAction<PeopleTypes | null>>;
};

export type TypecheckedRadio = {
  pending: boolean;
  completed: boolean;
};

export type DraftItemProps = {
  status: FeedbackStatus;
  list: any;
  canEdit: boolean;
};
