import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { Page } from 'pages';
import { Status } from 'config/enum';
import { paramsReplacer, Tenant } from 'utils';

import { Accordion, Panel, Section } from 'components/Accordion';
import { useTranslation } from 'components/Translation';
import { buildPath } from 'features/general/Routes';

import { FileList } from 'features/bank/UploadFile';
import { Objective } from '../../type';

import { ObjectiveHeader } from '../ObjectiveHeader';
import { CompletePriority } from '../CompletePriority/CompletePriority';
import { NoteSection } from '../NoteSection';
import { DeleteButton } from '../DeleteButton';
import { Button } from '../Button';

export const TEST_ID = 'priorities-accordion';

export type ObjectiveAccordionProps = {
  objectives: Objective[];
  handleCompletion: (T) => void;
  handleDelete: (T: number) => void;
  canShowStatus?: boolean;
};

const ObjectiveAccordion: FC<ObjectiveAccordionProps> = ({ objectives, handleCompletion, handleDelete }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEditClick = (number) => {
    navigate(paramsReplacer(buildPath(Page.EDIT_OBJECTIVE), { ':id': number.toString() }));
  };

  return (
    <Accordion id='objective-accordion'>
      <div data-test-id={TEST_ID}>
        {objectives.map(({ id, subTitle, description, status, lastUpdatedTime, uuid }) => {
          const sentences = description.split('. ');
          const firstSentence = sentences.shift();
          const restSentences = sentences.join('. ');
          const isEnabled = [Status.DRAFT, Status.DECLINED, Status.APPROVED, Status.REQUESTED_TO_AMEND].includes(
            status,
          );
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
                    <Button
                      graphic={'edit'}
                      isDisabled={!isEnabled}
                      onPress={() => handleEditClick(id)}
                      name={t('edit', 'Edit')}
                    />
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
              <div className={css({ paddingBottom: '25px' })} />
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

export default ObjectiveAccordion;
