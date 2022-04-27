import React, { FC, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getReportMetaSelector, getLimitedWLProfilesSelector, getTotalWlSelector } from '@pma/store';

import Spinner from 'components/Spinner';
import InfiniteScrollLoad from 'components/InfinityScrollLoad';
import { Trans, useTranslation } from 'components/Translation';
import { Table } from 'components/Table';
import { useToast } from 'features/Toast';
import { IconButton } from 'components/IconButton';

import useQueryString from 'hooks/useQueryString';
import { useLimitedWl, getWLData } from './hooks';

import { getTableTitles } from '../../utils';
import { downloadCsvFile } from './utils';
import { getAdditionalFields } from './config';

export const WORK_LEVEL_CONTENT_WRAPPER = 'work-level-content-wraper';

const WorkLevelContent: FC<{ toggleFullView: Dispatch<SetStateAction<boolean>>; isFullView: boolean }> = ({
  toggleFullView,
  isFullView,
}) => {
  const query = useQueryString();
  const { t } = useTranslation();
  const { css } = useStyle();
  const { addToast } = useToast();

  const dispatch = useDispatch();

  useLimitedWl();

  const tableData = useSelector(getLimitedWLProfilesSelector) || [];
  const total = useSelector(getTotalWlSelector) || 0;
  const { loading, loaded } = useSelector(getReportMetaSelector);

  return (
    <div data-test-id={WORK_LEVEL_CONTENT_WRAPPER} className={css(workLevelContainer)}>
      {loading && !loaded ? (
        <div className={css(spinnerWrapper)}>
          <Spinner />
        </div>
      ) : (
        <>
          {!!tableData.length && (
            <>
              <div className={css(tableHeader)}>
                <span className={css(statusTitle)}>
                  <Trans i18nKey='approved'>Approved</Trans>
                </span>
                <div>
                  <IconButton
                    onPress={() => downloadCsvFile(t, addToast)}
                    graphic='download'
                    customVariantRules={{ default: iconButtonStyles }}
                    iconStyles={iconStyles}
                  >
                    <Trans i18nKey='download'>Download</Trans>
                  </IconButton>
                  <IconButton
                    onPress={() => {
                      toggleFullView((prev) => !prev);
                    }}
                    graphic='full'
                    customVariantRules={{ default: iconButtonStyles }}
                    iconStyles={iconStyles}
                    data-test-id={'full-button'}
                  >
                    {!isFullView ? (
                      <Trans i18nKey='full_view'>Full view</Trans>
                    ) : (
                      <Trans i18nKey='show_less'>Show less</Trans>
                    )}
                  </IconButton>
                </div>
              </div>

              <InfiniteScrollLoad
                render={() => <Table tableTitles={getTableTitles(t)} currentItems={tableData} />}
                loadMore={(_limit, _start) => {
                  getWLData({ _limit, _start, ...getAdditionalFields(query) }, dispatch);
                }}
                loading={loading}
                limit={18}
                hasMore={!(tableData.length === total)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: theme.spacing.s2_5,
  color: theme.colors.tescoBlue,
  fontWeight: 700,
});
const workLevelContainer: Rule = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '24px',
  width: '100%',
};
const tableHeader: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px',
};
const spinnerWrapper: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const iconStyles: Rule = ({ theme }) => ({
  marginRight: theme.spacing.s2_5,
});
const statusTitle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  color: theme.colors.base,
  fontWeight: theme.font.weight.bold,
});

export default WorkLevelContent;
