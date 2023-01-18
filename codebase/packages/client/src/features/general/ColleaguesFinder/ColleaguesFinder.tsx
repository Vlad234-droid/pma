import React, { FC, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStyle } from '@pma/dex-wrapper';
import { ColleaguesSimpleFinder } from 'components/ColleaguesSimpleFinder';
import { buildPath, buildPathWithParams } from '../Routes';
import { paramsReplacer } from 'utils';
import useSearchColleaguesSimple from './hook/useSearchColleaguesSimple';
import { Page } from 'pages';
import { useDispatch, useSelector } from 'react-redux';
import {
  colleagueCurrentCycleSelector,
  CalibrationReviewAction,
  calibrationReviewDataSelector,
  calibrationReviewMetaSelector,
} from '@pma/store';

const ColleaguesFinder: FC = () => {
  const { theme } = useStyle();
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { colleagues, handleSearchColleagues, clearColleagueList } = useSearchColleaguesSimple({}, uuid);
  const searchRef = useRef<any>(null);
  const [focused, setFocused] = useState(false);
  const [selectedColleague, setSelectedColleague] = useState<string | null>(null);
  const { loading, loaded } = useSelector(calibrationReviewMetaSelector);
  const calibrationReview = useSelector(calibrationReviewDataSelector(selectedColleague || '')) || {};
  const currentCycle = useSelector(colleagueCurrentCycleSelector(selectedColleague || ''));

  const onFocus = () => setFocused(true);
  const onBlur = () => {
    setFocused(false);
    clearColleagueList();
  };

  useEffect(() => {
    return () => {
      setFocused(false);
      clearColleagueList();
    };
  }, []);

  useEffect(() => {
    searchRef.current.value = '';
  }, [focused]);

  useEffect(() => {
    if (selectedColleague) {
      dispatch(
        CalibrationReviewAction.getCalibrationReview({
          colleagueUuid: selectedColleague,
          cycleUuid: currentCycle || 'CURRENT',
        }),
      );
    }
  }, [selectedColleague, currentCycle]);

  useEffect(() => {
    if (selectedColleague && loaded && !loading) {
      navigate(
        buildPathWithParams(
          buildPath(
            paramsReplacer(Page.CREATE_CALIBRATION_RATING, {
              ':userUuid': selectedColleague,
              ':uuid': calibrationReview?.uuid || 'new',
            }),
          ),
          calibrationReview?.uuid ? { sessionMode: 'true' } : {},
        ),
        {
          state: {
            backPath: pathname,
          },
        },
      );
    }
  }, [loaded, loading]);

  return (
    <ColleaguesSimpleFinder
      domRef={searchRef}
      onSelect={setSelectedColleague}
      selected={[]}
      value={''}
      inputStyles={{
        ...(focused ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
        ...(focused ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
        ...(focused ? { width: '500px' } : { width: '40px' }),
        //@ts-ignore
        ...(!focused && { borderRadius: '50%', padding: '0px' }),
        height: '40px',
        border: '2px solid rgb(0, 83, 159)',
        cursor: 'pointer',
        background: theme.colors.backgroundDark,
      }}
      placeholder={focused ? 'search' : ''}
      customIcon={true}
      colleagues={colleagues}
      handleSearchColleagues={handleSearchColleagues}
      clearColleagueList={clearColleagueList}
      onBlur={onBlur}
      onFocus={onFocus}
      multiple={false}
    />
  );
};

export default ColleaguesFinder;
