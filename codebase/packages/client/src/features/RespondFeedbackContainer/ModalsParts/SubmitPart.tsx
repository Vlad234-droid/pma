import React, { FC } from 'react';
import { GiveFeedbackType, SubmitPartProps } from '../type';
import { createGiveFeedbackSchema } from '../config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Rule, Styles, useBreakpoints, useStyle } from '@dex-ddl/core';
import { IconButton, Position } from 'components/IconButton';
import video_explanation from '../../../../public/video_explanation.jpg';
import { TileWrapper } from 'components/Tile';
import { Item, Textarea } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { Trans } from 'components/Translation';
import { FeedbackActions } from '@pma/store';
import { useDispatch } from 'react-redux';

const SubmitPart: FC<SubmitPartProps> = ({
  selectedPerson,
  setInfoModal,
  setModalSuccess,
  feedbackItems,
  setIsOpen,
}) => {
  const dispatch = useDispatch();

  const giveFeedback: GiveFeedbackType[] = [
    {
      giveFeedback_id: '1',
      giveFeedbacka_main_title: 'Question 1',
      giveFeedback_title: 'Looking back, waht has this colleague done well?',
      giveFeedback_description: 'Share specific example of where you view this colleague’s strenght',
      giveFeedback_field: {
        field_id: '1',
        field_type: 'textarea',
        field_placeholder: 'Your colleague will see your feedback',
        field_value: undefined,
      },
    },
    {
      giveFeedback_id: '2',
      giveFeedbacka_main_title: 'Question 2',
      giveFeedback_title: 'Looking forward, what should this colleague focus on?',
      giveFeedback_description: 'Share specific examples of opportinities to make this colleague even better',
      giveFeedback_field: {
        field_id: '2',
        field_type: 'textarea',
        field_placeholder: 'Your colleague will see your feedback',
        field_value: undefined,
      },
    },
    {
      giveFeedback_id: '3',
      giveFeedbacka_main_title: 'Anything else?',
      giveFeedback_title: 'Share any other comments you have for your colleague which you think could be useful',
      giveFeedback_field: {
        field_id: '3',
        field_type: 'textarea',
        field_placeholder: 'Your colleague will see your feedback',
        field_value: undefined,
      },
    },
  ];
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createGiveFeedbackSchema),
  });
  const {
    handleSubmit,
    formState: { isValid },
    reset,
    getValues,
  } = methods;

  const checkForValidInputsKeys = () => {
    if (
      (feedbackItems.every((item) => item.uuid) && feedbackItems.some((item) => item.code === 'Question 1')) ||
      feedbackItems.some((item) => item.code === 'Question 2') ||
      feedbackItems.some((item) => item.code === 'Anything else?')
    ) {
      return true;
    }
    return false;
  };

  const UUID = (i) => {
    if (checkForValidInputsKeys()) {
      return {
        uuid: feedbackItems![feedbackItems!.findIndex((y) => y.code === giveFeedback[i].giveFeedbacka_main_title)]
          ?.uuid,
      };
    }
    return;
  };

  const values = getValues();

  const onSubmit = async (data) => {
    const conv = data.feedback.slice(1);
    const formData = {
      uuid: selectedPerson?.id,
      colleagueUuid: '10000000-0000-0000-0000-000000000001',
      targetColleagueUuid: '10000000-0000-0000-0000-000000000002',
      status: 'COMPLETED',
      targetId: selectedPerson?.targetId,
      targetType: selectedPerson?.targetType,
      feedbackItems: conv.map((item, i) => {
        return {
          ...UUID(i),
          code: giveFeedback[i].giveFeedbacka_main_title,
          content: item.field,
        };
      }),
    };
    dispatch(FeedbackActions.updatedFeedback(formData));
    setModalSuccess(() => true);
    reset();
  };

  const onDraft = () => {
    const conv = values.feedback.slice(1);
    const formData = {
      uuid: selectedPerson?.id,
      colleagueUuid: '10000000-0000-0000-0000-000000000001',
      targetColleagueUuid: '10000000-0000-0000-0000-000000000002',
      status: 'PENDING',
      targetId: selectedPerson?.targetId,
      targetType: selectedPerson?.targetType,
      feedbackItems: conv.map((item, i) => {
        return {
          ...UUID(i),
          code: giveFeedback[i].giveFeedbacka_main_title,
          content: item.field,
        };
      }),
    };

    dispatch(FeedbackActions.updatedFeedback(formData));
    setIsOpen(() => false);
    reset();
  };

  const submitForm = (e) => {
    handleSubmit(onSubmit)(e);
  };

  return (
    <div>
      <div className={css({ marginTop: '30px' })}>
        <div className={css(Block_info)}>
          <div className={css({ alignSelf: 'flex-start' })}>
            <img className={css(Img_style)} src={selectedPerson?.img} alt='photo' />
          </div>
          <div className={css({ marginLeft: '16px' })}>
            <h3 className={css(Names_Style)}>{`${selectedPerson?.f_name} ${selectedPerson?.l_name}`}</h3>
            <p className={css(Industry_Style)}>Cashier, Grocery</p>
            <span className={css(Treatment_Style)}>Please treat me kindly</span>
          </div>
        </div>
      </div>
      <div className={css(Notification_Block__Style)}>
        <p>This colleague has requested feedback on what they have done well and what they should focus on</p>
      </div>
      <div className={css({ marginTop: '24px' })}>
        <IconButton graphic='information' onPress={() => setInfoModal(() => true)}>
          <p className={css(Info_help__Style)}>Need help with providing feedback?</p>
        </IconButton>
      </div>
      <h2 className={css(Video_explanation_title)}>Watch video explanation</h2>
      <div className={css(Video_wrapper)}>
        <img src={video_explanation} alt='video_explanation' />
      </div>
      <form>
        <div>
          {giveFeedback.map((item) => {
            const value = feedbackItems?.length
              ? feedbackItems[feedbackItems.findIndex((items) => items.code === item.giveFeedbacka_main_title)]?.content
              : '';
            return (
              <TileWrapper
                key={item.giveFeedback_id}
                customStyle={{
                  marginBottom: '16px !important',
                  border: '1px solid #E5E5E5',
                  '&:last-child': {
                    marginBottom: '32px !important',
                  },
                  ...TileCustomStyles,
                }}
              >
                <h2 className={css(GiveFeedbacka_main_title)}>{item.giveFeedbacka_main_title}</h2>
                <h3 className={css(GiveFeedback_title)}>{item.giveFeedback_title}</h3>
                <p className={css(GiveFeedback_description)}>{item?.giveFeedback_description}</p>
                <GenericItemField
                  name={`feedback.${item.giveFeedback_id}.field`}
                  methods={methods}
                  Wrapper={Item}
                  Element={Textarea}
                  placeholder={item?.giveFeedback_field?.field_placeholder}
                  value={value}
                />
              </TileWrapper>
            );
          })}
        </div>
        <div
          className={css({
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            background: 'white',
          })}
        >
          <div className={css(Relative_btn_styled)}>
            <div className={css(Spacing_style)}>
              <Button styles={[theme.font.fixed.f16, Button_style]} onPress={() => onDraft()}>
                <Trans i18nKey='save_as_draft'>Save as draft</Trans>
              </Button>

              <IconButton
                isDisabled={!isValid}
                customVariantRules={{ default: iconBtnStyle, disabled: iconBtnStyleDisabled }}
                graphic='arrowRight'
                iconProps={{ invertColors: true }}
                iconPosition={Position.RIGHT}
                onPress={submitForm}
              >
                Submit
              </IconButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
const Relative_btn_styled: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
});
const Spacing_style: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
    display: 'flex',
    justifyContent: 'space-between',
  };
};
const Button_style: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const Block_info: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};

