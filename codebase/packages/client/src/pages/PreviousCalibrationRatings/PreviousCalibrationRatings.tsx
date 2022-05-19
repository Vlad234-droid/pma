import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';

import { ProfileTileWrapper } from 'components/ProfileTileWrapper';
import { Trans } from 'components/Translation';
import { Backward } from 'components/Backward';
import { PreviousCalibrationRatingsTable } from 'features/PreviousCalibrationRatingsTable';

export const AdditionalInfo: FC<{ manager: string }> = ({ manager }) => {
  const { css } = useStyle();

  return (
    <div className={css(additionalInfo)}>
      <h2>
        <Trans i18nKey={'line_manager'}>Line manager</Trans>
      </h2>
      <p>{manager}</p>
    </div>
  );
};

const PreviousCalibrationRatings: FC = () => {
  const { css } = useStyle();

  const navigate = useNavigate();

  const user = {
    fullName: 'Ron Rogers',
    job: 'Grocery',
    manager: 'Justin Thomas',
  };

  return (
    <>
      <Backward onPress={() => navigate(-1)} />
      <div className={css({ margin: '8px' })}>
        <ProfileTileWrapper
          user={user}
          customStyle={{ maxWidth: '80%' }}
          render={() => <PreviousCalibrationRatingsTable />}
        />
      </div>
    </>
  );
};

const additionalInfo: Rule = ({ theme }) =>
  ({
    '& > h2': {
      marginTop: 0,
      marginBottom: '8px',
      fontSize: theme.font.fixed.f20.fontSize,
      fontWeight: theme.font.weight.bold,
      color: theme.colors.base,
    },
    '& > p': {
      marginTop: 0,
      fontSize: theme.font.fixed.f16.fontSize,
      fontWeight: theme.font.weight.regular,
      color: theme.colors.base,
    },
  } as Styles);

export default PreviousCalibrationRatings;
