import { Dispatch, SetStateAction, ReactElement } from 'react';

export type ConfigProps = {
  id: number;
  action: string;
  text: string;
  icon: ReactElement;
  iconText: string;
  link: string;
};

export type PeopleTypes = {
  img: string;
  f_name: string;
  l_name: string;
  id: number;
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

export type Info360ModalProps = {
  setInfo360Modal: Dispatch<SetStateAction<boolean>>;
};
