import React, { FC, useEffect, useMemo } from 'react';
import { downloadPDF, PrioritiesDocument, usePDF } from '@pma/pdf-renderer';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { reviewsMetaSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { buildPath } from 'features/general/Routes';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';
import Spinner from 'components/Spinner';
import Section from 'components/Section';
import Accordion from '../Accordion';
import { TogglePriority } from '../TogglePriority';
import { AddNoteButton } from '../AddNoteButton';
import { Tenant } from 'config/enum';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';
import { PropsType, withSection } from '../../hoc/withSection';

export const TEST_ID = 'objectives-test-id';

const Objectives: FC<PropsType> = ({
  objectives,
  handleSelectTimelinePoint,
  timelinePoints,
  activeTimelinePoints,
  handleCompletion,
  handleDelete,
}) => {
  const { css } = useStyle();
  const { loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const document = useMemo(() => <PrioritiesDocument items={objectives} />, [JSON.stringify(objectives)]);
  const [instance, updateInstance] = usePDF({ document });
  const navigate = useNavigate();

  useEffect(() => {
    if (objectives.length) {
      updateInstance();
    }
  }, [JSON.stringify(objectives)]);

  return (
    <>
      <TogglePriority handleSelectTimelinePoint={handleSelectTimelinePoint} timelinePoints={timelinePoints} />
      <Section
        left={{
          content: (
            <div className={css(tileStyles)}>
              <Trans i18nKey='my_quarterly_priorities'>My Quarterly Priorities</Trans>
            </div>
          ),
        }}
        right={{
          content: objectives.length ? (
            <div data-test-id={TEST_ID}>
              <IconButton
                onPress={() => downloadPDF(instance.url!, 'priorities.pdf')}
                graphic='download'
                customVariantRules={{ default: iconButtonStyles }}
                iconStyles={iconStyles}
              >
                <Trans i18nKey='download'>Download</Trans>
              </IconButton>
            </div>
          ) : null,
        }}
      >
        {reviewLoading ? (
          <Spinner fullHeight />
        ) : objectives.length ? (
          <>
            <Accordion
              handleCompletion={handleCompletion}
              handleDelete={handleDelete}
              objectives={objectives}
              canShowStatus={true}
            />
            <AddNoteButton
              objectives={objectives}
              onClick={() =>
                navigate(
                  buildPath(paramsReplacer(Page.PRIORITY_NOTE, { ':uuid': activeTimelinePoints?.uuid ?? 'new' })),
                )
              }
            />
          </>
        ) : (
          <div className={css(emptyBlockStyle)}>
            <Trans i18nKey={'no_objectives_created'} ns={Tenant.BANK}>
              No Priority created
            </Trans>
          </div>
        )}
      </Section>
    </>
  );
};

const emptyBlockStyle: Rule = ({ theme }) => {
  return {
    paddingBottom: '20px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

const tileStyles: Rule = ({ theme }) => ({
  ...theme.font.fixed.f18,
  letterSpacing: '0px',
  display: 'flex',
  alignItems: 'center',
});

const iconStyles: Rule = { marginRight: '10px' };

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 10px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
});

export default withSection(Objectives);
