import React, { FC, ReactNode } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Trans } from 'components/Translation';

import { IconButton } from 'components/IconButton';

import { Accordion, Section, ObjectiveTypes as OT } from 'features/Objectives';

import Spinner from 'components/Spinner';

export const UserObjectivesSections: FC<{
  canShowObjectives: boolean;
  reviewLoading: boolean;
  objectives: OT.Objective[];
  children?: ReactNode | null;
}> = ({ canShowObjectives, reviewLoading, objectives, children = null }) => {
  const { css } = useStyle();

  return (
    <>
      {canShowObjectives && (
        <Section
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
          {reviewLoading ? (
            <Spinner fullHeight />
          ) : (
            <Accordion objectives={objectives} canShowStatus={true} isButtonsVisible={false} />
          )}
        </Section>
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
