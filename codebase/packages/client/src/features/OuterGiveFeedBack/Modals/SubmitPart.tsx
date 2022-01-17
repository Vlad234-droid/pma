import React, { FC } from 'react';
import { SubmitPartProps, GiveFeedbackType } from '../type';
import { useStyle, Rule, Styles, useBreakpoints, Button } from '@dex-ddl/core';
import { IconButton, Position } from 'components/IconButton';
import video_explanation from '../../../../public/video_explanation.jpg';
import { TileWrapper } from 'components/Tile';
import { Item, Textarea } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { Trans } from 'components/Translation';
import defaultImg from '../../../../public/default.png';
import { VoiceType } from 'config/enum';

export const WITH_SELECTED_TEST = 'with_selected_test';
const QUESTION_ORDER = ['Question 1', 'Question 2', 'Anything else?'];

const SubmitPart: FC<SubmitPartProps> = ({
  selectedPerson,
  setInfoModal,
  methods,
  feedbackItemsS,
  giveFeedback,
  setConfirmModal,
  onDraft,
  setModalGreatFeedback,
}) => {
  const { css, theme } = useStyle();
  const {
    formState: { isValid },
    getValues,
    setValue,
  } = methods;

  const valuess = getValues();

  const getPropperToneOfVoice = () =>
    VoiceType[selectedPerson?.profileAttributes?.find((item) => item?.name === 'voice')?.value] ?? 'Direct and simple';

  return (
    <div data-test-id={WITH_SELECTED_TEST}>
      <div className={css({ height: '1px', background: '#E5E5E5' })} />
      <div className={css({ marginTop: '16px' })}>
        <div className={css(VideoWrapper)}>
          <h2 className={css(VideoExplanationTitle)}>Watch this 2-minute video on how to give great feedback</h2>
          <img src={video_explanation} alt='video_explanation' />
        </div>
        <div className={css(BlockInfo)}>
          <div className={css({ alignSelf: 'flex-start' })}>
            <img className={css(ImgStyle)} src={defaultImg} alt='photo' />
          </div>
          <div className={css({ marginLeft: '16px' })}>
            <h3
              className={css(Names_Style)}
            >{`${selectedPerson?.profile?.firstName} ${selectedPerson?.profile?.lastName}`}</h3>
            <p className={css(IndustryStyle)}>
              {`${selectedPerson?.workRelationships[0].job?.name}, ${selectedPerson?.workRelationships[0].department?.name}`}
            </p>
            <span className={css(TreatmentStyle)}>I prefer feedback that is: {getPropperToneOfVoice()}</span>
          </div>
        </div>
      </div>
      <div className={css(NotificationBlockStyle)}>
        <p>Fill out the questions below to share your feedback</p>
      </div>
      <div className={css({ marginTop: '24px', marginBottom: '14px' })}>
        <IconButton graphic='information' onPress={() => setModalGreatFeedback(() => true)}>
          <p className={css(InfohelpStyle)}>Learn more about how to give great feedback</p>
        </IconButton>
      </div>

      <form>
        <div>
          {!!Object.keys(valuess) &&
            giveFeedback.map((item, i) => {
              let splittedValues;
              const conv = valuess;
              if (conv.feedback) {
                splittedValues = conv.feedback;
              }

              if (feedbackItemsS?.length) {
                setValue(
                  'feedback',
                  feedbackItemsS
                    .sort((i1, i2) => QUESTION_ORDER.indexOf(i1.code) - QUESTION_ORDER.indexOf(i2.code))
                    .map((item) => {
                      if (item.content !== '')
                        return {
                          field: item.content,
                        };
                    })
                    .filter(Boolean),
                );
              }

              const value = feedbackItemsS?.length
                ? feedbackItemsS?.[feedbackItemsS.findIndex((items) => items.code === item.giveFeedbacka_main_title)]
                    ?.content
                : splittedValues && splittedValues[i].field;

              return (
                <div
                  key={item.giveFeedback_id}
                  className={css({
                    ':last-child': {
                      marginBottom: '32px',
                    },
                  })}
                >
                  <TileWrapper
                    customStyle={{
                      marginBottom: '16px !important',
                      ...TileCustomStyles,
                    }}
                  >
                    <h3 className={css(GiveFeedbackTitle)}>{item.giveFeedback_title}</h3>
                    <p className={css(GiveFeedbackDescription)}>{item?.giveFeedback_description}</p>
                    <GenericItemField
                      name={`feedback.${item.giveFeedback_id}.field`}
                      methods={methods}
                      Wrapper={Item}
                      Element={Textarea}
                      value={value}
                    />
                  </TileWrapper>
                </div>
              );
            })}
        </div>
        <div className={css(AbsoluteStyle)}>
          <div className={css(RelativeBtnStyled)}>
            <div className={css(SpacingStyle)}>
              <Button styles={[theme.font.fixed.f16, ButtonStyle]} onPress={() => onDraft()}>
                <Trans>Save as draft</Trans>
              </Button>

              <IconButton
                isDisabled={!isValid}
                customVariantRules={{ default: iconBtnStyle, disabled: iconBtnStyleDisabled }}
                graphic='arrowRight'
                iconProps={{ invertColors: true }}
                iconPosition={Position.RIGHT}
                onPress={() => {
                  setConfirmModal(() => true);
                }}
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

const AbsoluteStyle: Rule = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  background: '#FFFFFF',
  height: '112px',
};

const RelativeBtnStyled: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
});
const SpacingStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
    display: 'flex',
    justifyContent: 'space-between',
  };
};

const ButtonStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const BlockInfo: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};

const ImgStyle: Rule = {
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

const IndustryStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px 0px 4px 0px',
};

const TreatmentStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  color: '#00539F',
};

const NotificationBlockStyle: Rule = {
  marginTop: '16px',
  padding: '16px 40px 16px 16px',
  background: '#F3F9FC',
  borderRadius: '10px',
  '& > p': {
    fontSize: '14px',
    lineHeight: '18px',
    margin: '0px',
  },
} as Styles;

const InfohelpStyle: Rule = {
  color: '#00539F',
  fontSize: '14px',
  margin: '0px 0px 5px 8px',
};

const VideoExplanationTitle: Rule = {
  margin: '16px 0px 16px 0px',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
};
const VideoWrapper: Rule = {
  width: '100%',
  maxHeight: '304px',
  marginBottom: '56px',
  '& > img': {
    maxWidth: '100%',
    height: '100%',
  },
} as Styles;

const GiveFeedbackTitle: Rule = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '2px 0px 0px 0px',
};
const GiveFeedbackDescription: Rule = {
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
