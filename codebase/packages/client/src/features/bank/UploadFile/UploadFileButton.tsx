import { Rule } from '@pma/dex-wrapper';
import React, { FC, useState } from 'react';
import { useTranslation } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import PreviousReviewFiles from 'features/general/ReviewFiles';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector } from '@pma/store';

type Props = {
  number: number;
  reviewUUID: string;
  disabled: boolean;
};

export const UploadFileButton: FC<Props> = ({ reviewUUID, number, disabled }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  return (
    <>
      <IconButton
        isDisabled={disabled}
        onPress={() => setShowModal(true)}
        graphic='upload'
        customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
        iconStyles={iconStyles}
        iconPosition={Position.LEFT}
        iconProps={{ size: '16px' }}
      >
        {t('upload', 'Upload')}
      </IconButton>
      {showModal && (
        <PreviousReviewFiles
          title={t('priority_file_upload_header', `Priority ${number} - upload documents`, { number })}
          onOverlayClick={() => setShowModal(false)}
          colleagueUUID={colleagueUuid}
          reviewUUID={reviewUUID}
        />
      )}
    </>
  );
};

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 10px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
});

const iconStyles: Rule = { marginRight: '5px' };
