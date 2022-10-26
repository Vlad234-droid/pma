import React, { FC, useState, useMemo } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { colleaguesCountSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import FilterModal from 'features/general/Report/components/FilterModal';
import { ReportModal } from 'features/general/Report/Modals';
import { buildPath } from 'features/general/Routes';
import { Trans, useTranslation } from 'components/Translation';
import { ColleaguesCount } from 'components/ColleaguesCount';
import { HoverContainer } from 'components/HoverContainer';
import { HoverMessage } from 'components/HoverMessage';
import { FilterOption } from 'features/general/Shared';
import UnderlayModal from 'components/UnderlayModal';
import { IconButton } from 'components/IconButton';
import { Select } from 'components/Form';

import { getCurrentValue, getFieldOptions, initialValues } from 'features/general/Report/config';
import { getCurrentYear, getNextYear, getPrevYear } from 'utils/date';
import { useTenant } from 'features/general/Permission';
import useQueryString from 'hooks/useQueryString';
import { getLocalNow } from 'utils';
import { Page } from 'pages';

export enum ModalStatus {
  EDIT = 'EDIT',
}

const startMonth = 3;
export const isStartPeriod = () => getLocalNow().month >= startMonth;
export const getCurrentYearWithStartDate = () => (isStartPeriod() ? getCurrentYear() : getPrevYear(1));

export const REPORT_WRAPPER = 'REPORT_WRAPPER';

const ReportPage: FC = () => {
  const query = useQueryString() as Record<string, string | number>;
  const { t } = useTranslation();
  const tenant = useTenant();

  const { css, matchMedia } = useStyle();
  const small = matchMedia({ xSmall: true, small: true }) || false;
  const mediumScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const navigate = useNavigate();
  const [focus, setFocus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [year, setYear] = useState<string>('');
  const [tiles, setTiles] = useState<Array<string>>([]);

  const [checkedItems, setCheckedItems]: [string[], (T) => void] = useState([]);
  const [isCheckAll, setIsCheckAll]: [string[], (T) => void] = useState([]);

  const colleaguesCount = useSelector(colleaguesCountSelector) || 0;

  const changeYearHandler = (value) => {
    if (!value) return;
    setYear(value);
  };

  //TODO: attach this with Marius
  // const getAppliedReport = () => [...new Set(checkedItems.map((item) => item.split('-')[0]))];
  // const clearAppliedFilters = (filterTitle) => {
  //   if (isCheckAll.length) setIsCheckAll((prev) => [...prev.filter((item) => item.split('-')[0] !== filterTitle)]);
  //   setCheckedItems((prev) => [...prev.filter((item) => item.split('-')[0] !== filterTitle)]);
  // };
  // const quantity = getAppliedReport().length;

  const Report = useMemo(
    () => React.lazy(() => import(`features/${tenant}/Report`).then((module) => ({ default: module.default }))),
    [],
  );

  return (
    <div className={css({ margin: '22px 42px 110px 40px' })} data-test-id={REPORT_WRAPPER}>
      <div className={css(spaceBetween({ mediumScreen }))}>
        {/*//Todo in future move active filters to another place */}
        {/*{!!getAppliedReport().length && (*/}
        {/*  <AppliedFilters*/}
        {/*    clearAppliedFilters={clearAppliedFilters}*/}
        {/*    getAppliedReport={getAppliedReport()}*/}
        {/*    colleaguesCount={colleaguesCount}*/}
        {/*  />*/}
        {/*)}*/}
        <div className={css(downloadWrapperStyle)}>
          <form>
            <h2 className={css(yearLabel)}>
              <Trans i18nKey='select_financial_year'>Select financial year</Trans>
            </h2>

            <Select
              options={[
                {
                  value: getCurrentYearWithStartDate(),
                  label: isStartPeriod()
                    ? `${getCurrentYear()}-${getNextYear(1)}`
                    : `${getPrevYear(1)}-${getCurrentYear()}`,
                },
                ...getFieldOptions(),
              ]}
              name={'year_options'}
              placeholder={t('choose_an_area', 'Choose an area')}
              onChange={({ target: { value } }) => {
                changeYearHandler(value);
              }}
              value={getCurrentValue(query, year)}
            />
          </form>

          <ColleaguesCount
            count={colleaguesCount}
            countStyles={countStyles}
            title={t('total_unique_colleagues', 'Total unique colleagues')}
          />
        </div>

        <div className={css(flexCenterStyled)}>
          <HoverContainer
            isActive={!small}
            message={
              <HoverMessage
                text={t(
                  'this_report_will_show_you_high_level_information',
                  'This report will show you high level information for your population regarding their performance cycle. Please filter and edit the page to show the most relevant information for your population',
                )}
                customStyles={hoverContainer}
              />
            }
          >
            <IconButton graphic='information' iconStyles={iconStyle} />
          </HoverContainer>

          <FilterOption
            focus={focus}
            customIcon={true}
            searchValue={searchValueFilterOption}
            onFocus={setFocus}
            withIcon={false}
            customStyles={{
              ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
              ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
            }}
            onChange={(e) => setSearchValueFilterOption(() => e.target.value)}
            onSettingsPress={() => {
              setFilterModal((prev) => !prev);
              setFocus(false);
            }}
            setSearchValueFilterOption={setSearchValueFilterOption}
            isDisabledSearch={false}
            isVisibleEdit={true}
            onEditPress={() => setShowModal(true)}
          />

          {filterModal && (
            <UnderlayModal
              onClose={() => setFilterModal(false)}
              styles={{ maxWidth: !mobileScreen ? '424px' : '100%' }}
            >
              {({ onClose }) => (
                <FilterModal
                  initialValues={initialValues}
                  onClose={onClose}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                  isCheckAll={isCheckAll}
                  setIsCheckAll={setIsCheckAll}
                />
              )}
            </UnderlayModal>
          )}

          <IconButton
            graphic='download'
            customVariantRules={{
              default: iconBtnStyle as Rule,
            }}
            iconStyles={iconDownloadStyle}
            onPress={() => navigate(buildPath(Page.REPORT_DOWNLOAD))}
          />
        </div>
      </div>
      <Report year={year} tiles={tiles} />
      {showModal && (
        <ReportModal
          tiles={tiles}
          onClose={(selectedCheckboxes = []) => {
            if (selectedCheckboxes.length) {
              setTiles(selectedCheckboxes.map((item) => item.label));
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

const iconDownloadStyle: Rule = () => ({
  height: '22px',
  position: 'relative',
});

const countStyles: Rule = ({ theme }) => ({
  position: 'absolute',
  bottom: '-30px',
  left: 0,
  fontWeight: theme.font.weight.regular,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  color: theme.colors.base,
});
const downloadWrapperStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
  marginBottom: '29px',
  position: 'relative',
} as Styles;

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '0',
  marginLeft: '5px',
  display: 'flex',
  height: '38px',
  width: '38px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  border: `2px solid ${theme.colors.tescoBlue}`,
  borderRadius: '20px',
  cursor: 'pointer',
  position: 'relative',
  '& > span': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const flexCenterStyled: Rule = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'space-between',
  height: '116px',
};

const spaceBetween: CreateRule<{ mediumScreen: boolean }> = ({ mediumScreen }) => {
  return {
    display: 'flex',
    flexWrap: mediumScreen ? 'wrap' : 'nowrap',
    ...(mediumScreen && { flexBasis: '250px' }),
    // Todo replace it in future due to applied filters
    // justifyContent: quantity ? 'space-between' : 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
};

const iconStyle: Rule = ({ theme }) => ({
  marginRight: theme.spacing.s2_5,
  marginTop: '5px',
});

const yearLabel: Rule = ({ theme }) => ({
  margin: `${theme.spacing.s0} ${theme.spacing.s0} 8px ${theme.spacing.s0}`,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  color: theme.colors.link,
});

const hoverContainer: Rule = () => ({
  position: 'absolute',
  bottom: '-8px',
  left: '50%',
  transform: 'translate(-95%, 100%)',
});

export default ReportPage;
