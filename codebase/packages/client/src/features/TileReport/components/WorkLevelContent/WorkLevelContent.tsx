import React from 'react';
import { useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getReportMetaSelector, getWorkLevelProfilesSelector } from '@pma/store';

import Spinner from 'components/Spinner';
import TablePaginator from 'components/TablePaginator';
import { Trans, useTranslation } from 'components/Translation';
import { Table } from 'components/Table';
import { useToast } from 'features/Toast';
import { IconButton } from 'components/IconButton';

import { getTableTitles } from '../../utils';
import { downloadCsvFile } from './utils';

const WorkLevelContent = () => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const { addToast } = useToast();
  const tableData = useSelector(getWorkLevelProfilesSelector) || [];
  const { loading, loaded } = useSelector(getReportMetaSelector);
  const itemsPerPage = 10;

  return (
    <div className={css({ display: 'flex', flexDirection: 'column', marginTop: '24px', width: '100%' })}>
      {loading && !loaded ? (
        <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
          <Spinner />
        </div>
      ) : (
        <>
          {!!tableData.length && (
            <>
              <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
                <span className={css(statusTitle)}>
                  <Trans i18nKey='approved'>Approved</Trans>
                </span>
                <IconButton
                  onPress={() => downloadCsvFile(t, addToast)}
                  graphic='download'
                  customVariantRules={{ default: iconButtonStyles }}
                  iconStyles={iconStyles}
                >
                  <Trans i18nKey='download'>Download</Trans>
                </IconButton>
              </div>
              {!!tableData.length && (
                <TablePaginator
                  itemsPerPage={itemsPerPage}
                  data={tableData}
                  Element={Table}
                  tableTitles={getTableTitles(t)}
                />
              )}
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

const iconStyles: Rule = ({ theme }) => ({
  marginRight: theme.spacing.s2_5,
});
const statusTitle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: '22px',
  color: theme.colors.base,
});

export default WorkLevelContent;
