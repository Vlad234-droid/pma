import React, { FC, HTMLProps, useState } from 'react';
import { Rule , Button } from '@dex-ddl/core';
import { ConfirmModal } from 'features/Modal';

export type SubmitButton = {
  styles?: Rule[];
};

type Props = HTMLProps<HTMLInputElement> & SubmitButton;

const SubmitButton: FC<Props> = ({ styles }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button styles={styles} onPress={() => setIsOpen(true)}>
        Submit
      </Button>
      {isOpen && (
        <ConfirmModal
          title='Submit Objectives'
          description='Are you sure you want to submit all of your objectives to your manager?'
          onSave={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          onOverlayClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SubmitButton;
