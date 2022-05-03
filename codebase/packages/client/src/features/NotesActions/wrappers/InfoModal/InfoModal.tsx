import React, { FC, Dispatch, SetStateAction } from 'react';
import WrapperModal from 'features/Modal/components/WrapperModal';
import { ModalStatuses } from '../../NotesActions';
import { ModalWrapper } from 'components/ModalWrapper';
import { InfoModal as InfoPart } from '../../components';
import { useTranslation } from 'components/Translation';

const InfoModal: FC<{
  status: ModalStatuses;
  isLineManager: boolean;
  setStatus: Dispatch<SetStateAction<ModalStatuses>>;
}> = ({ status, isLineManager, setStatus }) => {
  const { t } = useTranslation();
  return (
    <ModalWrapper isOpen={status === ModalStatuses.INFO}>
      <WrapperModal title={t('notes', 'Notes')} onClose={() => setStatus(() => ModalStatuses.PENDING)}>
        <InfoPart
          closeInfoModal={() => {
            setStatus(() => ModalStatuses.PENDING);
          }}
          TEAM={isLineManager}
        />
      </WrapperModal>
    </ModalWrapper>
  );
};

export default InfoModal;
