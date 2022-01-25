import React, { FC, useEffect, useState } from 'react';
import { Button, CreateRule, ModalWithHeader, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { chooseTemplateSchema } from 'pages/PerformanceCycle/schema';
import { useForm } from 'react-hook-form';
import { Icon } from 'components/Icon';
import { Input } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { DropZone } from 'components/DropZone';
import Upload from 'components/DropZone/Upload.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getProcessTemplateSelector } from '@pma/store/src/selectors/processTemplate';
import { currentUserSelector, PreviousReviewFilesActions } from '@pma/store';
import { useTranslation } from 'react-i18next';

type TemplateModalProps = {
  closeModal: () => void;
  selectTemplate: (value) => void;
};

const TemplatesModal: FC<TemplateModalProps> = ({ closeModal, selectTemplate }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const processTemplate = useSelector(getProcessTemplateSelector);
  const [templatesList, setTemplatesList] = useState([] as any);
  const { info: { colleagueUUID }, } = useSelector(currentUserSelector);

  useEffect(() => {
    setTemplatesList(processTemplate);
  }, []);

  const templateChooseMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(chooseTemplateSchema),
  });

  const onUpload = (file) => dispatch(PreviousReviewFilesActions.uploadFile({ file, colleagueUUID }));

  const { getValues } = templateChooseMethods;

  const handleSearchTemplate = () => {
    const searchValue = getValues('template_search').toLowerCase();
    const filtredTemplatesList = [] as any;
    processTemplate.map((item) => {
      const date = new Date(item?.createdTime);
      const createdTime = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      if (`${item.label.toLowerCase()}${createdTime}`.includes(searchValue)) {
        filtredTemplatesList.push(item);
      }
      return filtredTemplatesList;
    });
    setTemplatesList(filtredTemplatesList);
  };

  return (
    <ModalWithHeader
      containerRule={templatesModalWindowStyles({mobileScreen})}
      title='Choose Template'
      modalPosition='middle'
      closeOptions={{
        closeOptionContent: <Icon graphic='cancel' invertColors={true} />,
        closeOptionStyles: {},
        onClose: closeModal,
      }}
    >
      <div className={css(templatesModalContentWrapperStyles({mobileScreen}))}>
        <GenericItemField
          name={`template_search`}
          methods={templateChooseMethods}
          // Wrapper={({ children }) => (
          //   <Item label='Template search' withIcon={false}>
          //     {children}
          //   </Item>
          // )}
          Element={Input}
          placeholder={'Enter template name'}
          value={''}
          onChange={handleSearchTemplate}
        />

        <div className={css({ marginTop: '32px' })}>
          <DropZone onUpload={onUpload}>
            <img className={css({ maxWidth: 'inherit' })} src={Upload} alt='Upload' />
            <span className={css(labelStyles)}>{t('Drop file here or click to upload')}</span>
            <span className={css(descriptionStyles)}>{t('Maximum upload size 5MB')}</span>
          </DropZone>
        </div>

        <div className={css(templatesListStyles)}>
          {templatesList.map((item) => {
            const date = new Date(item?.createdTime);
            const createdTime = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            return (
              <div
                className={css(templatesListItemStyles)}
                key={Math.random()}
                onClick={() => selectTemplate(item.value)}
              >
                <div>
                  {item?.label}
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
        <div className={css(templatesModalFooter({mobileScreen}))}>
          <Button mode='inverse' onPress={closeModal} styles={[btnStyle]}>
            Close
          </Button>
        </div>
      </div>
    </ModalWithHeader>
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
    ...(mobileScreen ?
      {
        width: '100%',
        height: 'calc(100% - 50px)',
        marginTop: '50px',
      } : {
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
    positin: 'relative',
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
    ...(mobileScreen ? {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      height: '75px',
    } : {
      height: '100px',
      borderBottomRightRadius: '32px',
      borderBottomLeftRadius: '32px',
    })
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
