import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Rule, useBreakpoints, useStyle, CreateRule, Theme } from '@pma/dex-wrapper';
import { getTipsSelector, tipsActions, getTipsMetaSelector } from '@pma/store';
import { Page } from 'pages';
import { buildPath } from 'features/Routes/utils';
import { paramsReplacer } from 'utils';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';
import { NoTips, TipsCard } from 'features/Tips';
import Spinner from 'components/Spinner';

export const TIPS_ADMINISTRATION = 'tips-administration';

const TipsAdministration: FC = () => {
  const { css, theme } = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const tips = useSelector(getTipsSelector) || [];
  const tipsMeta = useSelector(getTipsMetaSelector);
  const isLoaded = tipsMeta?.loaded;

  useEffect(() => {
    dispatch(tipsActions.getAllTips({}));
  }, []);

  const handleCreateTip = () => {
    navigate(buildPath(paramsReplacer(Page.EDIT_TIP, { ':tipUuid': 'new' })));
  };

  return (
    <div data-test-id={TIPS_ADMINISTRATION}>
      <div className={css(btnWrapStyle)}>
        <IconButton
          customVariantRules={{ default: iconBtnStyle({ mobileScreen, theme }) }}
          onPress={handleCreateTip}
          graphic='add'
          iconProps={{ invertColors: true }}
          iconStyles={iconStyle}
        >
          <span>
            <Trans i18nKey='create_new_tip'>Create new tip</Trans>
          </span>
        </IconButton>
      </div>

      {!isLoaded && <Spinner />}
      {isLoaded && tips.length === 0 && <NoTips />}

      {isLoaded &&
        tips.map((item) => {
          return <TipsCard card={item} key={item.uuid} />;
        })}
    </div>
  );
};

const btnWrapStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '20px 0 25px',
};

const iconBtnStyle: CreateRule<{ mobileScreen: boolean; theme: Theme }> = ({ mobileScreen, theme }) => {
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
    fontSize: mobileScreen ? theme.font.fixed.f14.fontSize : theme.font.fixed.f16.fontSize,
    fontWeight: theme.font.weight.bold,
  };
};

const iconStyle: Rule = {
  marginRight: '10px',
  width: '20px',
  height: '20px',
  display: 'block',
};

export default TipsAdministration;
