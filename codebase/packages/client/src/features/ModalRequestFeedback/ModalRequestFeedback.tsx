import React, { FC, useEffect, useState } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@dex-ddl/core';
import { ObjectiveOptionsType, PeopleTypes } from './type';
import { SuccessModal, InfoModalContent } from './ModalParts';
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
import { TargetType } from 'config/enum';
import {
  ColleaguesActions,
  colleagueUUIDSelector,
  FeedbackActions,
  getColleaguesSelector,
  getReviewsS,
} from '@pma/store';
import { IconButton } from 'components/IconButton';
import { commentToYourImpact, commentToYourSelf, commentToDayJob } from '../../utils/feedback';

const ModalRequestFeedback: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const [objectiveOptions, setObjectiveOptions] = useState<Array<ObjectiveOptionsType>>([]);
  const [showSuccessModal, setShowSuccesModal] = useState<boolean>(false);
  const [selectedPersons, setSelectedPersons] = useState<PeopleTypes[] | []>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const reviews = useSelector(getReviewsS) || [];
  const findedCollegues = useSelector(getColleaguesSelector) || [];
  const colleagueUuid = useSelector(colleagueUUIDSelector);

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

  const { register, setValue } = methods;

  const formValues = getValues();

  useEffect(() => {
    if (formValues.area_options === 'id_2') {
      dispatch(FeedbackActions.getObjectiveReviews({ type: 'OBJECTIVE', colleagueUuid }));
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
        if (selectedPersons?.some((person) => person?.colleagueUUID === item?.colleague?.colleagueUUID)) return;
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
    { value: 'id_1', label: 'Day Job' },
    { value: 'id_2', label: 'Objectives' },
    { value: 'id_3', label: 'Yourself (development goals, values & purpose)' },
    { value: 'id_4', label: 'Your impact on others' },
  ];

  const onSubmit = async (data) => {
    const [review] = reviews;
    const getPropperFeedbackItems = () => {
      const feedBackFieldOptionValue = () => {
        return data.comment_to_your_impact || data.comment_to_your_self || data.comment_to_day_job;
      };

      const [key] = Object.keys(data).filter((item) => {
        if (item === commentToYourImpact || item === commentToYourSelf || item === commentToDayJob) return item;
      });

      if (data.comment_to_request) {
        return {
          feedbackItems: [
            { code: 'comment_to_request', content: data.comment_to_request },
            feedBackFieldOptionValue() && {
              code: key,
              content: feedBackFieldOptionValue(),
            },
          ].filter(Boolean),
        };
      }
      return {
        feedbackItems: [
          feedBackFieldOptionValue() && {
            code: key,
            content: feedBackFieldOptionValue(),
          },
        ].filter(Boolean),
      };
    };

    const listPeoples = selectedPersons.map((person) => {
      const formData = {
        colleagueUuid: person.colleagueUUID,
        targetColleagueUuid: colleagueUuid,
        targetType: TargetType[data.area_options],
        ...(!!reviews.length && data.area_options === 'id_2'
          ? {
              targetId: review.uuid,
            }
          : { targetId: null }),
        status: 'PENDING',
        ...getPropperFeedbackItems(),
      };
      return formData;
    });
    dispatch(FeedbackActions.createNewFeedback(listPeoples));
  };

  if (infoModal) {
    return <InfoModalContent setInfoModal={setInfoModal} />;
  }
  const choseFieldHandler = () => {
    if (!formValues || !formValues.area_options) return;

    const labelValue = () =>
      area_options_data[area_options_data.findIndex((item) => item.value === formValues.area_options)].label;

    const obj = {
      id_1: (
        <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '24px' }}>
          <h3 className={css(CommnetStyle)}>Add comment to {labelValue()}</h3>

          <GenericItemField
            name={`comment_to_day_job`}
            methods={methods}
            Wrapper={Item}
            Element={Textarea}
            value={formValues.comment_to_day_job}
          />
        </TileWrapper>
      ),
      id_2: (
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
      ),
      id_3: (
        <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '24px' }}>
          <h3 className={css(CommnetStyle)}>Add comment to {labelValue()}</h3>

          <GenericItemField
            name={`comment_to_your_self`}
            methods={methods}
            Wrapper={Item}
            Element={Textarea}
            value={formValues.comment_to_your_self}
          />
        </TileWrapper>
      ),
      id_4: (
        <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '24px' }}>
          <h3 className={css(CommnetStyle)}>Add comment to {labelValue()}</h3>
          <GenericItemField
            name={`comment_to_your_impact`}
            methods={methods}
            Wrapper={Item}
            Element={Textarea}
            value={formValues.comment_to_your_impact}
          />
        </TileWrapper>
      ),
    };

    return obj[formValues.area_options];
  };

  return (
    <>
      {!showSuccessModal ? (
        <div className={css({ paddingLeft: '40px', paddingRight: '40px', height: '100%', overflow: 'auto' })}>
          <div className={css({ fontWeight: 'bold', fontSize: '24px', lineHeight: '28px' })}>
            Ask your colleagues for feedback
          </div>
          <div className={css({ marginTop: '14px', fontSize: '18px', lineHeight: '22px' })}>
            Select which colleague(s) you would like to ask feedback from
          </div>

          <form className={css({ marginTop: '20px' })}>
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
                  if (e.target.value === '' || e.target.value.length <= 1) {
                    dispatch(ColleaguesActions.clearGettedColleagues());
                  }
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

            <div className={css(RelativeStyles)}>
              {!!selectedPersons.length &&
                (selectedPersons as Array<PeopleTypes>).map((person: PeopleTypes): any => (
                  <div key={person.colleagueUUID} className={css(SelectedPeoplesStyle)}>
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
                <span className={css(CleanAllButtonStyle)} onClick={handleDeleteAllSelectedPersons}>
                  Clear all
                </span>
              )}
            </div>

            <div className={css(ToggleMargin({ selectedPersons }))}>
              <IconButton graphic='information' onPress={() => setInfoModal(() => true)}>
                <p className={css(InfoHelpStyle)}>Learn more about how to request great feedback</p>
              </IconButton>
            </div>

            <div className={css({ marginTop: '18px' })}>
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
                onChange={(value) => {
                  trigger('area_options');
                  setValue('area_options', value);
                }}
              />
            </div>

            {choseFieldHandler()}

            <TileWrapper customStyle={{ padding: '24px', border: '1px solid #E5E5E5', marginBottom: '50px' }}>
              <h3 className={css(CommnetStyle)}>Add any other comments you would like to share with your colleague</h3>
              <GenericItemField
                name={`comment_to_request`}
                methods={methods}
                Wrapper={Item}
                Element={Textarea}
                value={formValues.comment_to_request}
              />
            </TileWrapper>
          </form>
          <ButtonsComponent
            isValid={isValid && !!selectedPersons.length}
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

const InfoHelpStyle: Rule = {
  color: '#00539F',
  fontSize: '14px',
  margin: '0px 0px 0px 8px',
};

const RelativeStyles: Rule = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '90%',
};

const SelectedPeoplesStyle: Rule = {
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

const ToggleMargin: CreateRule<{ selectedPersons: PeopleTypes[] | [] }> = (props) => {
  const { selectedPersons } = props;
  if (selectedPersons.length) {
    return {
      marginTop: '32px',
    };
  }
  return {};
};

const CleanAllButtonStyle: Rule = {
  position: 'absolute',
  top: '11px',
  right: '-50px',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
  cursor: 'pointer',
};

const CommnetStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  marginTop: '0px',
};

export default ModalRequestFeedback;
