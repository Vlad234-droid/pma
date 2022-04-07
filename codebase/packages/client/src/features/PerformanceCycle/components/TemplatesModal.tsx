import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CreateRule, ModalWithHeader, Rule, useStyle } from '@pma/dex-wrapper';
import { Icon } from 'components/Icon';
import { Input } from 'components/Form';
import { DropZone } from 'components/DropZone';
import Upload from 'images/Upload.svg';
import { useTranslation } from 'components/Translation';
import { ProcessTemplateActions, getProcessTemplateSelector } from '@pma/store';
import { formatDateStringFromISO } from 'utils/date';
import { getFileType } from 'utils/file';

type TemplateModalProps = {
  onSelect: (value) => void;
};

const TemplatesModal: FC<TemplateModalProps> = ({ onSelect }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isOpen, toggleOpen] = useState(false);
  const [filter, setFilteredValue] = useState('');
  const templatesList = useSelector(getProcessTemplateSelector) || [];

  useEffect(() => {
    dispatch(
      ProcessTemplateActions.getProcessTemplate({
        path_eq: 'cycles',
        type_eq: 1,
      }),
    );
  }, []);

  const filteredTemplates = templatesList?.filter((item) => {
    const createdTime = formatDateStringFromISO(item.createdTime, 'MM/dd/yyyy');
    if (!filter || item.fileName.toLowerCase().includes(filter.toLowerCase()) || createdTime.includes(filter))
      return item;
  });

  const handleUpload = (file) => {
    dispatch(
      ProcessTemplateActions.uploadProcessTemplate({
        file,
        type: getFileType(file.name),
      }),
    );
  };

  const handleSearchTemplate = ({ target }) => setFilteredValue(target.value);

  return (
    <>
      <Button onPress={() => toggleOpen(true)}>Choose Template</Button>
      {isOpen && (
        <ModalWithHeader
          containerRule={templatesModalWindowStyles({ mobileScreen })}
          title={t('choose_template', 'Choose Template')}
          modalPosition='middle'
          closeOptions={{
            closeOptionContent: <Icon graphic='cancel' invertColors={true} />,
            closeOptionStyles: {},
            onClose: () => toggleOpen(false),
          }}
        >
          <div className={css(templatesModalContentWrapperStyles({ mobileScreen }))}>
            <Input placeholder={t('enter_template_name', 'Enter template name')} onChange={handleSearchTemplate} />

            <div className={css({ marginTop: '32px' })}>
              <DropZone onUpload={handleUpload}>
                <img className={css({ maxWidth: 'inherit' })} src={Upload} alt='Upload' />
                <span className={css(labelStyles)}>{t('drop_file_here', 'Drop file here or click to upload')}</span>
                <span className={css(descriptionStyles)}>
                  {t('maximum_upload_size', 'Maximum upload size 5MB', { maxSize: '5MB' })}
                </span>
              </DropZone>
            </div>

            <div className={css(templatesListStyles)}>
              {filteredTemplates.map((item, idx) => {
                const createdTime = formatDateStringFromISO(item.createdTime, 'MM/dd/yyyy');
                return (
                  <div
                    key={idx}
                    className={css(templatesListItemStyles)}
                    onClick={() => {
                      onSelect(item);
                      toggleOpen(false);
                    }}
                  >
                    <div>
                      {item?.description}
                      <div className={css(row)}>
                        {' '}
                        {item?.fileName} {item?.path}
                      </div>
                    </div>
                    <div className={css(timeStyles)}>{createdTime}</div>
                  </div>
                );
              })}
            </div>
            <div className={css(templatesModalFooter({ mobileScreen }))}>
              <Button mode='inverse' onPress={() => toggleOpen(false)} styles={[btnStyle]}>
                Close
              </Button>
            </div>
          </div>
        </ModalWithHeader>
      )}
    </>
  );
};

const btnStyle: Rule = ({ theme }) => ({
  fontSize: '16px',
  border: `1px solid ${theme.colors.tescoBlue}`,
  minWidth: '200px',
});

const labelStyles: Rule = ({ theme }) => ({
  fontSize: '16px',
  color: theme.colors.tescoBlue,
  margin: '8px 0',
});
const descriptionStyles: Rule = ({ theme }) => ({
  fontSize: '12px',
  color: theme.colors.tescoBlue,
});

const templatesModalWindowStyles: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => {
  return {
    padding: 0,
    ...(mobileScreen
      ? {
          width: '100%',
          height: 'calc(100% - 50px)',
          marginTop: '50px',
        }
      : {
          width: '60%',
          height: 'calc(100% - 100px)',
          marginTop: 0,
        }),
  };
};

const templatesModalContentWrapperStyles: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: mobileScreen ? '30px 20px 60px' : '40px 40px 100px',
    position: 'relative',
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
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
};

const templatesModalFooter: CreateRule<{ mobileScreen }> = ({ mobileScreen }) => {
  return {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(mobileScreen
      ? {
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          height: '75px',
        }
      : {
          height: '100px',
          borderBottomRightRadius: '32px',
          borderBottomLeftRadius: '32px',
        }),
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
  };
};

export default TemplatesModal;
