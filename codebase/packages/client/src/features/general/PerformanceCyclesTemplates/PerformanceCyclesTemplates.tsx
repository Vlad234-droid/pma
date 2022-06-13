import React, { FC, useEffect, useState, useCallback } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { ProcessTemplateActions, getProcessTemplateSelector, getProcessTemplateMetaSelector } from '@pma/store';
import { formatDateStringFromISO } from 'utils/date';
import { FilterOption } from 'features/general/Shared';
import { IconButton } from 'components/IconButton';
import { ConfirmModal } from 'features/general/Modal';
import { Trans, useTranslation } from 'components/Translation';
import { DropZone } from 'components/DropZone';
import Spinner from 'components/Spinner';
import { FilterModal } from '../Shared/components/FilterModal';
import {
  getSortString,
  PERFOMANCE_WRAPPER,
  FILTER_MODAL_ID,
  SETTINGS_BTN_ID,
  WRAPPER_INPUT_ID,
  INPUT_TEST_ID,
  initialFilters,
  DeleteStatuses,
  exceptableFiles,
  filterFileType,
  FilterType,
  checkForExtenstion,
  setAdditionalFields,
} from './config';
import { getFileType } from 'utils/file';
import Upload from 'images/Upload.svg';
import { BASE_URL_API } from 'config/constants';
import { useToast, Variant } from 'features/general/Toast';

type File = {
  createdTime: string;
  fileName: string;
  label: string;
  path: string;
  value: string;
  version: number;
};

const PerformanceCyclesTemplates: FC = () => {
  const { addToast } = useToast();
  const { t } = useTranslation();
  const { css, matchMedia } = useStyle();
  const small = matchMedia({ xSmall: true, small: true }) || false;
  const dispatch = useDispatch();
  const templatesList = useSelector(getProcessTemplateSelector) || [];
  const meta = useSelector(getProcessTemplateMetaSelector);

  const [sortModal, setSortModal] = useState(false);
  const [extensionModal, setExtensionModal] = useState(false);
  const [focus, setFocus] = useState(false);
  const [filter, setFilter] = useState<FilterType>(initialFilters);

  const [modalStatus, setModalStatus] = useState<DeleteStatuses>(DeleteStatuses.PENDING);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const processTemplatePayload = (filter) => {
    return {
      ...(filter.search.length > 2 && { _search: filter.search }),
      _sort: getSortString(filter.sort),
      type: filterFileType(filter.extension)?.toString(),
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
    const toDelete = selectedFile?.version === 1;
    const payload = {
      deletePayload: {
        ...(toDelete
          ? { fileUuid: selectedFile?.value }
          : { path: selectedFile?.path, fileName: selectedFile?.fileName }),
      },
      processTemplatePayload: processTemplatePayload(filter),
    };
    toDelete
      ? dispatch(ProcessTemplateActions.deleteProcessTemplate(payload))
      : dispatch(ProcessTemplateActions.deleteAllProcessTemplate(payload));
  };

  const onUpload = (file) => {
    if (!checkForExtenstion(file.name))
      return addToast({
        id: Date.now().toString(),
        title: t('file_extension_is_not_allowed', 'File extension is not allowed'),
        variant: Variant.ERROR,
        description: t('please_select_another_file_extension', 'Please select another file extension'),
      });

    setFilter(initialFilters);
    if (focus) setFocus(false);
    dispatch(
      ProcessTemplateActions.uploadProcessTemplate({
        file,
        type: getFileType(file.name),
      }),
    );
  };

  return (
    <div data-test-id={PERFOMANCE_WRAPPER}>
      <div className={css(filterIconStyled({ small }))}>
        <div className={css(containerWrapper({ small }))}>
          <DropZone onUpload={onUpload} styles={{ width: '270px' }} accept={exceptableFiles}>
            <img className={css({ maxWidth: 'inherit' })} src={Upload} alt='Upload' />
            <span className={css(labelStyles)}>{t('Drop file here or click to upload')}</span>
            <span className={css(descriptionStyles)}>{t('Maximum upload size 5MB')}</span>
          </DropZone>
        </div>
        <div className={css(containerWrapper({ small }))}>
          <IconButton
            //TODO: replace settings to another icon, when it will be available
            graphic='settings'
            customVariantRules={{
              default: iconBtnStyle({ isActive: !!filter.extension }),
            }}
            iconStyles={iconStyle}
            iconProps={{
              invertColors: !!filter.extension,
            }}
            onPress={() => {
              setExtensionModal((prev) => !prev);
              setSortModal(false);
            }}
          />
          <FilterOption
            focus={focus}
            customIcon={true}
            onFocus={setFocus}
            searchValue={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            hasActiveFilter={!!filter.sort || !!filter.search}
            withIcon={false}
            customStyles={{
              ...(focus
                ? { padding: '10px 20px 10px 16px', borderRadius: '50px' }
                : { padding: 0, transitionDelay: '.3s' }),
            }}
            onSettingsPress={() => {
              setSortModal((prev) => !prev);
              setExtensionModal(false);
            }}
            testSettingsId={SETTINGS_BTN_ID}
            wrapperInputId={WRAPPER_INPUT_ID}
            inputTestId={INPUT_TEST_ID}
          />
          {Object.values(filter).some((f) => f) && (
            <IconButton
              graphic='cancel'
              customVariantRules={{
                default: iconBtnStyle({ isActive: false }),
              }}
              iconStyles={{
                ...iconStyle,
                top: '0px',
                left: '0px',
              }}
              iconProps={{
                invertColors: false,
              }}
              onPress={() => {
                setFilter(initialFilters);
                setFocus(false);
              }}
            />
          )}
          <FilterModal
            isOpen={sortModal}
            filter={filter}
            setFilter={setFilter}
            toggleOpen={setSortModal}
            testId={FILTER_MODAL_ID}
          />

          <FilterModal
            isOpen={extensionModal}
            filter={filter}
            setFilter={setFilter}
            toggleOpen={setExtensionModal}
            customFields={true}
            additionalFields={setAdditionalFields(filter.extension)}
            title='Filter by file extensions'
          />
        </div>
      </div>
      <div className={css(templatesListStyles)}>
        {!meta?.loaded ? (
          <Spinner />
        ) : (
          <>
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
          </>
        )}
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
              setSelectedFile(() => null);
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
            setSelectedFile(() => null);
          }}
          visibleCancelBtn={!(modalStatus === DeleteStatuses.SUBMITTED)}
        />
      )}
    </div>
  );
};

const iconStyle: Rule = {
  width: '16px',
  height: '16px',
  position: 'relative',
  top: '2px',
  left: '2px',
};

const iconBtnStyle: CreateRule<{ isActive: boolean }> =
  ({ isActive }) =>
  ({ theme }) => ({
    background: isActive ? theme.colors.tescoBlue : theme.colors.white,
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
    borderBottom: '2px solid #ddd',
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
    fontSize: theme.font.fixed.f14.fontSize,
    marginRight: theme.spacing.s4,
  };
};

export default PerformanceCyclesTemplates;
