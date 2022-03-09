import React, { FC, useEffect, useState } from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import isEmpty from 'lodash.isempty';
import startCase from 'lodash.startcase';

import { ConfirmModal as Modal } from 'features/Modal';
import { Trans, useTranslation } from 'components/Translation';

import { getMissedFields } from '../../utils';

// TODO: type info
type Props = {
  info: any;
}

const DataModal: FC<Props> = ({ info })  => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [missedFields, setMissedFields] = useState<string[]>([]);
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  useEffect(() => {
    setMissedFields(getMissedFields(info));
  }, [info]);

  useEffect(() => {
    setDisplayModal(!isEmpty(missedFields));
  }, [missedFields]);

  const closeModal = () => {
    setDisplayModal(false);
  };

  if (!displayModal) return null;

  return (
    <Modal
      title={t('profile_data_missing', 'Your profile data is missing')}
      visibleCancelBtn={false}
      submitBtnTitle = {<Trans i18nKey='close'>Close</Trans>}
      onCancel={closeModal}
      onSave={closeModal}
    >
      <div className={css(contentSles)}>
        <ul>
          {missedFields.map((field) => <li key={field}>{startCase(field)}</li>)}
        </ul>
        {`${t('please_refer_to', 'Please refer to')} ${t('system_guidance_and_faqs', 'System guidance and FAQs')} ${t('find_how_correct_data', 'to find out how to correct this data')}.`}
      </div>
    </Modal>
  );
};


export default DataModal;

const contentSles: Rule = {
  marginTop: '10px',
};
