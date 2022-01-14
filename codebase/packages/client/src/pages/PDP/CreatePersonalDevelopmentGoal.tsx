import React, { useEffect, useState } from 'react';
import { Button, CreateRule, ModalWithHeader, Rule, theme, Theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Close } from 'assets/img/objectives';
import DescriptionBlock from 'components/DescriptionBlock';
import { useNavigate } from 'react-router';
import infoIcon from '../../assets/img/pdp/infoIcon.png';
import { Icon } from 'components/Icon';
import { GenericItemField } from 'components/GenericForm';
import { Item, Textarea } from 'components/Form';
import { useForm } from 'react-hook-form';
import arrLeft from '../../assets/img/pdp/arrLeft.png';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createPDPSchema } from 'features/PDP/config';
import usePDPShema from 'features/PDP/hooks/usePDPShema';
import { useSelector } from 'react-redux';
import { colleagueUUIDSelector, filterPDPByTypeSelector, reviewsMetaSelector, schemaMetaSelector } from '@pma/store';
import { PDPType } from 'config/enum';

const CreatePersonalDevelopmentGoal = (props) => {
  const { css, theme } = useStyle();
  const navigate = useNavigate();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const originObjectives = useSelector(filterPDPByTypeSelector(PDPType.PDP));
  
  const [objectives, setObjectives] = useState<[]>([]);
  const { loaded: schemaLoaded } = useSelector(schemaMetaSelector);
  const { loaded: reviewLoaded } = useSelector(reviewsMetaSelector);

  const [schema] = usePDPShema(PDPType.PDP);
  // console.log('--------------', schema);
  const { components = [], markup = { max: 0, min: 0 } } = schema;
  const formElements = components.filter((component) => component.type != 'text');
  // const canCreateMultiObjective = markup.min >= originObjectives?.length && timelineObjective.status === Status.DRAFT;





  const goalList = ['Goal1', 'Goal2', 'Goal3'];

  useEffect(() => {
    if (reviewLoaded && schemaLoaded) {
      console.log('Do things here with data');
    }
  }, [reviewLoaded, schemaLoaded]);

  const formInputs = [
    {
        id: 0,
        name: 'Development goal',
        label: 'Development goal',
        placeholder: 'Example: Build great relationships with others outside my own team',
        value: 'value',
        height: 65,
    },
    {
        id: 1,
        name: 'By achieving this goal, I will be able to...',
        label: 'By achieving this goal, I will be able to...',
        placeholder: `Example: 
        1) Collaborate in a more efficient way 
        2) Build my credibility and personal brand`,
        value: 'value',
        height: 85,
      },
      {
        id: 2,
        name: 'How will I go about achieving my goals',
        label: 'How will I go about achieving my goals',
        placeholder: `Example: 
        1) Hold a lunch and learn open to wider business to share insight on a topic 
        2) Research self driven development opportunities around building my network, such as TED Talks 
        3) Use my current network to support me in connectiong with others around the business`,
        value: 'value',
        height: 165,
      },
      {
        id: 3,
        name: 'I know I will have succeeded when...',
        label: 'I know I will have succeeded when...',
        placeholder: `Example: 
        1) Positive feedback from stakeholders 
        2) Able to demonstrate that I have a diverse network and can draw on their knowledge`,
        value: 'value',
        height: 105,
      },
  ];

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createPDPSchema),
  });

  const onChangeInput = (value, idx) => {
    console.log(value, idx);
  };

  return (
    <ModalWithHeader
      containerRule={templatesModalWindowStyles}
      title='Create Personal Development Goal'
      modalPosition='middle'
      closeOptions={{
        closeOptionContent: <Icon graphic='cancel' invertColors={true} />,
        closeOptionStyles: {},
        onClose: () => navigate(-1),
      }}
      >
    <div className={css(popup({theme}))}>
      <DescriptionBlock>
        <div className={css(goalListBlock({theme}))}>
            {goalList.map( (el, idx) => {
                return (
                    <div key={el} className={`${css(goal({theme}))} ${idx < 1 ? css(activeGoalItem({theme})) : css(defaultGoalItem({theme}))}`}>{el}</div>
                )
            })}
        </div>

        <div className={css(infoBlock)}>
            <div className={css(infoIconEl)}>
                <img alt='info' src={infoIcon} />
            </div>    
            Need help writing your development plan?
        </div>

        <div className={css(dataBlock)}>
          {
            formInputs?.map((item, idx) => {
                return (
                  <GenericItemField
                    key={item.id}
                    name={item.name}
                    id={item.id}
                    label={item.name}
                    methods={methods}
                    Wrapper={Item}
                    Element={Textarea}
                    styles={{
                      height: `${item.height}px`,
                      fontFamily: 'TESCO Modern", Arial, sans-serif',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      lineHeight: '20px',
                      letterSpacing: '0px',
                      textAlign: 'left',
                    }}
                    onChange={(event) => onChangeInput(event, idx)}
                    placeholder={item.placeholder}
                    value={''}
                  />
                )
            })
          }
        </div>
        
        <div className={css(applyBlock)}>
          <Button styles={[customBtn]}>Save & Exit</Button>
          <Button styles={[customBtn, createBtn]}>Save & create a new goal <img className={css(imgArrow)} alt='arrow' src={arrLeft} /></Button>
        </div>
        
      </DescriptionBlock>
    </div>
    </ModalWithHeader>
  );
};

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

