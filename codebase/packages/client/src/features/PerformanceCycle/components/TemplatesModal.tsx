import React, { FC } from 'react';
import { Rule, useStyle, useBreakpoints, ModalWithHeader, Button } from '@dex-ddl/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { chooseTemplateSchema } from 'pages/PerformanceCycle/schema';
import { useForm } from 'react-hook-form';
import { Icon } from 'components/Icon';
import { Input } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';

type TemplateModalProps = {
  closeModal: () => void;
};

const TemplatesModal: FC<TemplateModalProps> = ({ closeModal }) => {
  const { css, theme } = useStyle();
  const templatesList = [
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 1'
    },
    {
      name: 'Template 2'
    }
  ];

  const templateChooseMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(chooseTemplateSchema),
  })

  const handleTemplateClick = () => {
    console.log("Template clicked");
  }

  return (
    <ModalWithHeader containerRule={templatesModalWindowStyles} title="Choose Template" modalPosition="middle" closeOptions={{
      closeOptionContent: <Icon graphic='cancel' invertColors={true} />,
      closeOptionStyles: {},
      onClose: closeModal
    }}>
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
        />

        <div className={css(templatesListStyles)}>
          {
            templatesList.map(item => {
              return (
                <div className={css(templatesListItemStyles)} key={Math.random()} onClick={handleTemplateClick}>{item.name}</div>
              )
            })
          }
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
  }
}



const templatesModalContentWrapperStyles: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: "flex",
    flexDirection: 'column',
    height: '100%',
    padding: mobileScreen ? '30px 20px 60px' : '40px 40px 100px',
    positin: 'relative'
  }
}


const templatesListStyles: Rule = ({ theme }) => ({
  margin: '25px 0 0',
  height: '100%',
  overflowY: 'scroll'
})


const templatesListItemStyles: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    margin: mobileScreen ? 0 : '5px 0',
    padding: '15px 0',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer'
  }
}


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
    justifyContent: 'center'
  }
}

export default TemplatesModal;
