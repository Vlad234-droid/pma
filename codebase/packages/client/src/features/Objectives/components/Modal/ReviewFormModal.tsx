import React, { FC, HTMLProps } from 'react';

import { Trans } from 'components/Translation';

import { Button, Icon, useBreakpoints, useStyle } from '@dex-ddl/core';

// todo use Generic form in future. For now just not use it because of more flexibility
import { useForm } from 'react-hook-form';
import { TileWrapper } from 'components/Tile';
import { Icon as IconComponent } from 'components/Icon';
import { Input, Item, Select, Textarea } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { SubmitButton } from './index';

export type ReviewFormModal = {};

type Props = HTMLProps<HTMLInputElement> & ReviewFormModal;

type ObjectiveComponentProps = {
  objective_id: string;
  objective_main_title: string;
  objective_title: string;
  objective_description?: string;
  objective_fields?: {
    field_id: string;
    field_type: string;
    field_title?: string;
    field_description?: string | undefined;
    field_placeholder?: string | undefined;
    field_value?: string | undefined;
    field_options?: any;
  }[];
}[];
const objectives: ObjectiveComponentProps = [
  {
    objective_id: '1',
    objective_main_title: 'Objective 1',
    objective_title: 'Provide a positive customer experience',
    objective_description: 'I want our customers to be satisfied and always return to us',
    objective_fields: [
      {
        field_id: '1',
        field_type: 'select',
        field_title: 'Organization objective',
        field_description: undefined,
        field_placeholder: 'Select organization objective',
        field_value: undefined,
        field_options: [
          { value: 'id_1', label: 'I met this objective' },
          { value: 'id_2', label: 'I exceeded this objective' },
          { value: 'id_3', label: 'I did not meet this objective' },
        ],
      },
      {
        field_id: '2',
        field_type: 'textarea',
        field_title: 'How',
        field_description: 'Please fill in how you met this objective (e.g. Values, Behaviours, etc.)',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: undefined,
      },
      {
        field_id: '3',
        field_type: 'textarea',
        field_title: 'What',
        field_description: 'Please fill in what did you achieve this objective',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: undefined,
      },
    ],
  },
  {
    objective_id: '2',
    objective_main_title: 'Objective 2',
    objective_title: 'Provide a positive customer experience',
    objective_description: 'I want our customers to be satisfied and always return to us',
    objective_fields: [
      {
        field_id: '4',
        field_type: 'select',
        field_title: 'Organization objective',
        field_description: undefined,
        field_placeholder: 'Select organization objective',
        field_value: undefined,
        field_options: [
          { value: 'id_1', label: 'I met this objective' },
          { value: 'id_2', label: 'I exceeded this objective' },
          { value: 'id_3', label: 'I did not meet this objective' },
        ],
      },
      {
        field_id: '5',
        field_type: 'textarea',
        field_title: 'How',
        field_description: 'Please fill in how you met this objective (e.g. Values, Behaviours, etc.)',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: undefined,
      },
      {
        field_id: '6',
        field_type: 'textarea',
        field_title: 'What',
        field_description: 'Please fill in what did you achieve this objective',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: undefined,
      },
    ],
  },
  {
    objective_id: '3',
    objective_main_title: 'Objective 3',
    objective_title: 'Provide a positive customer experience',
    objective_description: 'I want our customers to be satisfied and always return to us',
    objective_fields: [
      {
        field_id: '7',
        field_type: 'select',
        field_title: 'Organization objective',
        field_description: undefined,
        field_placeholder: 'Select organization objective',
        field_value: undefined,
        field_options: [
          { value: 'id_1', label: 'I met this objective' },
          { value: 'id_2', label: 'I exceeded this objective' },
          { value: 'id_3', label: 'I did not meet this objective' },
        ],
      },
      {
        field_id: '8',
        field_type: 'textarea',
        field_title: 'How',
        field_description: 'Please fill in how you met this objective (e.g. Values, Behaviours, etc.)',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: undefined,
      },
      {
        field_id: '9',
        field_type: 'textarea',
        field_title: 'What',
        field_description: 'Please fill in what did you achieve this objective',
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: undefined,
      },
    ],
  },
  {
    objective_id: '4',
    objective_main_title: 'Additional development',
    objective_title: 'Add anything outside of your objectives',
    objective_description: 'Have you taken additional responsibility?',
    objective_fields: [
      {
        field_id: '10',
        field_type: 'textarea',
        field_title: 'Comment here',
        field_description: undefined,
        field_placeholder: 'Don’t worry, only your approcal manager will see this',
        field_value: undefined,
      },
    ],
  },
];

