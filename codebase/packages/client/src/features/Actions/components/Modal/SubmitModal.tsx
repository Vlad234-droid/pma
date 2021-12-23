import React, { FC } from 'react';

import ConfirmModal from './ConfirmModal';

type Props = {
  onSave: (reason?: string) => void;
  onClose: () => void;
};

const SubmitModal: FC<Props> = ({ onSave, onClose }) => (
  <ConfirmModal
    title={'Submit objectives or reviews'}
    renderContent={() => <div>Are you sure you want to approve objectives or reviews?</div>}
    onSave={onSave}
    onClose={onClose}
  />
);

export default SubmitModal;
