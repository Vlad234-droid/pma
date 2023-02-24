import React, { FC, useEffect, useRef, useState } from 'react';
import { ColleaguesActions, colleaguesMetaSelector, getColleaguesSelector } from '@pma/store';
import { useStyle, Styles, Rule, CreateRule } from '@pma/dex-wrapper';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { AccessCalibration } from 'features/general/CalibrationSession';
import FilterIcon from 'features/general/Filters/components/FilterIcon';
import Search from 'features/general/Filters/components/Search';
import ViewNavigation from 'features/general/ViewNavigation';
import { buildPath } from 'features/general/Routes';
import BaseWidget from 'components/BaseWidget';
import { Page } from 'pages';

import { ColleagueProfile } from 'components/ColleagueProfile';
import DrawerModal from 'components/DrawerModal/DrawerModal';
import { Trans, useTranslation } from 'components/Translation';
import UnderlayModal from 'components/UnderlayModal';
import { buildSearchColleaguesQuery, extendQuery, paramsReplacer } from 'utils';
import { SearchOption } from 'config/enum';
import useDebounce from 'hooks/useDebounce';
import useClickOutside from 'hooks/useClickOutside';

export const TEST_ID = 'test-people-team-id';
export const SECONDARY_WIDGET_ID = 'secondary-widget-id';

const PeopleTeam: FC = () => {
  const { css, matchMedia } = useStyle();

  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const [searchOpened, setSearchOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchOption, setSearchOption] = useState<SearchOption>(SearchOption.NAME);

  const searchEl = useRef(null);
  const colleagues = useSelector(getColleaguesSelector) || [];
  const { updated } = useSelector(colleaguesMetaSelector) || [];
  const isNoResults: boolean = updated && searchValue?.length > 2 && searchOpened && !colleagues.length;

  const { t } = useTranslation();
  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const clearColleagueList = () => dispatch(ColleaguesActions.clearColleagueList());

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchValue('');
    clearColleagueList();
  };

  const handleSearch = (value: string) => {
    dispatch(ColleaguesActions.changeColleaguesMeta({ updated: false }));
    setSearchValue(value);
  };

  const search = useDebounce(
    (value) => {
      dispatch(ColleaguesActions.getColleagues(extendQuery(buildSearchColleaguesQuery(value, searchOption), {})));
    },
    //@ts-ignore
    [searchOption],
  );

  useEffect(() => {
    searchValue && searchValue.length >= 3 && search(searchValue);
    return () => {
      clearColleagueList();
    };
  }, [searchValue]);

  useClickOutside(searchEl, handleSearchClose);

  const toggleFilter = () => setFilterOpen((isOpen) => !isOpen);

  return (
    <div data-test-id={TEST_ID}>
      <ViewNavigation />
      <div className={css(filtersStyle)}>
        <FilterIcon onClick={toggleFilter} />
        <div ref={searchEl}>
          <Search
            focus={searchOpened}
            onFocus={handleSearchOpen}
            onSearch={handleSearch}
            value={searchValue}
            placeholder={t('search_colleague', 'Search colleague')}
          />
        </div>
      </div>
      {(!!colleagues.length || isNoResults) && (
        <div className={css(relativeStyles({ small: isNoResults }))}>
          <div className={css(optionsWrapperStyles)}>
            {isNoResults && (
              <p className={css(resultStyles)}>
                <Trans i18nKey='no_results'>No results</Trans>
              </p>
            )}
            {colleagues.map((item, i) => {
              return (
                <div
                  key={i}
                  className={css(optionStyle)}
                  onClick={() =>
                    navigate(
                      buildPath(paramsReplacer(`${Page.USER_REVIEWS}`, { ':uuid': item.colleague.colleagueUUID })),
                      {
                        state: {
                          backPath: pathname,
                        },
                      },
                    )
                  }
                >
                  <ColleagueProfile
                    firstName={item.colleague.profile.firstName}
                    lastName={item.colleague.profile.lastName}
                    job={item?.colleague?.workRelationships?.[0]?.job?.name}
                    department={item?.colleague?.workRelationships?.[0]?.department?.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isFilterOpen && (
        <UnderlayModal onClose={() => setFilterOpen(false)} styles={{ maxWidth: !mobileScreen ? '488px' : '100%' }}>
          {({ onClose }) => (
            <DrawerModal
              active={searchOption}
              onSelect={(filter) => {
                setSearchOption(filter);
                dispatch(ColleaguesActions.clearColleagueList());
                onClose();
              }}
              onClose={onClose}
            />
          )}
        </UnderlayModal>
      )}
      <div data-test-id={SECONDARY_WIDGET_ID} className={css(wrapperStyle)}>
        <AccessCalibration />
        <BaseWidget
          withButton={false}
          onClick={() => navigate(buildPath(Page.REPORT), { state: { backPath: pathname } })}
          customStyle={{ flex: '2 1 110px' }}
          data={t('access_your_team_reporting_dashboard', 'Access your team reporting dashboard')}
          iconGraphic={'account'}
          title={t('reporting', 'Reporting')}
        />
      </div>
    </div>
  );
};
const optionStyle: Rule = ({ theme }) => ({
  display: 'block',
  width: '100%',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  padding: '10px 30px 10px 16px',
  ':hover': {
    background: '#F3F9FC',
  },
});
const filtersStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
};

const relativeStyles: CreateRule<{ small: boolean }> = ({ small }) => ({
  //@ts-ignore
  width: small ? '240px' : 'min(540px, 100%)',
  marginLeft: 'auto',
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const resultStyles: Rule = ({ font, spacing }) => ({
  fontSize: font.fixed.f14.fontSize,
  paddingLeft: spacing.s2_5,
});

const optionsWrapperStyles: Rule = ({ theme }) => ({
  display: 'block',
  position: 'absolute',
  width: '100%',
  top: 0,
  // @ts-ignore
  border: `2px solid ${theme.colors.lightGray}`,
  borderRadius: theme.border.radius.sm,
  background: theme.colors.white,
  zIndex: theme.zIndex.i40,
  maxHeight: '400px',
  overflowY: 'auto',
});
const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
} as Styles;

export default PeopleTeam;
