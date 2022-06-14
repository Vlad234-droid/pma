import React, { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useStyle } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';
import { TriggerModal } from 'features/general/Modal';
import HelpTrigger from '../HelpTrigger';
import Components from '../Components';

type Props = {
  components: any[];
  objective: Record<string, string>;
  methods: UseFormReturn;
};

const Modify: FC<Props> = ({ components, objective, methods }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  return (
    <>
      <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
        <TriggerModal triggerComponent={<HelpTrigger />} title={t('completing_your_review', 'Completing your review')}>
          <HelpTrigger />
        </TriggerModal>
      </div>
      <Components components={components} objective={objective} methods={methods} readonly={false} />
    </>
  );
};

export default Modify;