const imgArrow = {
  marginLeft: '15px',
} as Rule;

const createBtn = {
  justifyContent: 'center',
} as Rule;

const customBtn = {
  padding: '10px 20px',
  width: '45%',
} as Rule;

const applyBlock = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '32px',
} as Rule;

const dataBlock = {
    borderBottom: `1px solid ${theme.colors.backgroundDarkest}`,
    fontFamily: 'TESCO Modern", Arial, sans-serif', 
} as Rule;

const infoIconEl = {
    marginRight: '8px',
} as Rule;

const infoBlock = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: '32px',
    color: '#00539F',
    fontSize: '14px',
    fontStyle: 'normal',
    lineHeight: '18px',
    letterSpacing: '0px',
    textAlign: 'left',
    fontFamily: 'TESCO Modern", Arial, sans-serif',

} as Rule;

const activeGoalItem: CreateRule<{ theme: Theme; }> = (props) => {
    if (props == null) return {};
    const { theme } = props;
    return {
        color: `${theme.colors.tescoBlue}`,   
    };
};

const defaultGoalItem: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    color: '#b3cde5',
  };
};

const close = {
  cursor: 'pointer',
} as Rule;

const goalListBlock: CreateRule<{ theme: Theme; }> = (props) => {
    if (props == null) return {};
    const { theme } = props;
    return {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: '32px',
    };
};

const goal: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontFamily: 'TESCO Modern", Arial, sans-serif',
    fontSize: `${theme.font.fixed.f16}`,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '20px',
    letterSpacing: '0px',
    paddingRight: '16px',
    // color: `${theme.colors.disabledTescoBlue}`,
  };
};

const decsriptionHeader: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f24}`,
    lineHeight: '28px',
    fontWeight: 'bold',
    paddingBottom: '8px',
  };
};

const arrow = {
  marginLeft: '13.75px',
  border: 'solid',
  borderWidth: '0 1px 1px 0',
  display: 'inline-block',
  padding: '6px',
  transform: 'rotate(137deg)',
  webkitTransform: 'rotate(137deg)',
  cursor: 'pointer',
} as Rule;

const header: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: `${theme.font.fixed.f24}`,
    lineHeight: '28px',
    fontWeight: 'bold',
    color: `${theme.colors.white}`,
    width: '100%',
    padding: '22px 42px 22px 40px',
  };
};

const popup: CreateRule<{ theme: Theme; }> = (props) => {
    if (props == null) return {};
    const { theme } = props;
    return {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0 20px',
        paddingBottom: '60px',
        backgroundColor: `${theme.colors.tescoBlue}`,
        fontFamily: 'TESCO Modern", Arial, sans-serif',
    };
};

export default CreatePersonalDevelopmentGoal;