const ReviewFormModal: FC<Props> = () => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const methods = useForm({
    mode: 'onChange',
    // resolver: yupResolver<Yup.AnyObjectSchema>(),
  });
  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;
  const onSubmit = async () => {
    reset();
  };

  return (
    <div
      className={css({
        height: '100%',
      })}
    >
      <div
        className={css({
          height: '100%',
          overflow: 'auto',
          padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
        })}
      >
        <span
          className={css({
            position: 'fixed',
            top: theme.spacing.s5,
            left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
          })}
        >
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <form>
          <div className={css({ padding: `0 0 ${theme.spacing.s5}` })}>
            <div className={css({ fontSize: '24px', lineHeight: '28px', color: theme.colors.base })}>
              <Trans i18nKey='mid_year_review_main_title'>How did you do against your objectives?</Trans>
            </div>
            <div
              className={css({
                fontSize: '18px',
                lineHeight: '24px',
                color: theme.colors.base,
                paddingTop: theme.spacing.s2,
                paddingBottom: theme.spacing.s5,
              })}
            >
              <Trans i18nKey='id_year_review_help_text'>
                To help your manager keep up with your progress, please leave more details in the comment boxes for each
                section
              </Trans>
            </div>
            <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
              <Icon graphic='information' />
              <span
                className={css(theme.font.fixed.f14, {
                  color: theme.colors.base,
                  padding: `${theme.spacing.s0} ${theme.spacing.s2}`,
                })}
              >
                <Trans i18nKey='need_help_write_objectives'>Need help writing your objectives?</Trans>
              </span>
            </div>
            {objectives.map((objective) => (
              <TileWrapper key={objective.objective_id} customStyle={{ marginBottom: '10px' }}>
                <div style={{ padding: '24px' }}>
                  <div
                    className={css({
                      fontSize: '18px',
                      lineHeight: '22px',
                      color: theme.colors.tescoBlue,
                      fontWeight: theme.font.weight.bold,
                    })}
                  >
                    {objective.objective_main_title}
                  </div>
                  <div
                    className={css({
                      fontSize: '16px',
                      lineHeight: '20px',
                      fontWeight: theme.font.weight.bold,
                      paddingTop: theme.spacing.s5,
                    })}
                  >
                    {objective.objective_title}
                  </div>
                  <div
                    className={css({
                      fontSize: '16px',
                      lineHeight: '20px',
                      paddingBottom: theme.spacing.s5,
                    })}
                  >
                    {objective.objective_description}
                  </div>
                  {objective.objective_fields &&
                    objective.objective_fields.map((field) => {
                      if (field.field_type === 'select') {
                        const { field_options } = field;
                        return (
                          <GenericItemField
                            name={`objective.${objective.objective_id}.field.${field.field_id}.value`}
                            methods={methods}
                            label={field.field_title}
                            Wrapper={({ children }) => <Item withIcon={false}>{children}</Item>}
                            Element={Select}
                            options={field_options}
                            placeholder={field.field_placeholder}
                          />
                        );
                      } else if (field.field_type === 'textarea') {
                        return (
                          <GenericItemField
                            name={`objective.${objective.objective_id}.field.${field.field_id}.value`}
                            methods={methods}
                            label={field.field_title}
                            Wrapper={Item}
                            Element={Textarea}
                            placeholder={field.field_placeholder}
                          />
                        );
                      } else if (field.field_type === 'input') {
                        return (
                          <GenericItemField
                            name={`objective.${objective.objective_id}.field.${field.field_id}.value`}
                            methods={methods}
                            label={field.field_title}
                            Wrapper={Item}
                            Element={Input}
                            placeholder={field.field_placeholder}
                          />
                        );
                      }
                    })}
                </div>
              </TileWrapper>
            ))}
          </div>
          <div
            className={css({
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
            })}
          >
            <div
              className={css({
                position: 'relative',
                bottom: theme.spacing.s0,
                left: theme.spacing.s0,
                right: theme.spacing.s0,
                borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
              })}
            >
              <div
                className={css({
                  padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
                  display: 'flex',
                  justifyContent: 'center',
                })}
              >
                <Button
                  styles={[
                    theme.font.fixed.f16,
                    {
                      fontWeight: theme.font.weight.bold,
                      width: '50%',
                      margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                      background: theme.colors.white,
                      border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                      color: `${theme.colors.tescoBlue}`,
                    },
                  ]}
                  onPress={() => alert('1')}
                >
                  <Trans i18nKey='save_as_draft'>Save as draft</Trans>
                </Button>
                <SubmitButton
                  isDisabled={!isValid}
                  onSave={handleSubmit(onSubmit)}
                  styles={[
                    theme.font.fixed.f16,
                    {
                      fontWeight: theme.font.weight.bold,
                      width: '50%',
                      margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                      background: `${theme.colors.tescoBlue}`,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewFormModal;
