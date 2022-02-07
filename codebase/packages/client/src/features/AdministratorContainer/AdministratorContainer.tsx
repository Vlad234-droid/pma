import React, { FC, useEffect, useState } from 'react';
import { CreateRule, Rule, useStyle, useBreakpoints } from '@dex-ddl/core';

import { useDispatch, useSelector } from 'react-redux';
import { getProcessTemplateSelector } from '@pma/store/src/selectors/processTemplate';
import { configEntriesMetaSelector } from '@pma/store/src/selectors/config-entries';
import { ProcessTemplateActions } from '@pma/store';

import { formatDateStringFromISO } from 'utils/date';
import { FilterOption } from 'features/Shared';
import { IconButton } from 'components/IconButton';
import { ConfirmModal } from 'features/Modal';
import { Trans } from 'components/Translation';

import { BASE_URL_API } from 'config/constants';

enum DeleteStatuses {
  PENDING = 'PENDING',
  CONFIRMING = 'CONFIRMING',
  SUBMITTED = 'SUBMITTED',
}

const initialFilters = {
  search: '',
};

const AdministratorContainer: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const { loaded } = useSelector(configEntriesMetaSelector) || {};
  const templatesList = useSelector(getProcessTemplateSelector) || [];
  const small = isBreakpoint.small || isBreakpoint.xSmall;
  const [focus, setFocus] = useState(false);
  const [filter, setFilter] = useState<any>(initialFilters);

  const [modalStatus, setModalStatus] = useState<DeleteStatuses>(DeleteStatuses.PENDING);
  const [selectedFile, setSelectedFile] = useState<Record<string, string>>({});

  const filteredTemplates = templatesList?.filter((item) => {
    const createdTime = formatDateStringFromISO(item.createdTime, 'MM/dd/yyyy');
    if (filter.search.length > 2) {
      if (item.fileName.toLowerCase().includes(filter.search.toLowerCase()) || createdTime.includes(filter.search)) {
        return item;
      }
    } else {
      return templatesList;
    }
  });

  const hasActiveFilter = Object.values(filter).some((f) => f);

  useEffect(() => {
    if (!loaded) {
      dispatch(ProcessTemplateActions.getProcessTemplate({ type: '1', status: '2' }));
    }
  }, [loaded]);

  const getDownloadHref = (uuid) => `${BASE_URL_API}/files/${uuid}/download`;

  const downloadFile = ({ value: uuid, label }) => {
    const href = getDownloadHref(uuid);
    const a = document.createElement('a');
    a.href = href;
    a.download = label;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const deleteFileHandler = () => {
    const payload = {
      deletePayload: {
        fileUuid: selectedFile.value,
      },
      processTemplatePayload: {
        type: '1',
        status: '2',
      },
    };
    dispatch(ProcessTemplateActions.deleteProcessTemplate(payload));
  };

  return (
    <div>
      <div className={css(filterIconStyled({ small }))}>
        <FilterOption
          focus={focus}
          customIcon={true}
          onFocus={setFocus}
          searchValue={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          hasActiveFilter={hasActiveFilter}
          withIcon={false}
          customStyles={{
            ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: 0 }),
            ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
          }}
          visibleSettings={false}
          marginLeftAuto={true}
        />
      </div>
      <div className={css(templatesListStyles)}>
        {filteredTemplates.map((item) => {
          const { value } = item;

          const createdTime = formatDateStringFromISO(item.createdTime, 'MM/dd/yyyy');
          return (
            <div className={css(templatesListItemStyles)} key={value}>
              <div>
                {item?.label}
                <div className={css(row)}>
                  {item?.fileName} {item?.path}
                </div>
              </div>
              <div className={css(dateWrapper)}>
                <div className={css(timeStyles)}>{createdTime}</div>

                <IconButton
                  iconProps={{ title: 'Download' }}
                  graphic='download'
                  onPress={() => {
                    downloadFile(item);
                  }}
                />

                <IconButton
                  iconStyles={{ marginLeft: '10px' }}
                  iconProps={{ title: 'Delete' }}
                  graphic='delete'
                  onPress={() => {
                    setModalStatus(() => DeleteStatuses.CONFIRMING);
                    setSelectedFile(() => item);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {(modalStatus === DeleteStatuses.CONFIRMING || modalStatus === DeleteStatuses.SUBMITTED) && (
        <ConfirmModal
          title={
            modalStatus === DeleteStatuses.CONFIRMING
              ? 'Are you sure you want to delete the selected performance template?'
              : `${selectedFile?.label} was successfully deleted.`
          }
          description={modalStatus === DeleteStatuses.CONFIRMING ? selectedFile?.label : ''}
          onCancel={() => {
            setModalStatus(() => DeleteStatuses.PENDING);
          }}
          onSave={() => {
            if (modalStatus === DeleteStatuses.CONFIRMING) {
              setModalStatus(() => DeleteStatuses.SUBMITTED);
              deleteFileHandler();
            } else {
              setModalStatus(() => DeleteStatuses.PENDING);
              setSelectedFile(() => ({}));
            }
          }}
          submitBtnTitle={
            modalStatus !== DeleteStatuses.SUBMITTED ? (
              <Trans i18nKey='confirm'>Confirm</Trans>
            ) : (
              <Trans i18nKey='Okay'>Okay</Trans>
            )
          }
          onOverlayClick={() => {
            setModalStatus(() => DeleteStatuses.PENDING);
            setSelectedFile(() => ({}));
          }}
          visibleCancelBtn={!(modalStatus === DeleteStatuses.SUBMITTED)}
        />
      )}
    </div>
  );
};

const dateWrapper: Rule = {
  display: 'flex',
};

const filterIconStyled: CreateRule<{ small: boolean }> = ({ small }) => {
  return {};
};

const templatesListStyles: Rule = () => ({
  margin: '25px 0 0',
  height: '100%',
  overflowY: 'scroll',
});

const templatesListItemStyles: Rule = () => {
  return {
    padding: '15px 0',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
};

const row: Rule = ({ theme }) => {
  return {
    fontSize: `${theme.font.fixed.f12}`,
    color: theme.colors.tescoBlue,
  };
};

const timeStyles: Rule = ({ theme }) => {
  return {
    fontSize: `${theme.font.fixed.f14}`,
    marginRight: `${theme.spacing.s4}`,
  };
};

export default AdministratorContainer;
