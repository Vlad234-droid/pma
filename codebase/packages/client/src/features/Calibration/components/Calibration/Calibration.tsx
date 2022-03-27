import React, { FC, useEffect, useState } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';

import { Trans, useTranslation } from 'components/Translation';
import Filters, { useSearch, FilterOption, FilterValues } from 'features/Filters';
import { TileWrapper } from 'components/Tile';
import SuccessModal from 'components/SuccessModal';
import { Employee } from 'config/types';
import { SuccessMark } from 'components/Icon';
import Spinner from 'components/Spinner';

import Widgets from '../Widgets';
import Colleagues from '../Colleagues';
import RatingsChart from '../RatingsChart';
import CompareModal from '../CompareModal';
import { getCompareOptions, getCompareData, getCurrentData } from '../../mock';

type Props = {
  loadData: (filters: FilterValues) => void;
  loadFilterOptions: () => void;
  colleagues?: Employee[];
  colleagueUuid?: string;
  filterOptions?: FilterOption[];
  loading: boolean;
};

const Calibration: FC<Props> = ({ loadData, loadFilterOptions, colleagueUuid, colleagues, filterOptions, loading }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [compareMode, setCompareMode] = useState<string>('None');
  const isCompareMode = compareMode !== 'None';
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setCompareModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useSearch();
  const compareOptions = getCompareOptions(t);
  const compareData = isCompareMode ? getCompareData(compareMode) : undefined;
  const graphData = getCurrentData();

  // TODO: use correct endpoint
  // TODO: load first 5 and on click 'see more' load next 25
  // TODO: add filters as params here
  useEffect(() => {
    if (colleagueUuid) loadData({});
  }, [colleagueUuid]);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const handleEditClick = () => {
    setEditMode((isEdit) => !isEdit);
  };

  const handleSaveRating = () => {
    setIsSuccessModalOpen(true);
  };

  const handleCompareClick = () => {
    setCompareModalOpen(true);
  };

  const handleSaveCompare = (compare: string) => {
    setCompareMode(compare);
    setCompareModalOpen(false);
  };

  const handleFilter = (filters: FilterValues) => {
    loadData(filters);
  };

  if (loading) {
    return <Spinner withText fullHeight />
  }

  return (
    <div>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        })}
      >
        <Filters
          searchValue={searchValue}
          onSearch={setSearchValue}
          filterOptions={filterOptions}
          onFilter={handleFilter}
        />
      </div>
      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap-reverse',
          gridGap: '8px',
          marginTop: '8px',
          alignItems: 'stretch',
        })}
      >
        <div className={css({ flex: '3 1 375px', display: 'flex', flexDirection: 'column', gap: '8px' })}>
          <TileWrapper>
            <RatingsChart currentData={graphData} compareData={compareData} />
          </TileWrapper>
          {!isCompareMode && (
            <div className={css(allColleagues)}>
              {colleagues?.length ? (
                <Colleagues editMode={isEditMode} colleagues={colleagues} onSave={handleSaveRating} />
              ) : (
                <TileWrapper>
                  <div className={css({ padding: '32px' })}>
                    <Trans i18nKey='no_results'>No results</Trans>
                  </div>
                </TileWrapper>
              )}
            </div>
          )}
        </div>
        <Widgets
          editMode={isEditMode}
          compareMode={isCompareMode}
          onEditClick={handleEditClick}
          onCompareClick={handleCompareClick}
        />
      </div>
      {isCompareModalOpen && (
        <CompareModal
          onClose={() => setCompareModalOpen(false)}
          onSave={handleSaveCompare}
          mode={compareMode}
          options={compareOptions}
        />
      )}
      {isSuccessModalOpen && (
        <SuccessModal
          title={t('calibration_updated', 'Calibration updated')}
          mark={<SuccessMark />}
          description={t(
            'saved_changes_to_calibration',
            'You have saved your changes to calibration. These changes will now be reflected on the colleague profile as a record.',
          )}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
    </div>
  );
};

const allColleagues: Rule = {
  paddingTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

export default Calibration;
