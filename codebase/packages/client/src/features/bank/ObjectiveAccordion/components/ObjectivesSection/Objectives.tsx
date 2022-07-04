import React, { FC, useEffect, useMemo } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { ReviewType } from 'config/enum';
import { getTimelineByCodeSelector, isReviewsInStatus, reviewsMetaSelector } from '@pma/store';
import { Trans } from 'components/Translation';
import { ObjectiveTypes } from 'features/general/Objectives';
import Section from 'components/Section';
import { Accordion } from 'features/bank/ObjectiveAccordion';
import { useSelector } from 'react-redux';
import { USER } from 'config/constants';
import { IconButton } from 'components/IconButton';
import { downloadPDF, PrioritiesDocument, usePDF } from '@pma/pdf-renderer';
import Spinner from 'components/Spinner';

export const TEST_ID = 'objectives-test-id';

type Props = {
  objectives: ObjectiveTypes.Objective[];
};

const Objectives: FC<Props> = ({ objectives = [] }) => {
  const { css } = useStyle();

  const { loading: reviewLoading } = useSelector(reviewsMetaSelector);
  const timelineObjective = useSelector(getTimelineByCodeSelector(ReviewType.OBJECTIVE, USER.current)) || {};
  const status = timelineObjective?.summaryStatus || undefined;
  const isAllObjectivesInSameStatus = useSelector(isReviewsInStatus(ReviewType.OBJECTIVE)(status));

  const document = useMemo(() => <PrioritiesDocument items={objectives} />, [JSON.stringify(objectives)]);
  const [instance, updateInstance] = usePDF({ document });

  useEffect(() => {
    if (objectives.length) {
      updateInstance();
    }
  }, [JSON.stringify(objectives)]);

  return (
    <Section
      left={{
        content: (
          <div className={css(tileStyles)}>
            <Trans i18nKey='my_quarterly_priorities'>My Quarterly Priorities</Trans>
          </div>
        ),
      }}
      right={{
        content: (
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
        ),
      }}
    >
      {reviewLoading ? (
        <Spinner fullHeight />
      ) : objectives.length ? (
        <Accordion objectives={objectives} canShowStatus={!isAllObjectivesInSameStatus} />
      ) : (
        <div className={css(emptyBlockStyle)}>
          <Trans i18nKey={'no_objectives_created'}>No objectives created</Trans>
        </div>
      )}
    </Section>
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

export default Objectives;