const Img_style: Rule = {
  width: '72px',
  height: '72px',
  borderRadius: '50%',
};
const Names_Style: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  margin: '0px',
};

const Industry_Style: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px 0px 4px 0px',
};

const Treatment_Style: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
};

const Notification_Block__Style: Rule = {
  marginTop: '16px',
  padding: '16px 40px 16px 16px',
  background: '#F3F9FC',
  borderRadius: '10px',
  maxHeight: '68px',
  '& > p': {
    fontSize: '14px',
    lineHeight: '18px',
    margin: '0px',
  },
} as Styles;

const Info_help__Style: Rule = {
  color: '#00539F',
  fontSize: '14px',
  margin: '0px 0px 0px 8px',
};

const Video_explanation_title: Rule = {
  margin: '16px 0px 16px 0px',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
};
const Video_wrapper: Rule = {
  width: '100%',
  maxHeight: '304px',
  marginBottom: '17px',
  '& > img': {
    maxWidth: '100%',
    height: '100%',
  },
} as Styles;
const GiveFeedbacka_main_title: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#00539F',
  margin: '0px',
};
const GiveFeedback_title: Rule = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '24px 0px 0px 0px',
};
const GiveFeedback_description: Rule = {
  margin: '4px 0px 16px 0px',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '0px 6px 0px 20px',
  display: 'flex',
  width: '49%',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconBtnStyleDisabled: Rule = ({ theme }) => ({
  padding: '0px 6px 0px 20px',
  display: 'flex',
  width: '49%',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  pointerEvents: 'none',
  opacity: '0.4',
});

const TileCustomStyles: Rule = {
  padding: '24px 24px 0px 24px',
  border: '1px solid #E5E5E5',
};

export default SubmitPart;
