import React, { FC } from 'react';
import { Rule } from '@dex-ddl/core';

import { IconButton, Position } from 'components/IconButton';

import { Trans } from '../Translation';

type Props = {
  onClick: () => void;
};

const GiveFeedbackBtn: FC<Props> = ({ onClick }) => (
  <IconButton
    customVariantRules={{ default: iconBtnStyle }}
    iconPosition={Position.RIGHT}
    onPress={onClick}
    graphic='arrowRight'
    iconProps={{ invertColors: true }}
    iconStyles={iconArrowRightStyle}
  >
    <Trans i18nKey='give_feedback'>Give feedback</Trans>
  </IconButton>
);

export default GiveFeedbackBtn;

const iconArrowRightStyle: Rule = {
  height: '17px',
  margin: '3px 9px 0px 3px',
};

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '12px 7px 12px 20px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
  width: '176px',
  border: `1px solid ${theme.colors.link}`,
  whiteSpace: 'nowrap',
  // marginLeft: 'auto',
  // marginRight: '24px',
  fontWeight: 'bold',
});
