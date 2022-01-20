import React, { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type EditSelectedNoteProps = {
  foldersWithNotes: Array<any>;
  methods: UseFormReturn;
  cancelSelectedNoteModal: () => void;
  submitForm: any;
  setSelectedNoteToEdit: Dispatch<SetStateAction<any>>;
  setSelectedFolderDynamic: Dispatch<SetStateAction<any>>;
  selectedNoteToEdit: any;
  setSelectedFolder: Dispatch<SetStateAction<any | null>>;
  definePropperEditMode: any | null;
};

export type SuccessModalProps = {
  setSuccessSelectedNoteToEdit: Dispatch<SetStateAction<boolean>>;
  setSelectedNoteToEdit: Dispatch<SetStateAction<any>>;
  setSelectedFolder: Dispatch<SetStateAction<any | null>>;
  methods: UseFormReturn;
};
