import * as Yup from 'yup';

import { VALIDATION_RULE, VALIDATION_RULE_MODELER } from './types';

export const createYupSchema = (schema: Yup.AnyObjectSchema, config: any) => {
  const { key, validationType = 'string', validate = {} } = config;
  let validator = Yup[validationType]();
  Object.keys(validate).forEach((validationRule) => {
    if (validationRule === VALIDATION_RULE_MODELER.REQUIRED) {
      validator = validator[VALIDATION_RULE.REQUIRED](validate[validationRule]);
    }
    if (validationRule === VALIDATION_RULE_MODELER.MIN_LENGTH) {
      validator = validator[VALIDATION_RULE.MIN_LENGTH](validate[validationRule]);
    }
    if (validationRule === VALIDATION_RULE_MODELER.MAX_LENGTH) {
      validator = validator[VALIDATION_RULE.MAX_LENGTH](validate[validationRule]);
    }
  });
  schema[key] = validator;
  return schema;
};
