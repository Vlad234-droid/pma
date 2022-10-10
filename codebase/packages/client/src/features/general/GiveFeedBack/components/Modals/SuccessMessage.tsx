import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation';
import { ButtonsWrapper } from 'components/ButtonsWrapper';

import success from 'images/success.jpg';
import { useSelector } from 'react-redux';
import { getColleagueByUuidSelector } from '@pma/store';

export const SUCCESS_WRAPPER = 'success-wrapper';

export type Props = {
  onSuccess: () => void;
  selectedColleagueUuid: string;
  targetColleagueProfile?: any;
};

const SuccessMessage: FC<Props> = ({ selectedColleagueUuid, targetColleagueProfile, onSuccess }) => {
  const { css } = useStyle();

  const selectedColleague = useSelector(getColleagueByUuidSelector(selectedColleagueUuid)) || targetColleagueProfile;

  return (
    <div className={css(successContainer)} data-test-id={SUCCESS_WRAPPER}>
      <div className={css(SuccessImg)}>
        <img src={success} alt='success' />
      </div>
      <h2 className={css(DoneText)}>Done!</h2>
      <p className={css(Description)}>
        {`${selectedColleague?.colleague?.profile?.firstName} ${selectedColleague?.colleague?.profile?.lastName}`}{' '}
        <Trans i18nKey='will_now_be_able_to_view_your_feedback'>will now be able to view your feedback</Trans>
      </p>

      <ButtonsWrapper isValid={true} onRightPress={onSuccess} rightTextNotIcon='okay' rightIcon={false} single={true} />
    </div>
  );
};

const successContainer: Rule = {
  height: '100%',
  overflow: 'auto',
  padding: '8px',
  display: 'flex',
  justifyContent: 'start',
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

export default SuccessMessage;
