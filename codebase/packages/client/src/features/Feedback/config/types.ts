import { Dispatch, SetStateAction, ReactNode } from 'react';

export type ConfigProps = {
  id: number;
  action: string;
  text: string;
  icon: ReactNode;
  iconText: string;
  link: string;
};

export type Info360ModalProps = {
  setInfo360Modal: Dispatch<SetStateAction<boolean>>;
};
