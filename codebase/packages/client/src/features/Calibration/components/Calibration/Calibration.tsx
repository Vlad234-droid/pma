import React, { FC, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useStyle, Rule } from '@dex-ddl/core';
import { colleagueUUIDSelector, getAllEmployees, ManagersActions } from '@pma/store';

import { useTranslation } from 'components/Translation';
import useDispatch from 'hooks/useDispatch';
import Filters, { getEmployeesSortingOptions, useSearchFilter, useSortFilter } from 'features/Filters';
import { TileWrapper } from 'components/Tile';
import SuccessModal from 'components/SuccessModal';

import Widgets from '../Widgets';
import Colleagues from '../Colleagues';
import Graph from '../Graph';
import CompareModal from '../CompareModal';

const Calibration: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [compareMode, setCompareMode] = useState<string>('None');
  const isCompareMode = compareMode !== 'None';
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setCompareModalOpen] = useState<boolean>(false);
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const dispatch = useDispatch();
  // TODO: filters on be part
  const [sortValue, setSortValue] = useSortFilter();
  const [searchValue, setSearchValue] = useSearchFilter();
  const options = getEmployeesSortingOptions(t);
  // @ts-ignore
  const colleagues = useSelector((state) => getAllEmployees(state, searchValue, sortValue), shallowEqual) || [];

  // TODO: use correct endpoint
  // TODO: load first 5 and on click 'see more' load next 25
  useEffect(() => {
    if (colleagueUuid) dispatch(ManagersActions.getManagers({ colleagueUuid }));
  }, [colleagueUuid]);

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

  return (
    <div>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        })}
      >
        <Filters
          sortValue={sortValue}
          onSort={setSortValue}
          searchValue={searchValue}
          onSearch={setSearchValue}
          sortingOptions={options}
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
            <Graph />
          </TileWrapper>
          {!isCompareMode && (
            <div className={css(allColleagues)}>
              {colleagues.length ? (
                <Colleagues editMode={isEditMode} colleagues={colleagues} onSave={handleSaveRating} />
              ) : (
                <TileWrapper>
                  <div className={css({ padding: '32px' })}>
                    No results
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
        />
      )}
      {isSuccessModalOpen && (
        <SuccessModal
          withСheckMark
          description={t('saved_changes_to_calibration', 'You have saved your changes to calibration. These changes will now be reflected on the colleague profile as a record.')}
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
