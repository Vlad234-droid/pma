import { Dispatch, SetStateAction, ReactNode } from 'react';

export type ConfigProps = {
  id: number;
  action: string;
  text: string;
  icon: ReactNode;
  iconText: string;
  onClick: () => void;
};

export type Info360ModalProps = {
  setInfo360Modal: Dispatch<SetStateAction<boolean>>;
};
