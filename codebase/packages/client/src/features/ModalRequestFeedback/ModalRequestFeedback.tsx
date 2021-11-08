import React, { FC, useState } from 'react';
import { useStyle, Rule, Styles, CreateRule } from '@dex-ddl/core';
import { PeopleTypes } from './type';
import { SuccessModal } from './ModalParts';
import { Item, Select, Textarea } from 'components/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { ButtonsComponent, MultiplySearchInput } from './components';
import { createRequestFeedbackSchema } from './config';
import { Close } from 'components/Icon/graphics/Close';
import { GenericItemField } from 'components/GenericForm';
import { TileWrapper } from 'components/Tile';

const ModalRequestFeedback: FC = () => {
  const { css } = useStyle();

  const [showSuccessModal, setShowSuccesModal] = useState<boolean>(false);
  const [selectedPersons, setSelectedPersons] = useState<PeopleTypes[] | []>([]);
  const [peopleFiltered, setPeopleFiltered] = useState<PeopleTypes[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const [peopleCopy, setPeopleCopy] = useState<PeopleTypes[]>([
    {
      id: 1,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Vlad',
      l_name: 'Baryshpolets',
    },
    {
      id: 2,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Andrey',
      l_name: 'Sorokov',
    },
    {
      id: 3,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Anton',
      l_name: 'Ryndy',
    },
    {
      id: 4,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Anton',
      l_name: 'Pylypenko',
    },
    {
      id: 5,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Slava',
      l_name: 'Li',
    },
  ]);
  const [people, setPeople] = useState<PeopleTypes[]>([
    {
      id: 1,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Vlad',
      l_name: 'Baryshpolets',
    },
    {
      id: 2,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Andrey',
      l_name: 'Sorokov',
    },
    {
      id: 3,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Anton',
      l_name: 'Ryndy',
    },
    {
      id: 4,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Anton',
      l_name: 'Pylypenko',
    },
    {
      id: 5,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Slava',
      l_name: 'Li',
    },
  ]);

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createRequestFeedbackSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = methods;
  const { register } = methods;

  console.log('isValid', isValid);
  const handleDeleteSelectedPerson = (id: number) => {
    setSelectedPersons(() => selectedPersons.filter((person) => person.id !== id));
  };
  const handleDeleteAllSelectedPersons = () => {
    setSelectedPersons(() => []);
    setPeople(() => peopleCopy);
  };

  const area_options = [
    { value: 'id_1', label: 'Development goal' },
    { value: 'id_2', label: 'Objectives' },
    { value: 'id_3', label: 'Value and behaviour' },
    { value: 'id_4', label: 'Other' },
  ];
  const objective_options = [{ value: 'id_1', label: 'Provide a positive customer experience' }];

  return (
    <>
      {!showSuccessModal ? (
        <div className={css({ paddingLeft: '40px', paddingRight: '40px', height: '100%', overflow: 'auto' })}>
          <div className={css({ fontWeight: 'bold', fontSize: '24px', lineHeight: '28px' })}>
            Ask your colleagues for feedback
          </div>
          <div className={css({ marginTop: '8px', fontSize: '18px', lineHeight: '22px' })}>
            Select which colleague you want to ask feedback from
          </div>

          <form className={css({ marginTop: '32px' })}>
            <Item
              errormessage={
                errors['search_option'] && errors['search_option'].type === 'required'
                  ? errors['search_option'].message
                  : ''
              }
            >
              <MultiplySearchInput
                isValid={!errors[`search_option`]}
                name={`search_option`}
                onChange={(e) => {
                  register(`search_option`).onChange(e);
                  setInputValue(() => e.target.value);

                  if (e.target.value === '') {
                    setPeopleFiltered(() => []);
                  }
                  if (e.target.value.length > 1) {
                    const arr = people.filter((item) => {
                      const mult = `${item.f_name.toLowerCase()}${item.l_name.toLowerCase()}`;
                      return (
                        item.l_name.toLowerCase().includes(e.target.value.toLowerCase().split(/\s+/).join('')) ||
                        item.f_name.toLowerCase().includes(e.target.value.toLowerCase().split(/\s+/).join('')) ||
                        mult.includes(e.target.value.toLowerCase().split(/\s+/).join(''))
                      );
                    });
                    setPeopleFiltered(() => arr);
                  }
                }}
                setSelectedPersons={setSelectedPersons}
                domRef={register(`search_option`).ref}
                placeholder={'Search name'}
                options={peopleFiltered}
                setPeopleFiltered={setPeopleFiltered}
                selectedPersons={selectedPersons}
                multiple={true}
                value={inputValue}
                setInputValue={setInputValue}
                setPeople={setPeople}
              />
            </Item>

            <div
              className={css({
                position: 'relative',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '90%',
              })}
            >
              {!!selectedPersons.length &&
                (selectedPersons as Array<PeopleTypes>).map((person: PeopleTypes): any => (
                  <div key={person.id} className={css(Selected_peoples_style)}>
                    <span className={css({ marginRight: '10px' })}>{`${person.f_name} ${person.l_name}`}</span>
                    <div className={css({ cursor: 'pointer' })} onClick={() => handleDeleteSelectedPerson(person.id)}>
                      <Close />
                    </div>
                  </div>
                ))}
              {!!selectedPersons.length && (
                <span className={css(CleanAll_button_style)} onClick={handleDeleteAllSelectedPersons}>
                  Clear all
                </span>
              )}
            </div>

            <div className={css(Toggle_margin({ selectedPersons }))}>
              <GenericItemField
                name={`area_options`}
                methods={methods}
                Wrapper={({ children }) => (
                  <Item label='Choose what area you would like feedback on' withIcon={false}>
                    {children}
                  </Item>
                )}
                Element={Select}
                options={area_options}
                placeholder={'Choose an area'}
              />
            </div>
            <div className={css({ marginTop: '24px' })}>
              <GenericItemField
                name={`objective_options`}
                methods={methods}
                Wrapper={({ children }) => (
                  <Item label='Choose an objectove you want feedback on' withIcon={false}>
                    {children}
                  </Item>
                )}
                Element={Select}
                options={objective_options}
                placeholder='Choose objective'
              />
            </div>
            <TileWrapper customStyle={{ padding: '24px' }}>
              <h3 className={css(Tile_title)}>Anything else?</h3>
              <h3 className={css(Commnet_style)}>Add any other comment here</h3>
              <p className={css(Tile_description)}>
                Add any direction you have for the colleague you are requesting feedback from. Clarify specific areas
                you’d like to hear feedabck on or leave them a note to say thank you.
              </p>
              <GenericItemField
                name={`tile_else`}
                methods={methods}
                Wrapper={Item}
                Element={Textarea}
                placeholder='Add your question here'
              />
            </TileWrapper>
          </form>
          <ButtonsComponent isValid={isValid} setShowSuccesModal={setShowSuccesModal} />
        </div>
      ) : (
        <SuccessModal />
      )}
    </>
  );
};

const Selected_peoples_style: Rule = {
  borderRadius: '10px',
  border: '1px solid  #00539F',
  height: '32px',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px 12px',
  marginRight: '16px',
  marginTop: '15px',
  '& > span': {
    whiteSpace: 'nowrap',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#00539F',
  },
} as Styles;

const Toggle_margin: CreateRule<{ selectedPersons: PeopleTypes[] | [] }> = (props) => {
  const { selectedPersons } = props;
  if (selectedPersons.length) {
    return {
      marginTop: '32px',
    };
  }
  return {};
};

const CleanAll_button_style: Rule = {
  position: 'absolute',
  top: '11px',
  right: '-50px',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
  cursor: 'pointer',
};

const Tile_title: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#00539F',
  margin: '0px 0px 24px 0px',
};
const Commnet_style: Rule = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
};
const Tile_description: Rule = {
  fontSize: '16px',
  lineHeight: '20px',
};

export default ModalRequestFeedback;
