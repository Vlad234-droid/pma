import React, { FC, useEffect } from 'react';
import {
  getProcessTemplateMetaSelector,
  ProcessTemplateActions,
  processTemplateByUuidSelector,
  reviewOverallRatingByTypeSelector,
  ReviewsActions,
} from '@pma/store';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';

import { Trans, useTranslation } from 'components/Translation';
import { BasicFormModal } from 'components/BasicFormModal';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { Icon as IconComponent } from 'components/Icon';
import DynamicForm from 'components/DynamicForm';
import Spinner from 'components/Spinner';
import { formTagComponents } from 'utils/schema';
import useDispatch from 'hooks/useDispatch';
import { createYupSchema } from 'utils/yup';
import { FileExtensions, ReviewType } from 'config/enum';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

type Props = {
  forms: Array<any>;
  onClose: () => void;
  fileUuid: string;
  formUuid: string;
};

const formId = {
  group_a_eyr_form: ReviewType.EYR,
  standard_myr_form: ReviewType.MYR,
  standard_calibration: ReviewType.CALIBRATION,
};

const FormsViewer: FC<Props> = ({ forms, onClose, fileUuid, formUuid }) => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const activeForm = forms?.find((form) => form?.id === formUuid!)?.json;
  const components = activeForm?.components || [];

  const yepSchema = components.reduce(createYupSchema(t), {});
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
  });

  const rating = useSelector(reviewOverallRatingByTypeSelector(formId?.[activeForm?.id])) ?? '';

  const {
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const formValues = getValues();

  const [what_rating, how_rating] = watch(['what_rating', 'how_rating']);

  const templateDetails: any | undefined = useSelector(processTemplateByUuidSelector(fileUuid));
  const { loading } = useSelector(getProcessTemplateMetaSelector);

  useEffect(() => {
    dispatch(ProcessTemplateActions.getProcessTemplateMetadata({ fileUuid }));
  }, []);

  useEffect(() => {
    dispatch(
      ProcessTemplateActions.getProcessTemplate({
        path_eq: 'cycles',
        type_eq: FileExtensions.BPMN,
      }),
    );
  }, []);

  useEffect(() => {
    if (!what_rating || !how_rating) return;
    dispatch(
      ReviewsActions.updateRatingReview({
        type: formId[activeForm.id],
        number: 1,
        fields: {
          what_rating,
          how_rating,
        },
      }),
    );
  }, [what_rating, how_rating]);

  useEffect(() => {
    if (!rating) return;
    setValue('overall_rating', rating, { shouldValidate: true, shouldTouch: true });
  }, [rating]);

  useEffect(() => {
    setValue('overall_rating', '', { shouldValidate: false, shouldTouch: false });
    setValue('how_rating', '', { shouldValidate: false, shouldTouch: false });
    setValue('what_rating', '', { shouldValidate: false, shouldTouch: false });
  }, []);

  return (
    <BasicFormModal onClose={onClose} title={t('form_preview', 'Form preview')}>
      {loading ? (
        <Spinner fullHeight={true} />
      ) : (
        templateDetails?.forms && (
          <div className={css(containerStyle)}>
            <div className={css(wrapperStyle({ mobileScreen }))}>
              <span className={css(iconLeftPositionStyle({ mobileScreen }))} onClick={onClose}>
                <IconComponent graphic='arrowLeft' invertColors={true} />
              </span>
              <form>
                <div className={css(formFieldsWrapperStyle)}>
                  <DynamicForm
                    components={formTagComponents(activeForm?.components || [], theme)}
                    formValues={formValues}
                    onlyView={false}
                    errors={errors}
                    setValue={setValue}
                  />
                  <ButtonsWrapper
                    customButtons={
                      <Button isDisabled={false} styles={[theme.font.fixed.f16, buttonCancelStyle]} onPress={onClose}>
                        <Trans i18nKey={'close'} />
                      </Button>
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        )
      )}
    </BasicFormModal>
  );
};

export default FormsViewer;

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

const buttonCancelStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '49%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});
const formFieldsWrapperStyle: Rule = ({ theme }) => ({ padding: `0 0 ${theme.spacing.s5}` });
