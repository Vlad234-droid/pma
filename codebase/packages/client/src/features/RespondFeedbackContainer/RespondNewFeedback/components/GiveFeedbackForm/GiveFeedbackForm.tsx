import React, { FC } from 'react';
import { useStyle, Rule, useBreakpoints, Button } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';
import { getColleagueByUuidSelector } from '@pma/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import get from 'lodash.get';

import { Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Field, Item, Textarea, Attention } from 'components/Form';
import { ColleaguesFinder } from 'features/GiveFeedBack/components';
import { createGiveFeedbackSchema } from 'features/GiveFeedBack/config';
import { IconButton, Position } from 'components/IconButton';
import FeedbackInfo from '../FeedbackInfo';
import { GiveFeedbackFormProps } from '../../type';

export const FORM_WRAPPER = 'form_wrapper';

const prepareFeedbackItems = (fields, feedbackItems) => {
  return feedbackItems.map((content, idx) => ({ content, code: fields[idx].code }));
};

const getColleagueName = (data) => {
  if (!data) return '';
  return `${data?.colleague?.profile?.firstName} ${data?.colleague?.profile?.lastName}`;
};

const GiveFeedbackForm: FC<GiveFeedbackFormProps> = ({
  onSubmit,
  defaultValues,
  currentColleague,
  goToInfo,
  feedbackFields,
}) => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(createGiveFeedbackSchema),
    defaultValues,
  });

  const { targetColleagueUuid, feedbackItems } = getValues();

  const selectedColleague = useSelector(getColleagueByUuidSelector(targetColleagueUuid)) || currentColleague;

  const handleDraft = () => {
    const data = getValues();
    const feedbackItems = prepareFeedbackItems(feedbackFields, data.feedbackItems.filter(Boolean));
    onSubmit({ ...data, status: 'PENDING', feedbackItems });
  };

  const handleSave = (data) => {
    const feedbackItems = prepareFeedbackItems(feedbackFields, data.feedbackItems.filter(Boolean));
    onSubmit({
      ...data,
      status: 'COMPLETED',
      feedbackItems,
    });
  };
  return (
    <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={FORM_WRAPPER}>
      <div
        className={css({
          fontWeight: 'bold',
          fontSize: '24px',
          lineHeight: '28px',
          ...(mobileScreen && { textAlign: 'center' }),
        })}
      >
        <Trans i18nKey='how_is_the_colleague_performing'>How is the colleague performing?</Trans>
      </div>
      <Attention />
      <div className={css({ marginTop: '8px', fontSize: '18px', lineHeight: '22px' })}>
        <Trans i18nKey='colleague_requested_feedback'>
          This colleague has requested feedback from you. Fill out the questions below to share your feedback.
        </Trans>
      </div>
      <ColleaguesFinder
        onSelect={(colleagueUuid) => {
          setValue('targetColleagueUuid', colleagueUuid, { shouldValidate: true });
        }}
        selected={null}
        value={getColleagueName(selectedColleague)}
        error={get(errors, 'targetColleagueUuid.message')}
      />
      {selectedColleague && <FeedbackInfo onClickMore={() => goToInfo(getValues())} />}
      {selectedColleague && (
        <div>
          {feedbackFields.map((item, index) => {
            return (
              <div
                key={index}
                className={css({
                  ':last-child': {
                    marginBottom: '32px',
                  },
                })}
              >
                <TileWrapper
                  boarder={true}
                  customStyle={{
                    marginBottom: '16px !important',
                    padding: '24px 24px 0px 24px',
                  }}
                >
                  <h3 className={css(feedbackTitle)}>{item.title}</h3>
                  <p className={css(feedbackDescription)}>{item?.description}</p>
                  <Field
                    name={`feedbackItems.${index}`}
                    Wrapper={Item}
                    Element={Textarea}
                    value={get(feedbackItems, `[${index}]`, '')}
                    setValue={setValue}
                    error={get(errors, `feedbackItems[${index}].message`)}
                  />
                </TileWrapper>
              </div>
            );
          })}
        </div>
      )}
      <div className={css(absoluteStyle)}>
        <div className={css(relativeBtnStyled)}>
          <div className={css(spacingStyle)}>
            <Button
              isDisabled={!targetColleagueUuid}
              styles={[theme.font.fixed.f16, buttonStyle]}
              onPress={handleDraft}
            >
              <Trans i18nKey='save_as_draft'>Save as draft</Trans>
            </Button>
            <IconButton
              data-test-id={'test'}
              isDisabled={!isValid}
              customVariantRules={{ default: iconBtnStyle, disabled: iconBtnStyleDisabled }}
              graphic='arrowRight'
              iconProps={{ invertColors: true }}
              iconPosition={Position.RIGHT}
              onPress={() => handleSubmit(handleSave)()}
            >
              <Trans i18nKey='Submit'>Submit</Trans>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const WrapperModalGiveFeedbackStyle: Rule = {
  paddingLeft: '40px',
  paddingRight: '40px',
  height: '100%',
  overflow: 'auto',
};

const absoluteStyle: Rule = ({ theme }) => ({
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  background: theme.colors.white,
  height: '112px',
});

const relativeBtnStyled: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  // @ts-ignore
  borderTop: `${theme.border.width.b1} solid ${theme.colors.lightGray}`,
});

const spacingStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
    display: 'flex',
    justifyContent: 'space-between',
  };
};

const buttonStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

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

const feedbackTitle: Rule = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '2px 0px 0px 0px',
};
const feedbackDescription: Rule = {
  margin: '4px 0px 16px 0px',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};

export default GiveFeedbackForm;
