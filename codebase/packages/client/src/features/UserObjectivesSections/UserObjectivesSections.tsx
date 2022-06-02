import React, { FC, ReactNode } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Trans, useTranslation } from 'components/Translation';
import { IconButton } from 'components/IconButton';
import { Accordion, Section, ObjectiveTypes as OT } from 'features/Objectives';
import Spinner from 'components/Spinner';
import { Plug } from 'components/Plug';

export const TEST_WRAPPER_ID = 'TEST_WRAPPER_ID';

export const UserObjectivesSections: FC<{
  canShowObjectives: boolean;
  reviewLoading: boolean;
  reviewLoaded: boolean;
  objectives: OT.Objective[];
  children?: ReactNode | null;
}> = ({ canShowObjectives, reviewLoading, objectives, children = null, reviewLoaded }) => {
  const { css } = useStyle();

  const { t } = useTranslation();

  if (reviewLoading) return <Spinner fullHeight />;

  return (
    <>
      {canShowObjectives && (
        <>
          {reviewLoaded && !objectives.length ? (
            <Plug text={t('no_objectives_created', 'No objectives created')} customStyle={{}} />
          ) : (
            <Section
              testId={TEST_WRAPPER_ID}
              left={{
                content: <div className={css(tileStyles)}>User objectives</div>,
              }}
              right={{
                content: (
                  <div>
                    <IconButton
                      onPress={() => alert('download')}
                      graphic='download'
                      customVariantRules={{ default: iconButtonStyles }}
                      iconStyles={iconStyles}
                    >
                      <Trans data-test-id={'test-download-btn'} i18nKey='download'>
                        Download
                      </Trans>
                    </IconButton>
                  </div>
                ),
              }}
            >
              <Accordion objectives={objectives} canShowStatus={true} isButtonsVisible={false} />
            </Section>
          )}
        </>
      )}
      {children}
    </>
  );
};

const tileStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 10px',
  color: theme.colors.tescoBlue,
  fontWeight: 700,
});

const iconStyles: Rule = {
  marginRight: '10px',
};
