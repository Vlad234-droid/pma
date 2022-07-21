import React, { FC } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { TriggerModal } from 'features/general/Modal/components/TriggerModal';
import { useTranslation } from 'components/Translation';
import { Attention } from 'components/Form';
import SuccessModal from 'components/SuccessModal';
import { Icon as IconComponent, SuccessMark } from 'components/Icon';
import Spinner from 'components/Spinner';
import { ReviewComponents } from 'components/ReviewComponents';
import { InfoBlock } from 'components/InfoBlock';
import { ReviewHelpModal } from './components/ReviewHelp';
import { ReviewButtons } from './components/ReviewButtons';
import { CustomDescription } from './components/CustomDescription';
import { FileUpload } from './components/FileUpload';

import { ReviewFormType } from './type';
import { FormPropsType, withForm } from './hoc/withForm';
import { ReviewType } from 'config/enum';

type Translation = [string, string];

const TRANSLATION: Record<ReviewType.MYR | ReviewType.EYR, { title: Translation; helperText: Translation }> = {
  [ReviewType.MYR]: {
    title: ['mid_year_review_title', 'How is your year going so far?'],
    helperText: [
      'mid_year_review_help_text',
      'Use this to capture the outcome of the conversation you’ve had with your line manager. Remember to focus as much on your how as your what. Use the look forward section to capture your development for the year ahead.',
    ],
  },
  [ReviewType.EYR]: {
    title: ['end_year_review_title', 'What have you contributed this year and how have you gone about it?'],
    helperText: [
      'end_year_review_help_text',
      'Use this to capture the outcome of the conversation you’ve had with your line manager. Remember to focus as much on your how as your what. Use the look forward section to capture your priorities and development for the year ahead.',
    ],
  },
};

const Review: FC<ReviewFormType & FormPropsType> = ({
  reviewType,
  onClose,
  reviewLoading,
  schemaLoading,
  successModal,
  timelineReview,
  readonly,
  methods,
  components,
  review,
  handleSaveDraft,
  handleSubmit,
}) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();

  const {
    formState: { isValid },
  } = methods;

  if (reviewLoading && schemaLoading) {
    return <Spinner fullHeight />;
  }

  if (successModal) {
    return (
      <SuccessModal
        title='Review sent'
        onClose={onClose}
        mark={<SuccessMark />}
        description={t(
          `${timelineReview?.code?.toLowerCase()}_review_sent_to_manager`,
          'Your review has been sent to your line manager.',
          { ns: 'bank' },
        )}
        customElement={<CustomDescription />}
      />
    );
  }
  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        <span className={css(iconLeftPositionStyle({ mobileScreen }))} onClick={onClose}>
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <form data-test-id={'REVIEW_FORM_MODAL'}>
          <div className={css(formFieldsWrapperStyle)}>
            <div className={css(formTitleStyle)}>{t(...TRANSLATION[reviewType].title, { ns: 'bank' })}</div>
            <div className={css(helperTextStyle)}>{t(...TRANSLATION[reviewType].helperText, { ns: 'bank' })}</div>
            <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
              <TriggerModal
                triggerComponent={<InfoBlock text={t('bank_colleague_help', 'Bank Colleague Help')} />}
                title={t('completing_your_review', 'Completing your review')}
              >
                <ReviewHelpModal />
              </TriggerModal>
            </div>
            {!readonly && <Attention />}
            <ReviewComponents components={components} review={review} methods={methods} readonly={readonly} />
            <FileUpload />
          </div>
          <ReviewButtons
            isValid={isValid}
            readonly={readonly}
            onClose={onClose}
            handleSaveDraft={handleSaveDraft}
            handleSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

const containerStyle: Rule = { height: '100%' };

const wrapperStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    height: '100%',
    overflow: 'auto',
    padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
  });

const iconLeftPositionStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  });

const formTitleStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f24.fontSize,
  lineHeight: theme.font.fluid.f24.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
});

const helperTextStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fluid.f18.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  paddingTop: theme.spacing.s2,
  paddingBottom: theme.spacing.s5,
});

const formFieldsWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}` });

export default withForm(Review);
