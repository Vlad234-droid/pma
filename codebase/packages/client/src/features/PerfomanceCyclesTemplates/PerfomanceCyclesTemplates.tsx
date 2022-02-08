import React, { FC, useEffect, useState, useCallback } from 'react';
import { CreateRule, Rule, useStyle, useBreakpoints } from '@dex-ddl/core';

import debounce from 'lodash.debounce';

import { useDispatch, useSelector } from 'react-redux';
import { getProcessTemplateSelector } from '@pma/store/src/selectors/processTemplate';
import { ProcessTemplateActions } from '@pma/store';

import { formatDateStringFromISO } from 'utils/date';
import { FilterOption } from 'features/Shared';
import { IconButton } from 'components/IconButton';
import { ConfirmModal } from 'features/Modal';
import { Trans, useTranslation } from 'components/Translation';
import { DropZone } from 'components/DropZone';
import { FilterModal } from '../Shared/components/FilterModal';

import Upload from 'images/Upload.svg';

import { BASE_URL_API } from 'config/constants';

enum DeleteStatuses {
  PENDING = 'PENDING',
  CONFIRMING = 'CONFIRMING',
  SUBMITTED = 'SUBMITTED',
}

export const getSortString = (filter: any) => {
  if (filter.newToOld) return 'created-time:DESC';
  if (filter.oldToNew) return 'created-time:ASC';
  if (filter.AZ) return 'file-name:ASC';
  if (filter.ZA) return 'file-name:DESC';
  return undefined;
};

const initialFilters = {
  AZ: false,
  ZA: false,
  newToOld: false,
  oldToNew: false,
  search: '',
};

const PerfomanceCyclesTemplates: FC = () => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const templatesList = useSelector(getProcessTemplateSelector) || [];
  const [filterModal, setFilterModal] = useState(false);

  const small = isBreakpoint.small || isBreakpoint.xSmall;

  const [focus, setFocus] = useState(false);
  const [filter, setFilter] = useState<any>(initialFilters);

  const [modalStatus, setModalStatus] = useState<DeleteStatuses>(DeleteStatuses.PENDING);
  const [selectedFile, setSelectedFile] = useState<Record<string, string>>({});

  const hasActiveFilter = Object.values(filter).some((f) => f);

  const processTemplatePayload = (filter) => {
    return {
      type: '1',
      status: '2',
      ...(filter.search.length > 2 && { _search: filter.search }),
      _sort: getSortString(filter),
    };
  };

  const getAllTemplates = useCallback(
    debounce((filter) => {
      dispatch(ProcessTemplateActions.getProcessTemplate(processTemplatePayload(filter)));
    }, 300),
    [],
  );

  useEffect(() => {
    getAllTemplates(filter);
  }, [filter]);

  const downloadFile = (uuid) => `${BASE_URL_API}/files/${uuid}/download`;

  const deleteFileHandler = () => {
    const payload = {
      deletePayload: {
        fileUuid: selectedFile.value,
      },
      processTemplatePayload: processTemplatePayload(filter),
    };
    dispatch(ProcessTemplateActions.deleteProcessTemplate(payload));
  };

  const onUpload = (file) => {
    dispatch(ProcessTemplateActions.uploadProcessTemplate({ file }));
  };

  return (
    <div>
      <div className={css(filterIconStyled({ small }))}>
        <div className={css(containerWrapper({ small }))}>
          <DropZone onUpload={onUpload} styles={{ width: '270px' }}>
            <img className={css({ maxWidth: 'inherit' })} src={Upload} alt='Upload' />
            <span className={css(labelStyles)}>{t('Drop file here or click to upload')}</span>
            <span className={css(descriptionStyles)}>{t('Maximum upload size 5MB')}</span>
          </DropZone>
        </div>
        <div className={css(containerWrapper({ small }))}>
          <FilterOption
            focus={focus}
            customIcon={true}
            onFocus={setFocus}
            searchValue={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            hasActiveFilter={hasActiveFilter}
            withIcon={false}
            customStyles={{
              ...(focus
                ? { padding: '10px 20px 10px 16px', borderRadius: '50px' }
                : { padding: 0, transitionDelay: '.3s' }),
            }}
            onSettingsPress={() => {
              setFilterModal((prev) => !prev);
            }}
          />
          <FilterModal isOpen={filterModal} filter={filter} setFilter={setFilter} toggleOpen={setFilterModal} />
        </div>
      </div>
      <div className={css(templatesListStyles)}>
        {templatesList.map((item) => {
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
                <a href={downloadFile(value)} download>
                  <IconButton iconProps={{ title: 'Download' }} graphic='download' />
                </a>

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
  return {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: small ? 'column' : 'row',
    gap: small ? '16px' : '0px',
    ...(!small && { justifyContent: 'space-between' }),
  };
};
const containerWrapper: CreateRule<{ small: boolean }> = ({ small }) => {
  return {
    display: 'flex',
    position: 'relative',
    ...(small && { alignSelf: 'flex-start' }),
  };
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

const labelStyles: Rule = ({ theme }) => ({
  fontSize: '16px',
  color: theme.colors.tescoBlue,
  margin: '8px 0',
});
const descriptionStyles: Rule = ({ theme }) => ({
  fontSize: '12px',
  color: theme.colors.tescoBlue,
});

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

export default PerfomanceCyclesTemplates;
