import React, { FC, useEffect, useState } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@dex-ddl/core';
import { ObjectiveOptionsType, PeopleTypes } from './type';
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
import { useDispatch, useSelector } from 'react-redux';
import { FeedbackArea, TargetType } from '../../config/enum';
import {
  ColleaguesActions,
  colleagueUUIDSelector,
  FeedbackActions,
  getFindedColleaguesSelector,
  getReviewsS,
} from '@pma/store';

const ModalRequestFeedback: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createRequestFeedbackSchema),
  });
  const {
    formState: { errors, isValid },
    getValues,
    trigger,
    handleSubmit,
  } = methods;

  const { register } = methods;

  const formValues = getValues();

  const [objectiveOptions, setObjectiveOptions] = useState<Array<ObjectiveOptionsType>>([]);
  const [showSuccessModal, setShowSuccesModal] = useState<boolean>(false);
  const [selectedPersons, setSelectedPersons] = useState<PeopleTypes[] | []>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const reviews = useSelector(getReviewsS) || [];
  const findedCollegues = useSelector(getFindedColleaguesSelector) || [];
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  useEffect(() => {
    if (formValues.area_options === FeedbackArea.OBJECTIVES) {
      dispatch(FeedbackActions.getObjectiveReviews({ type: TargetType.Objectives, colleagueUuid }));
    }
  }, [formValues.area_options]);

  useEffect(() => {
    if (reviews.length) {
      setObjectiveOptions(() =>
        reviews
          .map((item) => {
            const { title } = item.properties.mapJson;
            if (title) {
              return {
                value: [title][0],
                label: title,
                uuid: item.uuid,
              };
            }
          })
          .filter(Boolean),
      );
    }
  }, [reviews]);

  const filteredFindedColleguesHandler = () => {
    if (!selectedPersons.length) return findedCollegues;
    return findedCollegues
      .map((item) => {
        if (selectedPersons.some((person) => person.colleagueUUID === item.colleagueUUID)) return;
        return item;
      })
      .filter(Boolean);
  };

  const handleDeleteSelectedPerson = (id: string) => {
    setSelectedPersons(() => selectedPersons.filter((person) => person.colleagueUUID !== id));
  };
  const handleDeleteAllSelectedPersons = () => {
    setSelectedPersons(() => []);
    formValues.search_option = '';
  };

  const area_options_data = [
    { value: 'id_1', label: 'Development goal' },
    { value: 'id_2', label: 'Objectives' },
    { value: 'id_3', label: 'Value and behaviour' },
    { value: 'id_4', label: 'Other' },
  ];

  const onSubmit = async (data) => {
    const [review] = reviews;
    const getPropperFeedbackItems = () => {
      if (data.comment_to_request) {
        return {
          feedbackItems: [{ code: 'comment_to_request', content: data.comment_to_request }],
        };
      }
      return;
    };

    const listPeoples = selectedPersons.map((person) => {
      const formData = {
        colleagueUuid: person.colleagueUUID,
        targetColleagueUuid: colleagueUuid,
        targetType: TargetType[data.area_options],
        ...(!!reviews.length && {
          targetId: review.uuid,
        }),
        status: 'PENDING',
        ...getPropperFeedbackItems(),
      };
      return formData;
    });

    dispatch(FeedbackActions.createNewFeedback(listPeoples));
  };

  return (
    <>
      {!showSuccessModal ? (
        <div className={css({ paddingLeft: '40px', paddingRight: '40px', height: '100%', overflow: 'auto' })}>
          <div className={css({ fontWeight: 'bold', fontSize: '24px', lineHeight: '28px' })}>
            Ask your colleagues for feedback
          </div>
          <div className={css({ marginTop: '8px', fontSize: '18px', lineHeight: '22px' })}>
            Select which colleague(s) you would like to ask feedback from
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
                  setInputValue(() => e.target.value);
                  if (e.target.value !== '' && e.target.value.length > 1) {
                    dispatch(
                      ColleaguesActions.getColleagues({
                        'first-name_like': e.target.value,
                        'last-name_like': e.target.value,
                      }),
                    );
                  }
                  register(`search_option`).onChange(e);
                }}
                setSelectedPersons={setSelectedPersons}
                domRef={register(`search_option`).ref}
                placeholder={'Search name'}
                options={filteredFindedColleguesHandler()}
                setInputValue={setInputValue}
                value={inputValue}
              />
            </Item>

            <div className={css(Relative_styles)}>
              {!!selectedPersons.length &&
                (selectedPersons as Array<PeopleTypes>).map((person: PeopleTypes): any => (
                  <div key={person.colleagueUUID} className={css(Selected_peoples_style)}>
                    <span
                      className={css({ marginRight: '10px' })}
                    >{`${person.profile.firstName} ${person.profile.lastName}`}</span>
                    <div
                      className={css({ cursor: 'pointer' })}
                      onClick={() => handleDeleteSelectedPerson(person.colleagueUUID)}
                    >
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
                name='area_options'
                methods={methods}
                Wrapper={({ children }) => (
                  <Item label='Choose what you`d like feedback on' withIcon={false}>
                    {children}
                  </Item>
                )}
                Element={Select}
                options={area_options_data}
                placeholder={'Choose an area'}
                value={formValues.area_options}
                onChange={() => {
                  trigger('area_options');
                }}
              />
            </div>
            {formValues.area_options === FeedbackArea.OBJECTIVES && (
              <div className={css({ marginTop: '24px' })}>
                <GenericItemField
                  name={`objective_options`}
                  methods={methods}
                  Wrapper={({ children }) => (
                    <Item label='Choose an objective you want feedback on' withIcon={false}>
                      {children}
                    </Item>
                  )}
                  Element={Select}
                  options={objectiveOptions}
                  placeholder='Choose objective'
                  value={formValues.objective_options}
                  onChange={() => trigger('objective_options')}
                />
              </div>
            )}

            <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '50px' }}>
              <h3 className={css(Commnet_style)}>Add any other comments you would like to share with your colleague</h3>
              <GenericItemField
                name={`comment_to_request`}
                methods={methods}
                Wrapper={Item}
                Element={Textarea}
                placeholder='Add your question here'
                value={formValues.comment_to_request}
              />
            </TileWrapper>
          </form>
          <ButtonsComponent
            isValid={isValid}
            setShowSuccesModal={setShowSuccesModal}
            onSubmit={handleSubmit(onSubmit)}
            methods={methods}
          />
        </div>
      ) : (
        <SuccessModal />
      )}
    </>
  );
};

const Relative_styles: Rule = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '90%',
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

const Commnet_style: Rule = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  marginTop: '0px',
};

export default ModalRequestFeedback;
