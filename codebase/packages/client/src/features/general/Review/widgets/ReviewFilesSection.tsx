import React, { FC, useState, useEffect } from 'react';

import { Trans } from 'components/Translation';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';
import Section from 'components/Section';
import { File } from 'features/general/ReviewFiles/components/File';
import { useSelector } from 'react-redux';
import { getPreviousReviewFilesSelector, PreviousReviewFilesActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import PreviousReviewFiles from 'features/general/ReviewFiles';

type Props = {
  colleagueUuid: string | undefined;
};

export const ReviewFilesSection: FC<Props> = ({ colleagueUuid }) => {
  const { css, theme } = useStyle();

  const [previousReviewFilesModalShow, setPreviousReviewFilesModalShow] = useState(false);
  const files: File[] = useSelector(getPreviousReviewFilesSelector()) || [];

  return (
    <>
      <Section
        left={{
          content: (
            <div className={css(title)}>
              <Trans i18nKey='previous_review_files'>Previous Review Files</Trans>
            </div>
          ),
        }}
        right={{
          content: (
            <div>
              <Button
                mode='inverse'
                onPress={() => setPreviousReviewFilesModalShow(true)}
                styles={[linkStyles({ theme })]}
              >
                <Trans className={css(title)} i18nKey='view_files'>
                  View files
                </Trans>
              </Button>
            </div>
          ),
        }}
      >
        <div className={css(emptyBlockStyle)}>
          <Trans>{`You have ${files.length || 'no'} files`}</Trans>
        </div>
      </Section>
      {previousReviewFilesModalShow && (
        <PreviousReviewFiles
          onOverlayClick={() => setPreviousReviewFilesModalShow(false)}
          colleagueUUID={colleagueUuid}
          readonly
        />
      )}
    </>
  );
};

const title: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const emptyBlockStyle: Rule = ({ theme }) => ({
  paddingBottom: '20px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const linkStyles = ({ theme }) => ({
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  background: 'transparent',
});
