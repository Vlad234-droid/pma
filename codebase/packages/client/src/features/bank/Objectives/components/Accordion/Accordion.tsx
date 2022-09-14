import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { Page } from 'pages';
import { Status } from 'config/enum';
import { paramsReplacer, Tenant } from 'utils';

import { Accordion, Panel, Section } from 'components/Accordion';
import { Trans, useTranslation } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import { buildPath } from 'features/general/Routes';
import { ObjectiveTypes as OT } from 'features/general/Review';

import { ObjectiveHeader } from '../ObjectiveHeader';
import { FileList, UploadFileButton } from 'features/bank/UploadFile';
import { CompletePriority } from '../CompletePriority/CompletePriority';
import { NoteSection } from '../NoteSection';
import { DeleteButton } from '../DeleteButton';

export const TEST_ID = 'priorities-accordion';

export type ObjectiveAccordionProps = {
  objectives: OT.Objective[];
  handleCompletion: (T) => void;
  handleDelete: (T: number) => void;
  canShowStatus?: boolean;
};

const ObjectiveAccordion: FC<ObjectiveAccordionProps> = ({ objectives, handleCompletion, handleDelete }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEditClick = (number) => {
    const pathname = paramsReplacer(buildPath(Page.EDIT_OBJECTIVE), { ':id': number.toString() });

    navigate(pathname);
  };

  return (
    <Accordion id='objective-accordion'>
      <div data-test-id={TEST_ID}>
        {objectives.map(({ id, subTitle, description, status, lastUpdatedTime, uuid }) => {
          const sentences = description.split('. ');
          const firstSentence = sentences.shift();
          const restSentences = sentences.join('. ');
          const isEnabled = [Status.DRAFT, Status.DECLINED, Status.APPROVED].includes(status);
          const isRemovable = status === Status.DRAFT && objectives.length > 1;

          return (
            <Section key={id}>
              <div className={css({ '& > div': { paddingBottom: 0 } } as Styles)}>
                <ObjectiveHeader
                  {...{
                    title: t('objective_number', { ns: Tenant.BANK, number: id }),
                    subTitle,
                    description: firstSentence,
                    status,
                    lastUpdatedTime,
                  }}
                />
              </div>
              <Panel>
                <div className={css({ lineHeight: '20px', fontSize: '16px' })}>{restSentences}</div>
                <div className={css(buttonStyles)}>
                  <CompletePriority status={status} number={id} handleCompletion={handleCompletion} />
                  <div>
                    <UploadFileButton reviewUUID={uuid} number={id} disabled={!isEnabled} />
                    <IconButton
                      isDisabled={!isEnabled}
                      onPress={() => handleEditClick(id)}
                      graphic='edit'
                      customVariantRules={{ default: iconButtonStyles, disabled: iconButtonStyles }}
                      iconStyles={iconStyles}
                      iconPosition={Position.LEFT}
                      iconProps={{ size: '16px' }}
                    >
                      <Trans i18nKey='edit'>Edit</Trans>
                    </IconButton>
                    <DeleteButton
                      isRemovable={isRemovable}
                      number={id}
                      onDelete={() => handleDelete(id)}
                      description={subTitle}
                    />
                  </div>
                </div>
                <FileList reviewUUID={uuid} />
                <NoteSection reviewUuid={uuid} />
              </Panel>
              <div className={css({ paddingBottom: '25px' })}></div>
            </Section>
          );
        })}
      </div>
    </Accordion>
  );
};

const buttonStyles: Rule = {
  flexWrap: 'wrap',
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '30px',
};

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 10px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
});

const iconStyles: Rule = { marginRight: '5px' };

export default ObjectiveAccordion;
