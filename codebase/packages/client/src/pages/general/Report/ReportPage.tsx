import React, { FC, useState, useMemo, useEffect } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { totalColleaguesSelector } from '@pma/store';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { ReportModal } from 'features/general/Report/Modals';
import { FilterOption } from 'features/general/Shared';
import { buildPath } from 'features/general/Routes';
import { Trans, useTranslation } from 'components/Translation';
import { ColleaguesCount } from 'components/ColleaguesCount';
import { HoverContainer } from 'components/HoverContainer';
import { HoverMessage } from 'components/HoverMessage';
import UnderlayModal from 'components/UnderlayModal';
import { IconButton } from 'components/IconButton';
import FilterForm, { defaultFilters } from 'components/FilterForm';
import ViewItems from 'components/ViewItems';
import { Select } from 'components/Form';

import { getCurrentValue, getFieldOptions } from 'features/general/Report/config';
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

const ReportPage: FC = () => {
  const query = useQueryString() as Record<string, string | number>;
  const { t } = useTranslation();
  const tenant = useTenant();
  const { state } = useLocation();
  const { filters } = (state as any) || {};
  const navigate = useNavigate();

  const { css, matchMedia } = useStyle();
  const small = matchMedia({ xSmall: true, small: true }) || false;
  const mediumScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const [focus, setFocus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState('');
  const [isVisibleFilterModal, setFilterModal] = useState<boolean>(false);
  const [year, setYear] = useState<string>('');
  const [tiles, setTiles] = useState<Array<string>>(filters || []);
  const [savedFilter, setSavedFilter] = useState<any>(null);

  const totalColleagues = useSelector(totalColleaguesSelector) ?? 0;

  const changeYearHandler = (value) => {
    if (!value) return;
    setYear(value);
  };

  const Report = useMemo(
    () => React.lazy(() => import(`features/${tenant}/Report`).then((module) => ({ default: module.default }))),
    [],
  );

  const appliedFilters = useMemo(() => {
    return (
      savedFilter &&
      //@ts-ignore
      Object.entries(savedFilter).reduce((acc, [key, value]) => {
        //@ts-ignore
        if (Object.values(value).some((checked) => checked)) return [...acc, key];
        return acc;
      }, [])
    );
  }, [savedFilter]);

  return (
    <div className={css({ margin: '22px 42px 110px 40px' })}>
      {!!appliedFilters && !!appliedFilters?.length && (
        <ViewItems
          onClose={(item) =>
            //TODO: dispatch filters without item checkboxes
            setSavedFilter((prev) => ({
              ...prev,
              [item]: prev[item].map((item) => ({ ...item, checked: false })),
            }))
          }
          items={appliedFilters}
        />
      )}
      <div className={css(spaceBetween({ mediumScreen }))}>
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
            count={totalColleagues}
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

          {isVisibleFilterModal && (
            <UnderlayModal
              onClose={() => setFilterModal(false)}
              styles={{ maxWidth: !mobileScreen ? '500px' : '100%' }}
            >
              {({ onClose }) => (
                <FilterForm
                  defaultValues={savedFilter}
                  onCancel={onClose}
                  filters={defaultFilters}
                  onSubmit={(data) => {
                    onClose();
                    setTimeout(() => setSavedFilter(data), 300);
                  }}
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
      <Report year={year} tiles={tiles} savedFilter={savedFilter} />
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
  whiteSpace: 'nowrap',
});
const downloadWrapperStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
  flexBasis: '202px',
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
  margin: '20px 0px',
};

const spaceBetween: CreateRule<{ mediumScreen: boolean }> = ({ mediumScreen }) => {
  return {
    display: 'flex',
    flexWrap: mediumScreen ? 'wrap' : 'nowrap',
    // ...(mediumScreen && { flexBasis: '250px' }),
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
