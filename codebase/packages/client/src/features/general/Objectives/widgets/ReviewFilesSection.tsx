import React, { FC, useState, useEffect } from 'react';

import { Trans } from 'components/Translation';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';
import Section from 'components/Section';
import { File } from 'features/general/ReviewFiles/components/components/File';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector, getPreviousReviewFilesSelector, PreviousReviewFilesActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { PreviousReviewFilesModal } from 'features/general/ReviewFiles/components';

type Props = {};

export const ReviewFilesSection: FC<Props> = () => {
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const { css, theme } = useStyle();

  const [previousReviewFilesModalShow, setPreviousReviewFilesModalShow] = useState(false);
  const files: File[] = useSelector(getPreviousReviewFilesSelector()) || [];

  useEffect(() => {
    dispatch(PreviousReviewFilesActions.getPreviousReviewFiles({ colleagueUUID: colleagueUuid }));
  }, []);

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
        <PreviousReviewFilesModal
          onOverlayClick={() => setPreviousReviewFilesModalShow(false)}
          colleagueUUID={colleagueUuid}
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
