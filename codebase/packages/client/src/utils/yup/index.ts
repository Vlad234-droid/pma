import * as Yup from 'yup';
import { TFunction } from 'components/Translation';

import { VALIDATION_RULE, VALIDATION_RULE_MODELER } from './types';
import { RICH_TEXT_CHARACTERS_LIMIT } from 'config/constants';

export const createYupSchema = (t: TFunction) => (schema: Yup.AnyObjectSchema, config: any) => {
  const { key, validationType = 'string', validate = {} } = config;
  let validator = Yup[validationType]();

  if (validate[VALIDATION_RULE_MODELER.REQUIRED]) {
    validator = validator[VALIDATION_RULE.REQUIRED](validate[VALIDATION_RULE_MODELER.REQUIRED]).required(
      t('field_required', 'This field is required'),
    );
  }
  if (validate[VALIDATION_RULE_MODELER.MIN_LENGTH]) {
    validator = validator[VALIDATION_RULE.MIN_LENGTH](validate[VALIDATION_RULE_MODELER.MIN_LENGTH]).min(
      validate?.minLength || 10,
      t('field_min_length', `Must be at least ${validate?.minLength} characters`, { min: validate?.minLength }),
    );
  }
  if (validate[VALIDATION_RULE_MODELER.MAX_LENGTH]) {
    validator = validator[VALIDATION_RULE.MAX_LENGTH](validate[VALIDATION_RULE_MODELER.MAX_LENGTH]).max(
      validate?.maxLength || RICH_TEXT_CHARACTERS_LIMIT,
      t('field_max_length', `Must be at most ${validate?.maxLength || RICH_TEXT_CHARACTERS_LIMIT} characters`, {
        max: validate?.maxLength || RICH_TEXT_CHARACTERS_LIMIT,
      }),
    );
  }

  schema[key] = validator;
  return schema;
};
