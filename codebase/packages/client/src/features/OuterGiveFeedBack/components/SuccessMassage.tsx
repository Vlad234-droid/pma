import React, { FC } from 'react';
import { Button, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Trans } from 'components/Translation';

import success from '../../../../public/success.jpg';
import { useSelector } from 'react-redux';
import { getColleagueByUuidSelector } from '@pma/store';

export const SUCCESS_GIVE_FEEDBACK = 'SUCCESS_GIVE_FEEDBACK';

export type Props = {
  onSuccess: () => void;
  selectedColleagueUuid: string;
  targetColleagueProfile?: any;
};

const SuccessMassage: FC<Props> = ({ selectedColleagueUuid, targetColleagueProfile, onSuccess }) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const selectedColleague = useSelector(getColleagueByUuidSelector(selectedColleagueUuid)) || targetColleagueProfile;

  return (
    <div className={css(WrapperSuccessContainer)} data-test-id={SUCCESS_GIVE_FEEDBACK}>
      <div className={css(SuccessImg)}>
        <img src={success} alt='success' />
      </div>
      <h2 className={css(DoneText)}>Done!</h2>
      <p className={css(Description)}>
        {`${selectedColleague?.colleague?.profile?.firstName} ${selectedColleague?.colleague?.profile?.lastName}`} will
        now be able to view your feedback
      </p>
      <div
        className={css({
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
        })}
      >
        <div
          className={css({
            position: 'relative',
            bottom: theme.spacing.s0,
            left: theme.spacing.s0,
            right: theme.spacing.s0,
            borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
          })}
        >
          <div
            className={css({
              padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <Button
              styles={[
                theme.font.fixed.f16,
                {
                  fontWeight: theme.font.weight.bold,
                  width: '49%',
                  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                  background: theme.colors.tescoBlue,
                  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                  color: `${theme.colors.white}`,
                },
              ]}
              onPress={onSuccess}
            >
              <Trans i18nKey='OK'>Okay</Trans>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WrapperSuccessContainer: Rule = {
  paddingTop: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};
const SuccessImg: Rule = {
  width: '164px',
  height: '164px',
  '& > img': {
    width: '100%',
    maxHeight: '100%',
  },
} as Styles;

const DoneText: Rule = {
  fontWeight: 'bold',
  fontSize: '28px',
  lineHeight: '32px',
  margin: '20px 0px 16px 0px',
};

const Description: Rule = {
  maxWidth: '357px',
  margin: '0px',
  fontWeight: 'normal',
  fontSize: '24px',
  lineHeight: '28px',
  textAlign: 'center',
};

export default SuccessMassage;
