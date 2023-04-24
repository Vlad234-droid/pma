export type Props = {
  closeModal: void;
};

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REGISTERED = 'REGISTERED',
  DRAFT = 'DRAFT',
  STARTED = 'STARTED',
}

export enum FormType {
  GENERAL = 'GENERAL',
  DETAILS = 'DETAILS',
}
