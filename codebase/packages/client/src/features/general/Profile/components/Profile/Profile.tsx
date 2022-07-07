import React, { FC } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import AvatarName from 'components/AvatarName';
import { Trans } from 'components/Translation';

export const PROFILE_TEST_ID = 'profile-test-id';

type Props = { fullName: string; job: string; manager: string; department: string };

const Profile: FC<Props> = ({ fullName, job, manager, department }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <div className={css(wrapperStyle)} data-test-id={PROFILE_TEST_ID}>
      <AvatarName user={{ fullName, job }} />
      <div className={css(bodyStyle)}>
        <div className={css(bodyBlockStyle)}>
          <span className={css(titleStyle)}>
            <Trans i18nKey='line_manager'>Line manager</Trans>
          </span>
          <span className={css(descriptionStyle({ mobileScreen }), { fontSize: '16px', lineHeight: '20px' })}>
            {manager}
          </span>
        </div>
        <div className={css(bodyBlockStyle)}>
          <span className={css(titleStyle)}>
            <Trans>Department</Trans>
          </span>
          <span className={css(descriptionStyle({ mobileScreen }), { fontSize: '16px', lineHeight: '20px' })}>
            {department}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;

const wrapperStyle: Styles = {
  padding: '24px',
};

const bodyBlockStyle: Styles = {
  minWidth: '200px',
  display: 'grid',
  paddingRight: '20px',
};

// TODO: Extract duplicate 8
const titleStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
});

const descriptionStyle: CreateRule<{ mobileScreen }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '0px',
    ...(mobileScreen ? { ...theme.font.fixed.f18 } : { ...theme.font.fixed.f20 }),
  });

// TODO: Extract duplicate 10
const bodyStyle: Styles = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'inline-flex',
};
