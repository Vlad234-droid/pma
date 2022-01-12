import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useStyle, Rule, useBreakpoints } from '@dex-ddl/core';
import { tipsActions, getTipsSelector } from '@pma/store';
import { Page } from 'pages';
import { buildPath } from 'features/Routes/utils';
import { IconButton } from 'components/IconButton';
import { NoTips, TipsCard } from 'features/Tips';

const TIPS_ADMINISTRATION = 'tips-administration';

const TipsAdministration: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const tips = useSelector(getTipsSelector) || [];

  useEffect(() => {
    dispatch(tipsActions.getAllTips({}));
  }, []);

  const handleCreateTip = () => {
    history.push(buildPath(`${Page.CREATE_TIP}`));
  };

  return (
    <div data-test-id={TIPS_ADMINISTRATION}>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '20px 0 25px',
        })}
      >
        <IconButton
          customVariantRules={{ default: iconBtnStyle }}
          onPress={handleCreateTip}
          graphic='add'
          iconProps={{ invertColors: true }}
          iconStyles={iconStyle}
        >
          <span>Create new tip</span>
        </IconButton>
      </div>

      {tips.length === 0 && <NoTips />}

      {tips.map((item) => {
        return <TipsCard card={item} key={item.uuid} />;
      })}
    </div>
  );
};

const iconBtnStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: '12px 20px 12px 22px',
    display: 'flex',
    height: '40px',
    borderRadius: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 0,
    background: theme.colors.tescoBlue,
    color: theme.colors.white,
    cursor: 'pointer',
    fontSize: mobileScreen ? '14px' : '16px',
    fontWeight: 'bold',
  };
};

const iconStyle: Rule = {
  marginRight: '10px',
  height: '20px',
};

export default TipsAdministration;
