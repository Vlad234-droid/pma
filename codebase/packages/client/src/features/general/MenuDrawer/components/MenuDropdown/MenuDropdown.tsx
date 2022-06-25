import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Page } from 'pages';
import { CAMUNDA_APP_PATH, PUBLIC_URL } from 'config/constants';
import { CanPerform, role } from 'features/general/Permission';
import { buildPath } from 'features/general/Routes';
import { useTranslation } from 'components/Translation';
import { Icon } from 'components/Icon';

export const DROPDOWN_ITEMS_WRAPPER = 'dropdown-items-wrapper';
export const DROPDOWN_BTN = 'dropdown-btn';

const MenuDropdown: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const [isOpenDropdown, toggleOpen] = useState(false);
  const handleToggleDropdown = () => {
    toggleOpen((isOpenDropdown) => !isOpenDropdown);
  };

  return (
    <>
      <div
        data-test-id={DROPDOWN_BTN}
        className={css(itemSettingsStyle, adminToolsStyle)}
        onClick={handleToggleDropdown}
      >
        <Icon graphic={'tool'} />
        <span className={css(itemSettingsTextStyle)}>Administrator tools</span>
        <Icon
          graphic={'arrowDown'}
          iconStyles={{
            marginLeft: '15px',
            transform: isOpenDropdown ? 'rotate(-0deg)' : 'rotate(-90deg)',
            transition: 'all .2s ease-in-out',
          }}
        />
      </div>
      {isOpenDropdown && (
        <div className={css(menuDropdownStyle)} data-test-id={DROPDOWN_ITEMS_WRAPPER}>
          <CanPerform
            perform={[role.COLLEAGUE]}
            yes={() => (
              <>
                <Link
                  to={buildPath(Page.PERFORMANCE_CYCLE)}
                  className={css(itemSettingsStyle, itemSettingsBorderStyle)}
                >
                  <Icon graphic={'createCycle'} />
                  <span className={css(itemSettingsTextStyle)}>
                    {t('create_performance_cycle', 'Create performance cycle')}
                  </span>
                </Link>
                {/*//TODO: enabled when content of page meets business requirements.*/}
                {/*<Link to={buildPath(Page.ADMINISTRATION)} className={css(itemSettingsStyle, itemSettingsBorderStyle)}>*/}
                {/*  <Icon graphic={'configuration'} />*/}
                {/*  <span className={css(itemSettingsTextStyle)}>{t('configurations', 'Configurations')}</span>*/}
                {/*</Link>*/}
              </>
            )}
          />
          <CanPerform
            perform={[role.TALENT_ADMIN]}
            yes={() => (
              <Link
                to={buildPath(Page.CREATE_STRATEGIC_DRIVERS)}
                className={css(itemSettingsStyle, itemSettingsBorderStyle)}
              >
                <Icon graphic={'bank'} />
                <span className={css(itemSettingsTextStyle)}>{t('strategic_drivers', 'Strategic drivers')}</span>
              </Link>
            )}
          />
          <CanPerform
            perform={[role.ADMIN]}
            yes={() => (
              <Link to={buildPath(Page.TIPS)} className={css(itemSettingsStyle, itemSettingsBorderStyle)}>
                <Icon graphic={'lamp'} />
                <span className={css(itemSettingsTextStyle)}>{t('tips', 'Tips')}</span>
              </Link>
            )}
          />
          <CanPerform
            perform={[role.PROCESS_MANAGER, role.ADMIN]}
            yes={() => (
              <a
                href={`${PUBLIC_URL}${CAMUNDA_APP_PATH}`}
                target={'_blank'}
                rel='noreferrer'
                className={css(itemSettingsStyle, itemSettingsBorderStyle)}
              >
                <Icon graphic={'document'} />
                <span className={css(itemSettingsTextStyle)}>{t('camunda_admin', 'Camunda Admin')}</span>
              </a>
            )}
          />
        </div>
      )}
    </>
  );
};

const itemSettingsStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0',
  margin: '0 0 0 20px',
};

const menuDropdownStyle: Rule = ({ theme }) => ({
  // @ts-ignore
  backgroundColor: theme.colors.lightBlue,
  transition: 'all .5s ease-in-out',
});

const itemSettingsBorderStyle: Rule = ({ theme }) => ({
  // @ts-ignore
  borderTop: `2px solid ${theme.colors.lightGray}`,
});

const itemSettingsTextStyle: Rule = ({ theme }) => ({
  paddingLeft: '16px',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const adminToolsStyle: Rule = {
  cursor: 'pointer',
  userSelect: 'none',
};

export default MenuDropdown;
