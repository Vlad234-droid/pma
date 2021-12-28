import React, { FC, useEffect, useState } from 'react';
import { Button, ModalWithHeader, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { chooseTemplateSchema } from 'pages/PerformanceCycle/schema';
import { useForm } from 'react-hook-form';
import { Icon } from 'components/Icon';
import { Input } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { useSelector } from 'react-redux';
import { getProcessTemplateSelector } from '@pma/store/src/selectors/processTemplate';

type TemplateModalProps = {
  closeModal: () => void;
  selectTemplate: (value) => void;
};

const TemplatesModal: FC<TemplateModalProps> = ({ closeModal, selectTemplate }) => {
  const { css } = useStyle();
  const processTemplate = useSelector(getProcessTemplateSelector);
  const [templatesList, setTemplatesList] = useState([] as any);

  useEffect(() => {
    setTemplatesList(processTemplate);
  }, []);

  const templateChooseMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(chooseTemplateSchema),
  });

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
      containerRule={templatesModalWindowStyles}
      title='Choose Template'
      modalPosition='middle'
      closeOptions={{
        closeOptionContent: <Icon graphic='cancel' invertColors={true} />,
        closeOptionStyles: {},
        onClose: closeModal,
      }}
    >
      <div className={css(templatesModalContentWrapperStyles)}>
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
        <div className={css(templatesModalFooter)}>
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
  border: '1px solid rgb(0, 83, 159)',
  minWidth: '200px',
});

const templatesModalWindowStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    width: mobileScreen ? '100%' : '60%',
    padding: '0',
    height: mobileScreen ? 'calc(100% - 50px)' : 'calc(100% - 100px)',
    marginTop: mobileScreen ? '50px' : 0,
  };
};

const templatesModalContentWrapperStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: mobileScreen ? '30px 20px 60px' : '40px 40px 100px',
    positin: 'relative',
  };
};

const templatesListStyles: Rule = ({ theme }) => ({
  margin: '25px 0 0',
  height: '100%',
  overflowY: 'scroll',
});

const templatesListItemStyles: Rule = ({ theme }) => {
  // const [, isBreakpoint] = useBreakpoints();
  // const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    // margin: mobileScreen ? 0 : '5px 0',
    padding: '15px 0',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
};

const templatesModalFooter: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: mobileScreen ? '75px' : '100px',
    width: '100%',
    backgroundColor: '#fff',
    borderBottomRightRadius: mobileScreen ? 0 : '32px',
    borderBottomLeftRadius: mobileScreen ? 0 : '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

const row: Rule = ({ theme }) => {
  return { fontSize: `${theme.font.fixed.f12}`, color: `${theme.colors.tescoBlue}` };
};

const timeStyles: Rule = ({ theme }) => {
  return { fontSize: `${theme.font.fixed.f14}` };
};

export default TemplatesModal;
